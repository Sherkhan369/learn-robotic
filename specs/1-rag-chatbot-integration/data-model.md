# Data Model: RAG Chatbot for Physical AI & Humanoid Robotics Textbook

**Feature**: 1-rag-chatbot-integration
**Created**: 2025-12-24
**Status**: Draft

## Entity: DocumentChunk

Represents a chunk of textbook content stored in the vector database for retrieval.

### Fields
- `id` (UUID): Unique identifier for the chunk
- `document_id` (String): Reference to source document (file path)
- `content` (Text): The actual text content of the chunk (max 536 tokens)
- `embedding` (Vector): Vector representation for similarity search
- `metadata` (JSON): Source information including:
  - `file_path`: Original MDX file location
  - `section_title`: Section/chapter title
  - `page_number`: Page number if available
  - `module`: Which module this content belongs to (1-4)
  - `chapter`: Chapter number
  - `created_at`: Timestamp of original content
- `created_at` (DateTime): Timestamp of chunk creation
- `updated_at` (DateTime): Timestamp of last update

### Relationships
- One-to-many with `QueryHistory` (via retrieved_chunks reference)

### Validation Rules
- `content` must not exceed 536 tokens
- `embedding` must be a valid vector representation
- `document_id` must reference an existing document

## Entity: QuerySession

Tracks user sessions for query history and analytics.

### Fields
- `id` (UUID): Unique identifier for the session
- `user_id` (String, optional): User identifier if available
- `session_token` (String): Anonymous session identifier (UUID)
- `created_at` (DateTime): Session start time
- `updated_at` (DateTime): Last activity time
- `last_activity_at` (DateTime): Timestamp of last query

### Relationships
- One-to-many with `QueryHistory`

### Validation Rules
- `session_token` must be unique
- `user_id` must be valid if provided

## Entity: QueryHistory

Stores query history for analytics and debugging.

### Fields
- `id` (UUID): Unique identifier for the query
- `session_id` (UUID): Reference to the session
- `query_text` (Text): Original user query (max 1000 characters)
- `query_type` (Enum): "general" or "selected_text"
- `selected_text` (Text, optional): Text provided for selected-text queries
- `response_text` (Text): Generated response
- `response_tokens` (Integer): Number of tokens in response
- `processing_time_ms` (Integer): Time taken to process query
- `retrieved_chunks` (JSON): Array of chunk IDs used for response
- `confidence_score` (Float): Confidence score of the response (0-1)
- `feedback_score` (Integer, optional): User feedback rating (1-5)
- `created_at` (DateTime): Query timestamp

### Relationships
- Many-to-one with `QuerySession`
- Many-to-many with `DocumentChunk` (via retrieved_chunks)

### Validation Rules
- `query_text` must not be empty
- `query_type` must be either "general" or "selected_text"
- `confidence_score` must be between 0 and 1

## Entity: DocumentMetadata

Stores metadata about textbook documents for tracking and organization.

### Fields
- `id` (UUID): Unique identifier for the document
- `file_path` (String): Path to the MDX file
- `title` (String): Title of the document
- `module` (Integer): Module number (1-4)
- `chapter` (Integer): Chapter number within module
- `section` (String): Section title
- `word_count` (Integer): Total word count in document
- `chunk_count` (Integer): Number of chunks created from document
- `ingestion_status` (Enum): "pending", "processing", "completed", "failed"
- `ingested_at` (DateTime, optional): Time when document was ingested
- `updated_at` (DateTime): Last update time

### Relationships
- One-to-many with `DocumentChunk`

### Validation Rules
- `file_path` must be unique
- `module` must be between 1 and 4
- `chapter` must be positive

## State Transitions

### Document Ingestion Flow
1. `pending` → `processing` when ingestion starts
2. `processing` → `completed` when all chunks are stored
3. `processing` → `failed` when ingestion encounters errors
4. `completed` → `processing` when document is updated and needs reprocessing

### Query Processing Flow
1. Query received → record in QueryHistory with initial state
2. Process query → retrieve relevant chunks from vector database
3. Generate response → update QueryHistory with response and metadata
4. Return response → complete the query transaction