# Implementation Plan: Integrated RAG Chatbot for Physical AI & Humanoid Robotics Textbook

**Feature**: 1-rag-chatbot-integration
**Created**: 2025-12-24
**Status**: Draft
**Author**: Claude Code Agent

## Technical Context

This implementation plan outlines the development of a RAG (Retrieval-Augmented Generation) chatbot for the Physical AI & Humanoid Robotics textbook. The system will enable students to ask questions about textbook content with two modes: general queries across the entire book and selected-text queries that answer only based on highlighted content.

### Core Architecture
- **Frontend**: ChatKit-JS widget embedded in Docusaurus textbook
- **Backend**: FastAPI service with OpenAI Agents/ChatKit Python SDK
- **Vector Database**: Qdrant Cloud (free tier)
- **Metadata Storage**: Neon Serverless Postgres
- **Embeddings**: OpenRouter (preferred) or OpenAI API
- **Deployment**: FastAPI on Railway/Vercel, frontend updates to GitHub Pages

### Technology Stack
- **Backend Framework**: FastAPI
- **AI/LLM Integration**: OpenAI Agents/ChatKit Python SDK
- **Frontend Widget**: ChatKit-JS
- **Vector Database**: Qdrant Cloud
- **Metadata Database**: Neon Serverless Postgres
- **Embedding Provider**: OpenRouter 
- **Hosting**: Railway/Vercel (backend), GitHub Pages (frontend)

### Known Constraints
- Free tier limitations for Qdrant, Neon, and hosting platforms
- Performance requirements: <3s response time
- Accuracy requirements: no hallucinations, strict selected-text isolation
- Textbook content in MDX format requiring parsing

## Constitution Check

This plan aligns with the RoboLearn Platform Constitution:

✅ **SDD-RI Methodology**: Following spec-first approach with user-approved requirements
✅ **Educational Excellence**: Enhancing learning experience with AI-powered Q&A
✅ **Test-First Development**: Planning unit and integration tests for all components
✅ **Modular Architecture**: Supporting the 4-module curriculum structure
✅ **Reusable Intelligence**: Implementing RAG chatbot for personalized learning
✅ **Technology Stack Compliance**: Using specified technologies (FastAPI, Neon, Qdrant, etc.)
✅ **Development Process**: Planning testable components with accessibility considerations

## Implementation Gates

### Gate 1: Architecture Feasibility ✅
- [x] All required technologies are available and compatible
- [x] Free tier options exist for all components
- [x] Performance requirements are achievable with selected stack

### Gate 2: Security & Compliance ✅
- [x] No sensitive user data handling in initial scope
- [x] Embedding provider complies with data privacy requirements
- [x] Architecture supports future authentication integration

### Gate 3: Deployment Strategy ✅
- [x] Clear separation between frontend (GitHub Pages) and backend (separate hosting)
- [x] Backend API endpoints can be securely accessed from static site
- [x] Deployment pipeline supports separate component updates

## Phase 0: Research & Preparation

### R0.1: Embedding Model Selection
- **Decision**: Use OpenRouter embeddings for cost-effectiveness and free tier availability
- **Rationale**: OpenRouter provides access to multiple embedding models at competitive rates with free tier options
- **Alternatives considered**: OpenAI embeddings (more expensive), local embeddings (higher complexity)
- **Outcome**: Will use OpenRouter's recommended embedding model for text content

### R0.2: Chunking Strategy
- **Decision**: 536 token chunks with overlap for optimal context retrieval
- **Rationale**: Balances retrieval accuracy with token efficiency, following RAG best practices
- **Alternatives considered**: Fixed character chunks (less semantic coherence), sentence-based chunks (potential context breaks)
- **Outcome**: Will implement token-based chunking with 20% overlap

### R0.3: Backend Hosting Platform
- **Decision**: Deploy to Railway for Python/FastAPI compatibility and generous free tier
- **Rationale**: Railway offers excellent support for Python applications with reasonable free tier limits
- **Alternatives considered**: Vercel (requires different Python runtime), Render, Heroku (degraded free tier)
- **Outcome**: Will use Railway for backend deployment

### R0.4: Text Selection Implementation
- **Decision**: Implement client-side text capture with server-side embedding for selected-text mode
- **Rationale**: Provides immediate response for selected-text queries while maintaining consistency with RAG approach
- **Alternatives considered**: Client-side embedding (security concerns, complexity), server-side only (slower response)
- **Outcome**: Will implement hybrid approach with client capture and server processing

## Phase 1: Core Architecture & Data Models

### P1.1: Data Model Design

#### DocumentChunk Entity
- `id` (UUID): Unique identifier for the chunk
- `document_id` (String): Reference to source document
- `content` (Text): The actual text content of the chunk
- `embedding` (Vector): Vector representation for similarity search
- `metadata` (JSON): Source information (file path, section, etc.)
- `created_at` (DateTime): Timestamp of creation
- `updated_at` (DateTime): Timestamp of last update

#### QuerySession Entity
- `id` (UUID): Unique identifier for the session
- `user_id` (String, optional): User identifier if available
- `session_token` (String): Anonymous session identifier
- `created_at` (DateTime): Session start time
- `updated_at` (DateTime): Last activity time

