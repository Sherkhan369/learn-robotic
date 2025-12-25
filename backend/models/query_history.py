from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID


class QueryHistoryBase(BaseModel):
    session_id: UUID
    query_text: str
    response_text: str
    query_type: str  # 'general' or 'selected_text'
    retrieved_chunks: Optional[List[Dict[str, Any]]] = None


class QueryHistoryCreate(QueryHistoryBase):
    pass


class QueryHistoryUpdate(BaseModel):
    response_text: Optional[str] = None
    retrieved_chunks: Optional[List[Dict[str, Any]]] = None


class QueryHistory(QueryHistoryBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True