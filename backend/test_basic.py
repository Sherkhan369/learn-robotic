"""
Basic tests to verify the RAG chatbot backend components are working
"""
import asyncio
import pytest
from main import app
from fastapi.testclient import TestClient


def test_health_endpoint():
    """Test the health endpoint"""
    client = TestClient(app)
    response = client.get("/health")

    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "RAG Chatbot Backend"


def test_root_endpoint():
    """Test the root endpoint"""
    client = TestClient(app)
    response = client.get("/")

    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "RAG Chatbot API" in data["message"]


# TODO: Add more comprehensive tests for the query endpoints
# These would require mocking the external services (OpenAI, Qdrant, etc.)

if __name__ == "__main__":
    test_health_endpoint()
    test_root_endpoint()
    print("Basic tests passed!")