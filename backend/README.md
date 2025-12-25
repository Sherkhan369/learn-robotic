# RAG Chatbot Backend for Physical AI & Humanoid Robotics Textbook

This backend service provides a RAG (Retrieval-Augmented Generation) chatbot for the Physical AI & Humanoid Robotics textbook. It allows students to ask questions about textbook content and receive accurate, contextually relevant answers.

## Features

- **General Queries**: Ask questions about the entire textbook content
- **Selected Text Queries**: Ask questions specifically about highlighted/selected text
- **Source Attribution**: Responses include references to source material
- **Session Management**: Maintains conversation context
- **Rate Limiting**: Prevents abuse of the API

## Architecture

- **Backend Framework**: FastAPI
- **AI/LLM Integration**: OpenAI API
- **Vector Database**: Qdrant Cloud
- **Metadata Storage**: Neon Serverless Postgres
- **Embedding Provider**: OpenRouter
- **Hosting**: Railway

## Setup

### Prerequisites

- Python 3.11+
- Access to OpenAI API
- Access to OpenRouter API for embeddings
- Qdrant Cloud account
- Neon Postgres database

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
```

5. Edit `.env` with your API keys and database URLs

### Environment Variables

- `API_HOST`: Host for the API server (default: 0.0.0.0)
- `API_PORT`: Port for the API server (default: 8000)
- `DEBUG`: Enable debug mode (default: false)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed origins
- `NEON_DATABASE_URL`: Connection string for Neon Postgres
- `QDRANT_URL`: URL for Qdrant Cloud instance
- `QDRANT_API_KEY`: API key for Qdrant Cloud
- `QDRANT_COLLECTION_NAME`: Name of the Qdrant collection (default: textbook_chunks)
- `OPENROUTER_API_KEY`: API key for OpenRouter
- `EMBEDDING_MODEL`: Model to use for embeddings (default: nomic-ai/nomic-embed-text-v1.5)
- `OPENAI_API_KEY`: API key for OpenAI
- `CHAT_MODEL`: Model to use for chat (default: gpt-4-turbo)

## Running the Application

### Development

```bash
uvicorn main:app --reload
```

### Production

```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## API Endpoints

### Health Check
- `GET /health` - Check the health of the service
- `GET /` - Root endpoint with API information

### Query Endpoints
- `POST /api/v1/query` - General RAG query across all textbook content
- `POST /api/v1/query/selected-text` - Query based only on selected/highlighted text

## Ingesting Textbook Content

To ingest textbook content into the RAG system:

```bash
python -m scripts.ingest_textbook --source-path /path/to/textbook/docs
```

This will:
1. Parse all MDX files in the specified directory
2. Chunk the content using token-based chunking
3. Generate embeddings for each chunk
4. Store the embeddings in Qdrant
5. Store metadata in Neon Postgres

## Frontend Integration

The backend is designed to work with the frontend chat widget that can be integrated into the textbook website. See the frontend documentation for integration details.

## Technologies Used

- **FastAPI**: Web framework with automatic API documentation
- **Qdrant**: Vector database for similarity search
- **OpenAI**: LLM for response generation
- **OpenRouter**: Embedding model access
- **SQLAlchemy**: Database ORM
- **Pydantic**: Data validation and settings management

## Error Handling

The application includes comprehensive error handling:
- Rate limiting to prevent abuse
- Proper HTTP status codes
- Detailed error messages
- Logging for debugging

## Security

- CORS configured for allowed origins
- Rate limiting to prevent abuse
- Input validation
- Secure API key handling

## Deployment

The backend is designed for deployment on Railway:
1. Set up environment variables in Railway dashboard
2. Deploy the application
3. Run ingestion after deployment to populate the vector database

For more details on deployment, see the deployment configuration files in the repository.