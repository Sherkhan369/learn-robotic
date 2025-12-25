# Tasks: RAG Chatbot for Physical AI & Humanoid Robotics Textbook

**Feature**: 1-rag-chatbot-integration
**Created**: 2025-12-24
**Status**: Draft
**Author**: Claude Code Agent

## Dependencies

User Story 1 (P1) is independent and provides core functionality.
User Story 2 (P2) depends on User Story 1 being completed (requires the RAG backend).
User Story 3 (P3) depends on User Story 1 being completed (requires the backend API).

## Parallel Execution Examples

- **User Story 1**: Tasks T010-T025 can be developed in parallel with proper coordination
- **User Story 2**: Tasks T030-T035 can be developed in parallel with User Story 1 backend components
- **User Story 3**: Frontend tasks can be developed in parallel with backend API development

## Implementation Strategy

**MVP Scope**: User Story 1 (P1) with basic query functionality and frontend widget.
**Incremental Delivery**: Each user story builds upon the previous one with additional features.

---

## Phase 1: Setup & Architecture

- [X] T001 Create backend project structure in backend/ directory
- [X] T002 Set up FastAPI application with basic configuration in backend/main.py
- [X] T003 Create requirements.txt with FastAPI, OpenAI Agents/ChatKit, Qdrant, Neon dependencies
- [X] T004 Set up environment configuration with .env.example file
- [X] T005 [P] Create basic health check endpoint at /health in backend/main.py
- [X] T006 [P] Set up logging configuration in backend/config/logging.py
- [X] T007 [P] Create configuration module for API keys and service URLs in backend/config/settings.py
- [X] T008 [P] Initialize Git repository with proper .gitignore for backend
- [X] T009 [P] Create README.md with setup instructions for backend

## Phase 2: Foundational Components

- [X] T010 Set up Qdrant vector database connection in backend/services/vector_db.py
- [X] T011 Set up Neon Postgres connection with async support in backend/services/database.py
- [X] T012 Create embedding client for OpenRouter in backend/services/embedding.py
- [X] T013 [P] Create DocumentChunk model in backend/models/document_chunk.py
- [X] T014 [P] Create QuerySession model in backend/models/query_session.py
- [X] T015 [P] Create QueryHistory model in backend/models/query_history.py
- [X] T016 [P] Create DocumentMetadata model in backend/models/document_metadata.py
- [ ] T017 [P] Create database migration scripts for all models
- [X] T018 [P] Set up CORS middleware for frontend integration in backend/main.py
- [X] T019 [P] Set up rate limiting middleware in backend/middleware/rate_limit.py
- [X] T020 [P] Create base API response models in backend/schemas/responses.py
- [X] T021 [P] Create error handling middleware in backend/middleware/error_handler.py

## Phase 3: User Story 1 - Ask Questions About Book Content (P1)

### Story Goal
As a student using the robotics textbook, I want to ask questions about the book content so that I can get immediate answers to help me understand complex topics like ROS 2, Gazebo, Unity, NVIDIA Isaac, and VLA.

### Independent Test Criteria
Can be fully tested by asking questions about book content and receiving accurate, contextually relevant answers that reference the textbook material.

**Acceptance Scenarios**:
1. **Given** I am viewing the textbook on GitHub Pages, **When** I type a question about robotics concepts in the chat interface, **Then** I receive an accurate answer based on the textbook content within 5 seconds.
2. **Given** I have a specific question about ROS 2 nodes from the textbook, **When** I ask "Explain ROS 2 nodes", **Then** the chatbot provides a comprehensive explanation based on the textbook content about ROS 2 nodes.

### Implementation Tasks

- [X] T022 [US1] Create MDX parser to extract clean text from docs/ files in backend/parsers/mdx_parser.py
- [X] T023 [US1] Implement chunking algorithm (512 tokens + 100 overlap) in backend/services/chunking.py
- [X] T024 [US1] Build embedding function for OpenRouter and upsert to Qdrant in backend/services/ingestion.py
- [X] T025 [US1] Store chunk-to-source mapping in Neon table in backend/services/ingestion.py
- [X] T026 [US1] Create ingestion script (one command) in backend/scripts/ingest_textbook.py
- [X] T027 [US1] Implement /api/v1/query endpoint - embed query → Qdrant search → ChatKit agent generation in backend/api/v1/query.py
- [X] T028 [US1] Implement similarity search in Qdrant for content retrieval in backend/services/retrieval.py
- [X] T029 [US1] Create LLM response generation with ChatKit in backend/services/llm_service.py
- [X] T030 [US1] Add strong system prompt enforcing grounding + no hallucinations in backend/prompts/system_prompt.py
- [X] T031 [US1] Implement response formatting and source attribution in backend/services/response_formatter.py
- [X] T032 [US1] Add query history tracking in backend/services/query_tracker.py
- [X] T033 [US1] Add basic error handling for the query endpoint in backend/api/v1/query.py
- [ ] T034 [US1] Test query endpoint with sample textbook content
- [ ] T035 [US1] Verify response time is under 5 seconds for 95% of queries

