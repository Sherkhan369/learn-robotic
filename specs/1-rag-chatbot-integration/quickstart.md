# Quickstart Guide: RAG Chatbot Backend

## Prerequisites

- Python 3.11.9
- pip package manager
- Git
- API keys for OpenRouter (or OpenAI)
- Access to Qdrant Cloud and Neon Postgres

## Setup

### 1. Clone the Repository
```bash
git clone <backend-repo-url>
cd rag-chatbot-backend
```

### 2. Set Up Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your API keys and database URLs:
```env
OPENROUTER_API_KEY=your_openrouter_key_here
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
NEON_DATABASE_URL=your_neon_database_url
```

## Running the Application

### 1. Start the Development Server
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### 2. Run Database Migrations
```bash
python -m scripts.migrate_db
```

### 3. Run Ingestion Pipeline
```bash
python -m scripts.ingest_textbook --source-path /path/to/textbook/docs
```

## Testing the API

### General Query
```bash
curl -X POST http://localhost:8000/api/v1/query \
  -H "Content-Type: application/json" \
  -d '{"query": "Explain ROS 2 nodes", "session_id": "test_session"}'
```

### Selected Text Query
```bash
curl -X POST http://localhost:8000/api/v1/query/selected-text \
  -H "Content-Type: application/json" \
  -d '{"selected_text": "ROS 2 nodes are the fundamental building blocks...", "query": "What does this mean?", "session_id": "test_session"}'
```

## Deployment

### To Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Link project
railway link

# Deploy
railway up
```

### Environment Variables for Production
Set the following variables in your Railway dashboard:
- `OPENROUTER_API_KEY`
- `QDRANT_URL`
- `QDRANT_API_KEY`
- `NEON_DATABASE_URL`
- `ENVIRONMENT` (set to "production")

## Troubleshooting

### Common Issues
- **API Key Errors**: Verify your OpenRouter/Neon/Qdrant API keys are correct
- **Database Connection**: Ensure your Neon database URL is properly formatted
- **Vector DB Issues**: Check Qdrant URL and API key
- **CORS Errors**: Verify frontend domain is allowed in backend configuration

### Checking Service Health
```bash
curl http://localhost:8000/health
```