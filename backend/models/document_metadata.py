from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime
from uuid import UUID


class DocumentMetadataBase(BaseModel):
    document_id: str
    title: str
    source_path: str
    section: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None


class DocumentMetadataCreate(DocumentMetadataBase):
    pass


class DocumentMetadataUpdate(BaseModel):
    title: Optional[str] = None
    section: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None


class DocumentMetadata(DocumentMetadataBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True