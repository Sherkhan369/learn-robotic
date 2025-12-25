from typing import List, Dict, Any
from models.query_history import QueryHistoryCreate
from services.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
import logging

logger = logging.getLogger(__name__)


async def format_response_with_sources(response: str, sources: List[Dict[str, Any]]) -> str:
    """
    Format the response with proper source attribution
    """
    try:
        # Add source attribution to the response
        formatted_response = response

        if sources:
            formatted_response += "\n\nSources:"
            for i, source in enumerate(sources[:3]):  # Limit to top 3 sources
                source_info = f"\n- Source {i+1}: "
                if source.get("source_path"):
                    source_info += f"From {source['source_path']}"
                if source.get("section"):
                    source_info += f" (Section: {source['section']})"
                source_info += f" (Relevance: {source['score']:.2f})"

                formatted_response += source_info

        return formatted_response

    except Exception as e:
        logger.error(f"Error formatting response with sources: {e}")
        return response  # Return original response if formatting fails


async def save_query_history(
    db: AsyncSession,
    query_text: str,
    response_text: str,
    session_id: str,
    query_type: str,
    retrieved_chunks: List[Dict[str, Any]] = None
) -> None:
    """
    Save query history to database
    """
    try:
        from models.query_history import QueryHistoryCreate
        from services.database import QueryHistory

        query_history = QueryHistoryCreate(
            session_id=session_id,
            query_text=query_text,
            response_text=response_text,
            query_type=query_type,
            retrieved_chunks=retrieved_chunks
        )

        db_query = QueryHistory(**query_history.model_dump())
        db.add(db_query)
        await db.commit()
        await db.refresh(db_query)

        logger.info(f"Query history saved for session {session_id}")

    except Exception as e:
        logger.error(f"Error saving query history: {e}")
        # Don't raise the exception as this shouldn't fail the main query