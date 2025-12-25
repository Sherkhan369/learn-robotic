# 4. RAG Chatbot Architecture for Textbook Integration

Date: 2025-12-24

## Status

Accepted

## Context

We need to implement a RAG (Retrieval-Augmented Generation) chatbot for the Physical AI & Humanoid Robotics textbook that allows students to ask questions about textbook content and receive accurate, contextually relevant answers. The system needs to support two modes: general queries across the entire textbook and selected-text queries that respond only to highlighted content.

## Decision

We will implement a backend-frontend architecture with:

### Backend
- **Framework**: FastAPI for Python with automatic API documentation
- **AI/LLM Integration**: OpenAI API for response generation
- **Vector Database**: Qdrant Cloud for similarity search
- **Metadata Storage**: Neon Serverless Postgres for session and query history
- **Embedding Provider**: OpenRouter for text embeddings
- **Hosting**: Railway for backend deployment

### Frontend
- **Widget**: React-based chat interface
- **Integration**: Seamless integration with Docusaurus textbook
- **Features**: Text selection capture, source attribution, session management

## Alternatives Considered

1. **Fully client-side approach**: Would require exposing API keys to clients and wouldn't scale well
2. **Different LLM providers**: OpenAI offers the best balance of quality and documentation
3. **Different vector databases**: Qdrant offers the best free tier and performance for our use case
4. **Different embedding providers**: OpenRouter provides access to multiple models at competitive rates
5. **Monolithic architecture**: Separating frontend and backend provides better maintainability

## Consequences

### Positive
- Scalable architecture with clear separation of concerns
- Good performance with vector search for similarity matching
- Proper security with API keys stored server-side
- Flexible system that can support both general and selected-text queries
- Good user experience with source attribution

### Negative
- More complex deployment with multiple services
- Dependency on external APIs (OpenAI, Qdrant, Neon)
- Potential costs as usage grows beyond free tiers
- Requires internet connectivity for all operations

## Implementation Notes

The system is implemented with:
- Token-based chunking for content processing
- Proper grounding to prevent hallucinations
- Rate limiting to prevent abuse
- Session management for conversation context
- Comprehensive error handling
- Source attribution in responses