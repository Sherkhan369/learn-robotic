from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, UUID
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from config.settings import settings
import uuid
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

# Create async engine
# Ensure the database URL uses an async driver like asyncpg
db_url = settings.NEON_DATABASE_URL
if "postgresql://" in db_url:
    db_url = db_url.replace("postgresql://", "postgresql+asyncpg://")
elif "postgres://" in db_url:
    db_url = db_url.replace("postgres://", "postgresql+asyncpg://")

# Remove unsupported parameters for asyncpg
if "channel_binding=" in db_url:
    # Remove channel_binding parameter as it's not supported by asyncpg
    import re
    db_url = re.sub(r'[&?]channel_binding=[^&]*', '', db_url)
    # Ensure clean URL formatting after removal
    db_url = db_url.replace('?&', '?').replace('&&', '&')

# Remove sslmode parameter as it's not supported by asyncpg in the same way
if "sslmode=" in db_url:
    import re
    db_url = re.sub(r'[&?]sslmode=[^&]*', '', db_url)
    # Ensure clean URL formatting after removal
    db_url = db_url.replace('?&', '?').replace('&&', '&')

# Remove other unsupported parameters that might cause issues
if "sslcert=" in db_url:
    import re
    db_url = re.sub(r'[&?]sslcert=[^&]*', '', db_url)
    db_url = db_url.replace('?&', '?').replace('&&', '&')
if "sslkey=" in db_url:
    import re
    db_url = re.sub(r'[&?]sslkey=[^&]*', '', db_url)
    db_url = db_url.replace('?&', '?').replace('&&', '&')
if "sslrootcert=" in db_url:
    import re
    db_url = re.sub(r'[&?]sslrootcert=[^&]*', '', db_url)
    db_url = db_url.replace('?&', '?').replace('&&', '&')

engine = create_async_engine(
    db_url,
    echo=settings.DEBUG,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10
)

# Create async session
AsyncSessionLocal = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

Base = declarative_base()


class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id = Column(String, nullable=False, index=True)
    content = Column(Text, nullable=False)
    chunk_metadata = Column(JSON, nullable=False)  # source info, section, etc.
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class QuerySession(Base):
    __tablename__ = "query_sessions"

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(String, nullable=True, index=True)  # Optional user identifier
    session_token = Column(String, nullable=False, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class QueryHistory(Base):
    __tablename__ = "query_history"

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_id = Column(PG_UUID(as_uuid=True), nullable=False, index=True)
    query_text = Column(Text, nullable=False)
    response_text = Column(Text, nullable=False)
    query_type = Column(String, nullable=False)  # 'general' or 'selected_text'
    retrieved_chunks = Column(JSON, nullable=True)  # IDs of chunks used for response
    created_at = Column(DateTime, default=datetime.utcnow)


async def get_db():
    """Dependency to get database session"""
    async with AsyncSessionLocal() as session:
        yield session


async def init_db():
    """Initialize the database tables"""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database tables initialized")


async def close_db():
    """Close the database engine"""
    await engine.dispose()