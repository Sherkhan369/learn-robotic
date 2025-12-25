from typing import List, Dict, Any
import asyncio
import logging
from parsers.mdx_parser import mdx_parser
from services.chunking import chunking_service
from services.embedding import embedding_client
from services.vector_db import vector_db_service
from services.database import DocumentChunk as DocumentChunkModel
from sqlalchemy.ext.asyncio import AsyncSession

logger = logging.getLogger(__name__)


class IngestionService:
    """
    Service for ingesting textbook content into the RAG system
    """

    async def ingest_textbook(self, source_path: str, db: AsyncSession) -> Dict[str, int]:
        """
        Ingest textbook content from source path
        """
        logger.info(f"Starting ingestion from {source_path}")

        # Parse MDX files
        parsed_documents = mdx_parser.parse_directory(source_path)
        logger.info(f"Parsed {len(parsed_documents)} documents")

        total_chunks = 0
        total_documents = len(parsed_documents)

        # Initialize the vector database collection
        await vector_db_service.initialize_collection()

        for doc in parsed_documents:
            logger.info(f"Processing document: {doc['relative_path']}")

            # Chunk the document
            chunks = chunking_service.chunk_text(
                text=doc['content'],
                source_info={
                    'document_id': doc['relative_path'],
                    'source_path': doc['relative_path'],
                    'title': doc['title'],
                    'section': doc.get('section', 'unknown')
                }
            )

            # Process chunks in batches to manage memory and API limits
            batch_size = 10  # Adjust based on your API limits
            for i in range(0, len(chunks), batch_size):
                batch = chunks[i:i + batch_size]

                # Create embeddings for the batch
                texts = [chunk['content'] for chunk in batch]
                embeddings = await embedding_client.create_embeddings(texts)

                # Prepare points for vector database
                points = []
                for j, chunk in enumerate(batch):
                    points.append({
                        'id': chunk['id'],
                        'vector': embeddings[j],
                        'payload': {
                            'content': chunk['content'],
                            'document_id': chunk['metadata']['document_id'],
                            'source_path': chunk['metadata']['source_path'],
                            'title': chunk['metadata']['title'],
                            'section': chunk['metadata']['section'],
                            'chunk_id': chunk['metadata']['chunk_id']
                        }
                    })

                # Upsert to vector database
                await vector_db_service.upsert_vectors(points)

                # Save to metadata database
                for chunk in batch:
                    # Generate a UUID for the database record since it expects UUID
                    import uuid
                    db_chunk = DocumentChunkModel(
                        id=uuid.uuid4(),  # Database expects UUID, not the string ID from chunking
                        document_id=chunk['metadata']['document_id'],
                        content=chunk['content'],
                        chunk_metadata=chunk['metadata']
                    )
                    db.add(db_chunk)

                total_chunks += len(batch)
                logger.info(f"Processed batch {i//batch_size + 1}, total chunks: {total_chunks}")

        # Commit database changes
        await db.commit()

        logger.info(f"Ingestion completed. Processed {total_documents} documents, {total_chunks} chunks")
        return {
            "documents": total_documents,
            "chunks": total_chunks
        }


# Global instance
ingestion_service = IngestionService()