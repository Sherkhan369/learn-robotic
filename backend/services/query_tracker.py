from typing import Dict, Any
import logging
from services.database import get_db
from models.query_history import QueryHistoryCreate
from models.query_session import QuerySessionCreate
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
import uuid

logger = logging.getLogger(__name__)


class QueryTracker:
    """
    Service for tracking queries and managing user sessions
    """

    async def get_or_create_session(self, db: AsyncSession, session_id: str = None) -> str:
        """
        Get existing session or create a new one
        """
        from services.database import QuerySession

        if not session_id:
            # Create new session
            session_id = str(uuid.uuid4())

        # Check if session exists
        existing_session = await db.execute(
            QuerySession.__table__.select().where(QuerySession.session_token == session_id)
        )
        session_result = existing_session.fetchone()

        if not session_result:
            # Create new session
            new_session = QuerySession(
                session_token=session_id,
                user_id=None  # Anonymous session
            )
            db.add(new_session)
            await db.commit()

        return session_id

    async def save_query(self,
                        db: AsyncSession,
                        session_id: str,
                        query_text: str,
                        response_text: str,
                        query_type: str,
                        retrieved_chunks: list = None) -> UUID:
        """
        Save query to history
        """
        from services.database import QueryHistory

        try:
            query_history = QueryHistory(
                session_id=session_id,
                query_text=query_text,
                response_text=response_text,
                query_type=query_type,
                retrieved_chunks=retrieved_chunks
            )

            db.add(query_history)
            await db.commit()
            await db.refresh(query_history)

            logger.info(f"Query saved to history with ID: {query_history.id}")
            return query_history.id

        except Exception as e:
            logger.error(f"Error saving query to history: {e}")
            # Don't raise the exception as this shouldn't fail the main query
            return None


# Global instance
query_tracker = QueryTracker()