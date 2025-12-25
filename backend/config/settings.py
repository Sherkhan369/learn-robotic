from pydantic_settings import BaseSettings
from typing import List, Optional


class Settings(BaseSettings):
    # API Configuration
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    API_ROOT_PATH: str = ""
    DEBUG: bool = False

    # CORS Configuration
    ALLOWED_ORIGINS: str = "http://localhost:3000,http://localhost:3001"

    # Database Configuration
    NEON_DATABASE_URL: str

    # Vector Database Configuration
    QDRANT_URL: str="http://localhost:6333"
    QDRANT_API_KEY: str = ""
    QDRANT_COLLECTION_NAME: str = "textbook_chunks"

    # Embedding Configuration
    OPENROUTER_API_KEY: str
    EMBEDDING_MODEL: str = "nomic-ai/nomic-embed-text-v1.5"

    # LLM Configuration
    OPENAI_API_KEY: Optional[str] = None
    USE_OPENROUTER: bool = True
    CHAT_MODEL: str = "gpt-4-turbo"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()