from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID


class QuerySessionBase(BaseModel):
    user_id: Optional[str] = None
    session_token: str


class QuerySessionCreate(QuerySessionBase):
    pass


class QuerySessionUpdate(BaseModel):
    user_id: Optional[str] = None


class QuerySession(QuerySessionBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True