from typing import List, Dict, Any
import logging
from services.vector_db import vector_db_service
from services.embedding import embedding_client

logger = logging.getLogger(__name__)


class RetrievalService:
    """
    Service for retrieving relevant chunks from vector database
    """

    async def retrieve_relevant_chunks(self, query: str, limit: int = 5) -> List[Dict[str, Any]]:
        """
        Retrieve relevant chunks based on the query
        """
        try:
            # Create embedding for the query
            query_embedding = await embedding_client.create_embedding(query)

            # Search for relevant chunks in vector database
            search_results = await vector_db_service.search_vectors(
                query_vector=query_embedding,
                limit=limit
            )

            # Format results
            retrieved_chunks = [
                {
                    "id": result["id"],
                    "content": result["payload"]["content"],
                    "score": result["score"],
                    "source_path": result["payload"].get("source_path"),
                    "section": result["payload"].get("section"),
                    "document_id": result["payload"].get("document_id"),
                    "title": result["payload"].get("title")
                }
                for result in search_results
            ]

            logger.info(f"Retrieved {len(retrieved_chunks)} relevant chunks for query")
            return retrieved_chunks

        except Exception as e:
            logger.error(f"Error retrieving relevant chunks: {e}")
            raise


# Global instance
retrieval_service = RetrievalService()