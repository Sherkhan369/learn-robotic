# 5. API Model Configuration and Enhanced Error Handling for RAG Chatbot

Date: 2025-12-25

## Status

Proposed

## Context

The RAG chatbot was returning generic error messages ("Sorry, I encountered an error processing your request") when users asked book-related questions. Investigation revealed multiple issues:
1. Incorrect embedding model configuration (using a non-embedding model)
2. Missing textbook content in the vector database
3. Insufficient error handling for edge cases like empty search results
4. Generic error messages that didn't help users understand the actual issues

## Decision

We will implement the following changes to improve API model configuration and error handling:

### API Configuration
- Use `openai/text-embedding-ada-002` as the embedding model instead of the invalid `xiaomi/mimo-v2-flash:free`
- Ensure CHAT_MODEL is explicitly configured as `openai/gpt-4-turbo` for OpenRouter
- Add validation checks for API keys before making requests

### Error Handling Enhancements
- Frontend: Provide specific error messages based on error types (500, 429, 401/403, network)
- Backend: Handle cases where no search results are found with helpful responses
- Backend: Validate input text before processing embeddings
- Add proper handling for selected-text queries with insufficient content

### Content Ingestion
- Run the ingestion script to populate the vector database with textbook content from the docs directory
- Process all MDX files to create searchable content chunks

## Alternatives Considered

1. **Keep generic error messages**: Would continue to provide poor user experience with no actionable feedback
2. **Use different embedding models**: Explored various OpenRouter embedding models but settled on the standard OpenAI model for reliability
3. **Client-side error handling only**: Would not address the root cause of missing content and API misconfiguration
4. **Manual content management**: Would be less scalable than the automated ingestion approach

## Consequences

### Positive
- Users receive actionable feedback when errors occur instead of generic messages
- Proper API configuration ensures reliable embedding and LLM calls
- Complete textbook content in vector database enables accurate responses
- Better user experience with specific guidance on how to resolve issues
- More maintainable system with proper validation and error handling

### Negative
- Additional complexity in error handling logic
- Need to maintain both frontend and backend error handling
- Dependency on specific model availability from API providers
- Requires running ingestion process as part of deployment

## Implementation Notes

The changes were implemented across multiple files:
- Frontend: Enhanced error handling in ChatbotComponent.jsx
- Backend: Improved query processing in api/v1/query.py
- Configuration: Updated .env with proper model settings
- Services: Added validation in LLM and embedding services
- Process: Executed ingestion script to populate content database