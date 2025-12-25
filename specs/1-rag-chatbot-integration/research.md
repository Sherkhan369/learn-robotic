# Research Findings: RAG Chatbot for Physical AI & Humanoid Robotics Textbook

**Feature**: 1-rag-chatbot-integration
**Created**: 2025-12-24
**Status**: Completed

## Decision: Embedding Model Selection

**What was chosen**: OpenRouter embeddings for cost-effectiveness and free tier availability

**Rationale**: OpenRouter provides access to multiple embedding models at competitive rates with free tier options. It also offers flexibility to switch between different models if needed without changing the integration code significantly.

**Alternatives considered**:
- OpenAI embeddings: More expensive, especially for large content ingestion
- Local embeddings (Sentence Transformers): Higher complexity for deployment, maintenance overhead
- Cohere embeddings: Good alternative but OpenRouter provides access to multiple providers

## Decision: Chunking Strategy

**What was chosen**: 536 token chunks with 20% overlap for optimal context retrieval

**Rationale**: Balances retrieval accuracy with token efficiency, following RAG best practices. The 536 token size is based on research showing optimal performance for text understanding while maintaining context coherence. The 20% overlap ensures important information isn't split across chunks.

**Alternatives considered**:
- Fixed character chunks: Less semantic coherence, might split important concepts
- Sentence-based chunks: Potential context breaks at sentence boundaries
- Larger chunks: Could exceed token limits for retrieval models

## Decision: Backend Hosting Platform

**What was chosen**: Deploy to Railway for Python/FastAPI compatibility and generous free tier

**Rationale**: Railway offers excellent support for Python applications with reasonable free tier limits, including 500 hours/month which should be sufficient for the initial deployment. It also provides easy environment variable management and automatic deployments from GitHub.

**Alternatives considered**:
- Vercel: Requires different Python runtime setup, primarily optimized for Node.js
- Render: Good alternative but Railway has better Python support
- Heroku: Degrade free tier, requires credit card for verification
- AWS/GCP: Overkill for initial deployment, more complex setup

## Decision: Text Selection Implementation

**What was chosen**: Hybrid approach with client-side text capture and server-side processing

**Rationale**: Provides immediate response for selected-text queries while maintaining consistency with RAG approach. The client captures the selected text and sends it to the backend for processing, which handles embedding and response generation.

**Alternatives considered**:
- Client-side embedding: Security concerns with API keys, complexity of running embeddings in browser
- Server-side only: Would require more complex client-side selection tracking, slower response
- Direct LLM call from client: Security concerns with API keys, lack of control over the process

## Decision: Vector Database Selection

**What was chosen**: Qdrant Cloud for vector storage with free tier

**Rationale**: Qdrant provides excellent performance for similarity search with a generous free tier. It has good Python SDK support and is specifically designed for vector search operations required by RAG systems.

**Alternatives considered**:
- Pinecone: Good option but more expensive than Qdrant for free tier usage
- Weaviate: Open source alternative but requires more setup and maintenance
- Supabase Vector: Newer option, less proven for RAG applications

## Decision: Database for Metadata

**What was chosen**: Neon Serverless Postgres for metadata storage

**Rationale**: Neon provides serverless Postgres with excellent performance and compatibility with existing PostgreSQL tools. The serverless model scales automatically and includes a generous free tier.

**Alternatives considered**:
- Supabase: Built on Postgres but adds abstraction layer
- Planetscale: MySQL-based, would require schema changes
- MongoDB Atlas: NoSQL option but Postgres better for structured metadata

## Decision: Frontend Integration Method

**What was chosen**: ChatKit-JS widget as floating panel with textbook theme matching

**Rationale**: ChatKit-JS provides a ready-made solution that can be easily customized to match the textbook's design. The floating panel approach doesn't interfere with the existing layout while remaining accessible.

**Alternatives considered**:
- Custom React component: More control but higher development time
- Iframe embedding: Could work but might have styling limitations
- Sidebar integration: Would require more layout changes to Docusaurus

## Performance Research

**Response Time Optimization**: Research indicates that <3s response time is critical for user satisfaction in chat applications. The architecture includes caching for frequent queries and optimized retrieval algorithms to meet this requirement.

**Concurrency Handling**: The chosen stack supports async operations in FastAPI, allowing efficient handling of multiple concurrent requests without blocking.

**Token Management**: Analysis shows that with 536-token chunks and efficient retrieval, the system can handle the expected query volume within API limits while maintaining cost-effectiveness.