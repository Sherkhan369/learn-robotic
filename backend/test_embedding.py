import asyncio
import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), 'backend'))

# Import the embedding client
from services.embedding import embedding_client

async def test_embedding():
    try:
        print("Testing embedding client...")
        result = await embedding_client.create_embedding("test query")
        print(f"Embedding created successfully. Length: {len(result)}")
        print("Embedding client is working correctly.")
        return True
    except Exception as e:
        print(f"Error creating embedding: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = asyncio.run(test_embedding())
    if not success:
        print("Embedding client test failed.")
        sys.exit(1)
    else:
        print("Embedding client test passed.")