import requests
import json
import sys
import os

# Test the backend API directly
def test_api():
    base_url = "http://localhost:8000"

    # Test health endpoint first
    try:
        health_response = requests.get(f"{base_url}/health")
        print(f"Health check: {health_response.status_code}")
        if health_response.status_code == 200:
            print("API is running:", health_response.json())
        else:
            print("API health check failed")
            return False
    except Exception as e:
        print(f"API is not running or inaccessible: {e}")
        print("Please start the backend server using: uvicorn main:app --reload --port 8000")
        return False

    # Test a simple query
    try:
        query_data = {
            "query": "What is robotics?",
            "session_id": "test_session_123"
        }

        query_response = requests.post(
            f"{base_url}/api/v1/query",
            json=query_data,
            headers={"Content-Type": "application/json"}
        )

        print(f"Query response: {query_response.status_code}")
        if query_response.status_code == 200:
            result = query_response.json()
            print("Query successful:", result.get("response", "No response text"))
        else:
            print("Query failed:", query_response.text)

    except Exception as e:
        print(f"Query test failed: {e}")
        return False

    return True

if __name__ == "__main__":
    success = test_api()
    if not success:
        print("\nThe backend server might not be running.")
        print("Please start it with: uvicorn main:app --reload --port 8000")
        sys.exit(1)