## Phase 4: User Story 2 - Query Selected Text for Detailed Information (P2)

### Story Goal
As a student studying a specific section of the textbook, I want to highlight text and ask questions specifically about that highlighted content so that I can get focused explanations about particular concepts.

### Independent Test Criteria
Can be fully tested by highlighting text in the textbook, asking a question about it, and receiving an answer that is specifically based on the highlighted text rather than the entire book.

**Acceptance Scenarios**:
1. **Given** I have selected/highlighted a paragraph about NVIDIA Isaac in the textbook, **When** I ask a follow-up question about that content, **Then** the chatbot responds with information specifically based on the highlighted text.
2. **Given** I am reading about VLA concepts and have highlighted a specific section, **When** I ask "What does this mean?", **Then** the chatbot provides an explanation based only on the highlighted text.

### Implementation Tasks

- [X] T036 [US2] Implement /api/v1/query/selected-text endpoint – direct context injection in backend/api/v1/query.py
- [X] T037 [US2] Create selected-text processing service in backend/services/selected_text_service.py
- [X] T038 [US2] Add validation to ensure answers are strictly from provided text only in backend/services/grounding_validator.py
- [X] T039 [US2] Update system prompt for selected-text mode in backend/prompts/selected_text_prompt.py
- [ ] T040 [US2] Test selected-text endpoint with sample textbook content
- [ ] T041 [US2] Verify selected-text mode uses only provided context without retrieving from vector DB

## Phase 5: User Story 3 - Access Chatbot Interface Seamlessly (P3)

### Story Goal
As a user of the textbook, I want to access the chatbot interface without additional setup so that I can immediately start asking questions about the book content.

### Independent Test Criteria
Can be fully tested by visiting the textbook site and being able to immediately interact with the chatbot without registration or additional configuration.

**Acceptance Scenarios**:
1. **Given** I am on any page of the textbook, **When** I access the chat interface, **Then** I can immediately start typing questions without any setup requirements.
2. **Given** I am a new visitor to the textbook site, **When** I first see the chat interface, **Then** it is intuitive and clearly indicates how to use it for asking questions about the book.

### Implementation Tasks

- [X] T042 [US3] Create ChatKit-JS configuration for textbook integration in frontend/chatkit-config.js
- [X] T043 [US3] Implement floating/side panel chat widget in frontend/components/ChatWidget.jsx
- [X] T044 [US3] Add text selection capture functionality in frontend/services/textSelection.js
- [X] T045 [US3] Style widget to match textbook theme in frontend/styles/chatWidget.css
- [X] T046 [US3] Implement dark mode support for chat widget in frontend/styles/chatWidget.css
- [X] T047 [US3] Add loading states and error handling in frontend/components/ChatWidget.jsx
- [X] T048 [US3] Create user session management in frontend/services/sessionManager.js
- [ ] T049 [US3] Integrate chat widget with Docusaurus theme in docusaurus.config.js
- [ ] T050 [US3] Test chat widget integration across all textbook pages
- [ ] T051 [US3] Verify chat widget is accessible and intuitive for new users

## Phase 6: Polish & Cross-Cutting Concerns

- [ ] T052 Add comprehensive logging for all API endpoints in backend/middleware/logging.py
- [ ] T053 Create API documentation using FastAPI's built-in docs
- [ ] T054 Implement monitoring and metrics for performance tracking
- [ ] T055 Add input validation for all API endpoints
- [ ] T056 Create backup and recovery procedures for databases
- [ ] T057 Set up deployment configuration for Railway in backend/.railway.yml
- [ ] T058 Create deployment scripts for backend and frontend updates
- [ ] T059 Add comprehensive error messages and user feedback
- [ ] T060 Perform load testing for concurrent users
- [ ] T061 Document deployment process and operational procedures
- [ ] T062 Create comprehensive test suite for all components
- [ ] T063 Perform final end-to-end testing of all user stories
- [ ] T064 Deploy backend to Railway
- [ ] T065 Update frontend with production API URL
- [ ] T066 Redeploy textbook to GitHub Pages with chatbot integration