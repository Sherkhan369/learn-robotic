import asyncio
from typing import List, Dict, Any, Optional
from qdrant_client import QdrantClient
from qdrant_client.http import models
from qdrant_client.http.models import PointStruct, Distance, VectorParams
from config.settings import settings
import logging

logger = logging.getLogger(__name__)


class VectorDBService:
    def __init__(self):
        self.client = QdrantClient(
            url=settings.QDRANT_URL,
            api_key=settings.QDRANT_API_KEY,
            prefer_grpc=False
        )
        self.collection_name = settings.QDRANT_COLLECTION_NAME

    async def initialize_collection(self):
        """Initialize the Qdrant collection if it doesn't exist"""
        try:
            collections = self.client.get_collections()
            collection_exists = any(col.name == self.collection_name for col in collections.collections)

            if not collection_exists:
                self.client.create_collection(
                    collection_name=self.collection_name,
                    vectors_config=VectorParams(size=1536, distance=Distance.COSINE),  # text-embedding-ada-002 has 1536 dimensions
                )
                logger.info(f"Created Qdrant collection: {self.collection_name}")
            else:
                logger.info(f"Qdrant collection {self.collection_name} already exists")
        except Exception as e:
            logger.error(f"Error initializing Qdrant collection: {e}")
            raise

    async def upsert_vectors(self, points: List[Dict[str, Any]]):
        """Upsert vectors to the collection"""
        try:
            formatted_points = []
            for point in points:
                # Ensure the ID is a valid format for Qdrant (either integer or UUID)
                original_id = point["id"]
                # If the ID is not a valid format, generate a UUID
                import uuid
                try:
                    # Check if it's already an integer
                    int(original_id)
                    point_id = original_id
                except (ValueError, TypeError):
                    # If not an integer, generate a UUID
                    point_id = str(uuid.uuid4())

                formatted_points.append(
                    PointStruct(
                        id=point_id,
                        vector=point["vector"],
                        payload={**point["payload"], "original_id": original_id}  # Keep original ID in payload
                    )
                )

            self.client.upsert(
                collection_name=self.collection_name,
                points=formatted_points
            )
            logger.info(f"Upserted {len(points)} vectors to collection {self.collection_name}")
        except Exception as e:
            logger.error(f"Error upserting vectors: {e}")
            raise

    async def search_vectors(self, query_vector: List[float], limit: int = 10) -> List[Dict[str, Any]]:
        """Search for similar vectors in the collection"""
        try:
            results = self.client.search(
                collection_name=self.collection_name,
                query_vector=query_vector,
                limit=limit
            )

            return [
                {
                    "id": result.id,
                    "payload": result.payload,
                    "score": result.score
                }
                for result in results
            ]
        except Exception as e:
            logger.error(f"Error searching vectors: {e}")
            raise

    async def get_vector_count(self) -> int:
        """Get the total count of vectors in the collection"""
        try:
            count_result = self.client.count(
                collection_name=self.collection_name
            )
            return count_result.count
        except Exception as e:
            logger.error(f"Error getting vector count: {e}")
            raise

    async def delete_collection(self):
        """Delete the entire collection (use with caution)"""
        try:
            self.client.delete_collection(collection_name=self.collection_name)
            logger.info(f"Deleted Qdrant collection: {self.collection_name}")
        except Exception as e:
            logger.error(f"Error deleting collection: {e}")
            raise


# Global instance
vector_db_service = VectorDBService()