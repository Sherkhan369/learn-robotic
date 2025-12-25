from typing import List, Dict, Any
import logging
from prompts.selected_text_prompt import SELECTED_TEXT_SYSTEM_PROMPT
from services.llm_service import llm_service

logger = logging.getLogger(__name__)


class SelectedTextService:
    """
    Service for processing selected text queries
    """

    def __init__(self):
        pass

    async def process_selected_text_query(
        self,
        selected_text: str,
        query: str
    ) -> Dict[str, Any]:
        """
        Process a query based on selected text
        """
        try:
            logger.info(f"Processing selected text query: {query[:50]}...")

            # Generate response using LLM with selected text as context
            llm_response = await llm_service.generate_response(
                query=query,
                context_chunks=[selected_text],
                system_prompt=SELECTED_TEXT_SYSTEM_PROMPT
            )

            # Format the response
            result = {
                "response": llm_response,
                "sources": [{
                    "id": "selected_text",
                    "content": selected_text[:200] + "..." if len(selected_text) > 200 else selected_text,
                    "score": 1.0,  # Perfect relevance since this is the selected text
                    "source_path": "selected_text",
                    "section": "user_selected"
                }]
            }

            logger.info("Selected text query processed successfully")
            return result

        except Exception as e:
            logger.error(f"Error processing selected text query: {e}")
            raise


# Global instance
selected_text_service = SelectedTextService()