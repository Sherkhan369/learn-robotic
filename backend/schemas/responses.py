from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from uuid import UUID
from datetime import datetime


class BaseResponse(BaseModel):
    success: bool
    message: Optional[str] = None


class HealthResponse(BaseResponse):
    status: str
    version: str
    service: str
    timestamp: datetime = datetime.utcnow()


class QueryRequest(BaseModel):
    query: str
    session_id: Optional[str] = None


class SelectedTextQueryRequest(BaseModel):
    selected_text: str
    query: str
    session_id: Optional[str] = None


class SourceReference(BaseModel):
    id: str
    content: str
    score: float
    source_path: Optional[str] = None
    section: Optional[str] = None


class QueryResponse(BaseResponse):
    response: str
    sources: List[SourceReference]
    query_id: Optional[UUID] = None


class IngestionResponse(BaseResponse):
    chunks_processed: int
    documents: int
    status: str