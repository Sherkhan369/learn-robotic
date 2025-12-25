from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime
from uuid import UUID


class DocumentChunkBase(BaseModel):
    document_id: str
    content: str
    metadata: Dict[str, Any]


class DocumentChunkCreate(DocumentChunkBase):
    pass


class DocumentChunkUpdate(BaseModel):
    content: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None


class DocumentChunk(DocumentChunkBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True