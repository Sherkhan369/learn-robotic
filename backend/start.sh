#!/bin/bash

# Startup script for RAG Chatbot Backend

# Activate virtual environment if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
elif [ -d "env" ]; then
    source env/bin/activate
fi

# Install dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
fi

# Start the FastAPI application
echo "Starting RAG Chatbot Backend..."
uvicorn main:app --host 0.0.0.0 --port ${API_PORT:-8000} --reload