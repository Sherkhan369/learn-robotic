import httpx
import asyncio
from typing import List
from config.settings import settings
import logging

logger = logging.getLogger(__name__)


class EmbeddingClient:
    def __init__(self):
        # Use OpenRouter API key by default, fallback to OpenAI
        self.api_key = settings.OPENROUTER_API_KEY or settings.OPENAI_API_KEY
        self.model = settings.EMBEDDING_MODEL
        # Determine which API to use based on settings
        if settings.USE_OPENROUTER:
            self.base_url = "https://openrouter.ai/api/v1"
            self.headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
        else:
            self.base_url = "https://api.openai.com/v1"
            self.headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }

    async def create_embeddings(self, texts: List[str]) -> List[List[float]]:
        """
        Create embeddings for a list of texts using either OpenRouter or OpenAI
        """
        try:
            # Prepare the request payload
            payload = {
                "model": self.model,
                "input": texts
            }

            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    f"{self.base_url}/embeddings",
                    headers=self.headers,
                    json=payload
                )

                if response.status_code != 200:
                    raise Exception(f"Embedding API error: {response.status_code} - {response.text}")

                result = response.json()
                embeddings = [item['embedding'] for item in result['data']]

                logger.info(f"Successfully created embeddings for {len(texts)} texts")
                return embeddings

        except Exception as e:
            logger.error(f"Error creating embeddings: {e}")
            raise

    async def create_embedding(self, text: str) -> List[float]:
        """
        Create embedding for a single text
        """
        if not text or len(text.strip()) == 0:
            # Return a zero vector or handle empty text appropriately
            # For text-embedding-ada-002, the dimension is 1536
            return [0.0] * 1536

        embeddings = await self.create_embeddings([text])
        return embeddings[0] if embeddings else []


# Global instance
embedding_client = EmbeddingClient()