#### QueryHistory Entity
- `id` (UUID): Unique identifier for the query
- `session_id` (UUID): Reference to the session
- `query_text` (Text): Original user query
- `response_text` (Text): Generated response
- `query_type` (Enum): "general" or "selected_text"
- `retrieved_chunks` (JSON): IDs of chunks used for response
- `created_at` (DateTime): Query timestamp

### P1.2: API Contract Design

#### Ingestion Endpoints
```
POST /api/v1/ingest
- Description: Process and store textbook content
- Request: { "source_path": "/path/to/docs", "force_rebuild": true/false }
- Response: { "status": "completed", "chunks_processed": 120, "documents": 15 }
```

#### Query Endpoints
```
POST /api/v1/query
- Description: General RAG query across all textbook content
- Request: { "query": "Explain ROS 2 nodes", "session_id": "..." }
- Response: { "response": "...", "sources": [...], "query_id": "..." }

POST /api/v1/query/selected-text
- Description: Query based only on selected/highlighted text
- Request: { "selected_text": "The ROS 2 node concept...", "query": "What does this mean?", "session_id": "..." }
- Response: { "response": "...", "sources": [...], "query_id": "..." }
```

#### Health Check Endpoints
```
GET /health
- Description: Check system health
- Response: { "status": "healthy", "components": { "database": "ok", "vector_db": "ok", "llm": "ok" } }
```

### P1.3: Quickstart Guide

```bash
# 1. Clone the backend repository
git clone <backend-repo-url>
cd rag-chatbot-backend

# 2. Set up environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your API keys and database URLs

# 4. Run the application
uvicorn main:app --reload

# 5. Run ingestion
python -m scripts.ingest_textbook --source-path /path/to/textbook/docs

# 6. Test the API
curl -X POST http://localhost:8000/api/v1/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Explain ROS 2 nodes"}'
```

## Phase 2: Implementation Roadmap

### Phase 2A: Backend Infrastructure (Days 1-4)
- [ ] Set up FastAPI project structure
- [ ] Configure Qdrant vector database connection
- [ ] Configure Neon Postgres connection
- [ ] Implement embedding client (OpenRouter)
- [ ] Create basic API endpoints with error handling
- [ ] Implement health check endpoints
- [ ] Set up logging and monitoring

### Phase 2B: Ingestion Pipeline (Days 5-8)
- [ ] Implement MDX parser to extract text content
- [ ] Create chunking algorithm (536 tokens + overlap)
- [ ] Build vector embedding and storage pipeline
- [ ] Create metadata storage in Postgres
- [ ] Implement one-click ingestion script
- [ ] Add progress tracking and error recovery
- [ ] Create validation checks for ingestion quality

### Phase 2C: RAG Query Engine (Days 9-12)
- [ ] Implement similarity search in Qdrant
- [ ] Build query embedding and retrieval logic
- [ ] Create LLM response generation with ChatKit
- [ ] Implement selected-text mode processing
- [ ] Add system prompt for grounding responses
- [ ] Implement response formatting and source attribution
- [ ] Add query history tracking

### Phase 2D: Frontend Integration (Days 13-16)
- [ ] Create ChatKit-JS configuration for textbook
- [ ] Implement floating/side panel chat widget
- [ ] Add text selection capture functionality
- [ ] Style widget to match textbook theme
- [ ] Implement dark mode support
- [ ] Add loading states and error handling
- [ ] Create user session management

### Phase 2E: Testing & Deployment (Days 17-20)
- [ ] Write unit tests for backend components
- [ ] Create integration tests for RAG pipeline
- [ ] Perform load testing for concurrent users
- [ ] Deploy backend to Railway
- [ ] Update frontend with production API URL
- [ ] Test end-to-end functionality
- [ ] Document deployment process

## Success Criteria

### Technical Metrics
- [ ] Response time <3 seconds for 95% of queries
- [ ] 90%+ semantic relevance in retrieved content
- [ ] Support for 100+ concurrent users
- [ ] Zero hallucinations in responses (strict grounding)
- [ ] Selected-text mode uses only provided context

### Functional Validation
- [ ] Successfully ingest all textbook MDX content
- [ ] General queries return relevant textbook information
- [ ] Selected-text queries respond only to provided context
- [ ] Chat widget integrates seamlessly with textbook
- [ ] Text selection capture works across all textbook pages
- [ ] System handles edge cases gracefully

### Deployment Validation
- [ ] Backend deployed and accessible
- [ ] Frontend updates deployed to GitHub Pages
- [ ] Cross-origin requests work properly
- [ ] Monitoring and logging in place
- [ ] Backup and recovery procedures documented

## Risk Mitigation

### Technical Risks
- **Vector database performance**: Implement caching layer and query optimization
- **Embedding costs**: Use token-efficient chunking and implement usage monitoring
- **Response latency**: Optimize retrieval pipeline and implement result caching
- **Content parsing issues**: Comprehensive MDX parsing with fallback strategies

### Deployment Risks
- **Free tier limitations**: Monitor usage and plan for scaling
- **CORS issues**: Proper API configuration and documentation
- **Security concerns**: Input validation and rate limiting implementation
- **Dependency management**: Pin versions and implement update procedures

## Next Steps

1. Begin Phase 2A: Set up backend infrastructure
2. Implement data models and API contracts
3. Create development environment and testing framework
4. Proceed through implementation roadmap in sequence
5. Conduct regular validation against success criteria