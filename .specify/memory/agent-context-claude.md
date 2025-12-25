# Claude Code Agent Context: RAG Chatbot for Physical AI & Humanoid Robotics Textbook

## Technology Stack

### Backend Framework
- **FastAPI**: Modern Python web framework with async support, automatic API documentation, and Pydantic integration
- **Python 3.9+**: Primary programming language for backend services
- **uvicorn**: ASGI server for running FastAPI applications

### AI & LLM Integration
- **OpenAI Agents/ChatKit Python SDK**: Framework for building AI-powered chat applications
- **OpenRouter API**: Provider for embeddings and language models with competitive pricing and free tier
- **Embedding Models**: Used for converting text to vector representations for similarity search

### Vector Database
- **Qdrant Cloud**: Vector database for storing and searching document embeddings
- **Similarity Search**: Cosine similarity for finding relevant content chunks
- **Vector Storage**: High-dimensional vector storage for semantic search

### Metadata Storage
- **Neon Serverless Postgres**: Cloud PostgreSQL database with serverless scaling
- **Document Metadata**: Storing information about textbook documents and chunks
- **Query History**: Tracking user interactions for analytics and improvement

### Frontend Integration
- **ChatKit-JS**: JavaScript library for embedding chat functionality
- **Docusaurus Integration**: Widget that works with the textbook's Docusaurus framework
- **Text Selection Capture**: Functionality to capture highlighted text from the textbook

### Deployment & Infrastructure
- **Railway**: Platform for deploying Python applications with generous free tier
- **GitHub Pages**: Hosting for the textbook frontend
- **CORS Configuration**: Cross-origin resource sharing for frontend-backend communication

## Architecture Components

### Ingestion Pipeline
- **MDX Parser**: Extracts text content from MDX files while preserving structure
- **Chunking Algorithm**: Splits content into 536-token chunks with overlap
- **Embedding Generation**: Creates vector representations of text chunks
- **Metadata Storage**: Records source information for each chunk

### Query Processing
- **General RAG**: Search across entire textbook content for comprehensive answers
- **Selected-Text Mode**: Respond only to provided highlighted text context
- **Response Generation**: Creates contextual answers based on retrieved content
- **Source Attribution**: References original textbook sources in responses

### Data Models
- **DocumentChunk**: Stores text chunks with embeddings and metadata
- **QuerySession**: Tracks user sessions for history and analytics
- **QueryHistory**: Records queries and responses for improvement
- **DocumentMetadata**: Tracks textbook document information

## API Endpoints

### Core Endpoints
- `GET /health`: Service health check
- `POST /api/v1/ingest`: Textbook content ingestion
- `POST /api/v1/query`: General RAG queries
- `POST /api/v1/query/selected-text`: Selected-text mode queries
- `POST /api/v1/query/{query_id}/feedback`: Query response feedback

## Security Considerations

- **API Key Management**: Secure handling of OpenRouter, Qdrant, and Neon credentials
- **Input Validation**: Sanitizing user queries to prevent injection attacks
- **Rate Limiting**: Preventing abuse of the API
- **CORS Policy**: Properly configured for secure frontend communication

## Performance Requirements

- **Response Time**: <3 seconds for 95% of queries
- **Concurrent Users**: Support for 100+ simultaneous users
- **Embedding Efficiency**: Optimized chunking to minimize token usage
- **Caching Strategy**: Result caching for frequently asked questions

## Development Workflow

- **Environment Setup**: Virtual environment with dependency management
- **Configuration**: Environment variables for API keys and service URLs
- **Testing**: Unit and integration tests for all components
- **Deployment**: Automated deployment to Railway with GitHub integration