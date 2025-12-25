---
id: 3
title: Create Implementation Plan
stage: plan
date: 2025-12-24
surface: agent
model: Claude Sonnet 4.5
feature: rag-chatbot-integration
branch: 1-rag-chatbot-integration
user: Claude Code User
command: sp.plan
labels: ["plan", "architecture", "backend", "frontend", "rag"]
links:
  spec: specs/1-rag-chatbot-integration/spec.md
  ticket: null
  adr: history/adr/003-technology-agnostic-specification-approach.adr.md
  pr: null
files:
 - specs/1-rag-chatbot-integration/plan.md
 - specs/1-rag-chatbot-integration/data-model.md
 - specs/1-rag-chatbot-integration/research.md
 - specs/1-rag-chatbot-integration/contracts/openapi.yaml
 - specs/1-rag-chatbot-integration/quickstart.md
 - .specify/memory/agent-context-claude.md
tests:
 - plan validation
 - data model validation
 - API contract validation
---

## Prompt

Create a concise, actionable execution plan for the Integrated RAG Chatbot in the Physical AI & Humanoid Robotics textbook (Docusaurus on GitHub Pages).

Strict stack: FastAPI backend, OpenAI Agents/ChatKit Python SDK, ChatKit-JS frontend, Qdrant Cloud (free) for vectors, Neon Serverless Postgres for metadata, embeddings via OpenRouter (preferred) or OpenAI.

Core features:
- Ingest all book MDX content → chunks → embeddings → Qdrant
- General RAG queries on full book
- Selected-text mode (answer only from highlighted text)
- Embedded chat widget in Docusaurus

Phases (short timelines):

Phase 1: Setup & Architecture (Days 1-2)
- Sketch architecture (frontend → ChatKit-JS → FastAPI → Qdrant/Neon → LLM)
- Choose embedding model (OpenRouter priority)
- Init separate backend repo, FastAPI + ChatKit Python SDK
- Create Neon + Qdrant free accounts

Phase 2: Ingestion Pipeline (Days 3-5)
- Parse MDX files → clean text (skip code/Mermaid)
- Chunk (536 tokens + overlap)
- Embed + upsert to Qdrant with metadata
- Store source mapping in Neon
- Build one-click ingestion script

Phase 3: RAG Backend (Days 6-9)
- /query endpoint: embed query → retrieve → generate (ChatKit Agents)
- Selected-text endpoint: direct context injection
- Strong system prompt for grounding
- Basic error handling + CORS

Phase 4: Frontend Embed (Days 10-12)
- Add ChatKit-JS widget to Docusaurus (floating or sidebar)
- Implement text highlight capture → send to backend
- Match book theme + dark mode

Phase 5: Test & Deploy (Days 13-15)
- Unit tests (ingestion, retrieval)
- 10+ manual queries (general + selected-text)
- Deploy FastAPI (Railway/Vercel free)
- Update Docusaurus with prod API URL
- Redeploy book to GitHub Pages

Key Decisions:
- OpenRouter  embeddings (free)
- Chunk size/strategy
- Backend hosting platform (free tier limits)
- Selected-text: client vs server embedding

Testing: Latency <3s, no hallucinations, strict selected-text isolation.

Output as compact Markdown: phases, days, bullet tasks, decisions,

## Response snapshot

Created comprehensive implementation plan for the RAG Chatbot integration with Physical AI & Humanoid Robotics textbook. The plan includes:

1. Technical Context: Detailed architecture overview with backend (FastAPI), frontend (ChatKit-JS), vector database (Qdrant), metadata storage (Neon), and embedding provider (OpenRouter)

2. Constitution Check: Verified alignment with RoboLearn Platform Constitution principles

3. Implementation Gates: Confirmed architecture feasibility, security compliance, and deployment strategy

4. Phase 0 Research: Made key decisions on embedding model (OpenRouter), chunking strategy (536 tokens), hosting platform (Railway), and text selection implementation (hybrid approach)

5. Phase 1 Design: Created detailed data models (DocumentChunk, QuerySession, QueryHistory, DocumentMetadata), API contracts (OpenAPI spec), and quickstart guide

6. Phase 2 Roadmap: Structured implementation in 5 phases (backend infrastructure, ingestion pipeline, RAG engine, frontend integration, testing/deployment)

7. Success Criteria: Defined technical metrics and functional validation requirements

8. Risk Mitigation: Identified potential technical and deployment risks with mitigation strategies

Also created supporting artifacts:
- Data model documentation
- API contract specification (OpenAPI)
- Quickstart guide
- Agent context update
- Research findings documentation

## Outcome

- ✅ Impact: Created comprehensive implementation plan with architecture and roadmap
- 🧪 Tests: Plan validated against constitution and technical feasibility
- 📁 Files: Multiple artifacts created (plan, data model, contracts, etc.)
- 🔁 Next prompts: Ready for task breakdown and implementation
- 🧠 Reflection: Plan provides clear roadmap for RAG chatbot development

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS - All gates passed
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin backend infrastructure implementation