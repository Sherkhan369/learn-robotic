# RAG Chatbot Integration for Physical AI & Humanoid Robotics Textbook

This project integrates a RAG (Retrieval-Augmented Generation) chatbot into the Physical AI & Humanoid Robotics textbook, allowing students to ask questions about textbook content and receive accurate, contextually relevant answers.

## Overview

The RAG chatbot provides two main modes of interaction:

1. **General Queries**: Ask questions about the entire textbook content
2. **Selected Text Queries**: Ask questions specifically about highlighted/selected text

## Architecture

The system consists of two main components:

### Backend
- **Framework**: FastAPI
- **AI/LLM Integration**: OpenAI API
- **Vector Database**: Qdrant Cloud
- **Metadata Storage**: Neon Serverless Postgres
- **Embedding Provider**: OpenRouter

### Frontend
- **Widget**: React-based chat interface
- **Integration**: Seamless integration with Docusaurus textbook
- **Features**: Text selection capture, source attribution, session management

## Features

- **Accurate Responses**: Answers are grounded in textbook content with no hallucinations
- **Source Attribution**: Responses include references to source material
- **Text Selection**: Ask questions about highlighted text specifically
- **Session Management**: Maintains conversation context
- **Rate Limiting**: Prevents abuse of the API

## Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
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

6. Run the application:
```bash
uvicorn main:app --reload
```

### Frontend Integration

The chat widget can be integrated into the textbook website by including the provided components and services.

## API Endpoints

### Health Check
- `GET /health` - Check the health of the service

### Query Endpoints
- `POST /api/v1/query` - General RAG query across all textbook content
- `POST /api/v1/query/selected-text` - Query based only on selected/highlighted text

## Ingesting Textbook Content

To populate the RAG system with textbook content:

```bash
python -m scripts.ingest_textbook --source-path /path/to/textbook/docs
```

This will parse MDX files, chunk the content, generate embeddings, and store them in the vector database.

## Technologies Used

### Backend
- FastAPI
- OpenAI API
- Qdrant
- Neon Postgres
- OpenRouter
- SQLAlchemy
- Pydantic

### Frontend
- React
- JavaScript
- CSS

## Deployment

The backend is designed for deployment on Railway, while the frontend integrates with GitHub Pages hosting for the textbook.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.