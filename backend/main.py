from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.v1 import query
from config.settings import settings
from middleware.error_handler import add_error_handlers
from middleware.rate_limit import add_rate_limiting

app = FastAPI(
    title="RAG Chatbot API",
    description="API for the RAG chatbot integrated with Physical AI & Humanoid Robotics textbook",
    version="1.0.0",
    root_path=settings.API_ROOT_PATH if settings.API_ROOT_PATH else None
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS.split(",") if settings.ALLOWED_ORIGINS else [],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add other middleware
add_rate_limiting(app)
add_error_handlers(app)

# Include API routes
app.include_router(query.router, prefix="/api/v1", tags=["query"])

@app.get("/health")
async def health_check():
    """
    Health check endpoint to verify the service is running
    """
    return {
        "status": "healthy",
        "version": "1.0.0",
        "service": "RAG Chatbot Backend"
    }

@app.get("/")
async def root():
    """
    Root endpoint with API information
    """
    return {
        "message": "RAG Chatbot API for Physical AI & Humanoid Robotics Textbook",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }