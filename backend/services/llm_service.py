import openai
from typing import List
from config.settings import settings
import logging

logger = logging.getLogger(__name__)


class LLMService:
    def __init__(self):
        if settings.USE_OPENROUTER:
            # Use OpenRouter
            self.api_key = settings.OPENROUTER_API_KEY
            self.model = settings.CHAT_MODEL
            openai.api_key = self.api_key
            openai.base_url = "https://openrouter.ai/api/v1"
        else:
            # Use OpenAI directly
            self.api_key = settings.OPENAI_API_KEY
            if not self.api_key:
                raise ValueError("OPENAI_API_KEY must be provided when not using OpenRouter")
            self.model = settings.CHAT_MODEL
            openai.api_key = self.api_key

    async def generate_response(self, query: str, context_chunks: List[str], system_prompt: str = None) -> str:
        """
        Generate response using OpenAI or OpenRouter based on configuration
        """
        try:
            # Prepare the context for the LLM
            # Combine context chunks
            context_parts = []
            for i, chunk in enumerate(context_chunks):
                context_parts.append(f"Context {i+1}: {chunk}")
            context = "\n\n".join(context_parts)

            # Add the query to the context
            full_context = f"{context}\n\nQuestion: {query}"

            # Use provided system prompt or default
            if system_prompt is None:
                system_message = """You are an AI assistant for a Physical AI & Humanoid Robotics textbook.
                Answer questions based only on the provided textbook content.
                Do not use external knowledge or make things up.
                Always reference the source of information if available."""
            else:
                system_message = system_prompt

            # Validate API key exists before making request
            if not self.api_key:
                raise ValueError("No API key provided. Please configure OPENROUTER_API_KEY or OPENAI_API_KEY in your environment.")

            # Make the API call (works with both OpenAI and OpenRouter)
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_message},
                    {"role": "user", "content": full_context}
                ],
                temperature=0.3,  # Lower temperature for more consistent, factual responses
                max_tokens=1000
            )

            # Extract the response
            llm_response = response.choices[0].message.content.strip()
            return llm_response

        except Exception as e:
            logger.error(f"Error generating LLM response: {e}")
            raise


# Global instance
llm_service = LLMService()