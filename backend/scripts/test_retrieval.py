import sys
import asyncio
from pathlib import Path

# Add the backend directory to the path so we can import modules
sys.path.append(str(Path(__file__).parent))

from services.retrieval import retrieval_service
from services.embedding import embedding_client

async def test_retrieval():
    print("Testing retrieval functionality...")

    # Test query
    query = "What is robotics?"

    try:
        # Retrieve relevant chunks
        results = await retrieval_service.retrieve_relevant_chunks(query, limit=3)

        print(f"Query: {query}")
        print(f"Found {len(results)} relevant chunks:")

        for i, result in enumerate(results, 1):
            print(f"\n--- Result {i} (Score: {result['score']:.3f}) ---")
            print(f"Content preview: {result['content'][:200]}...")
            print(f"Source: {result.get('source_path', 'Unknown')}")
            print(f"Section: {result.get('section', 'Unknown')}")

        if results:
            print("\nSUCCESS: Retrieval test completed successfully!")
            print("Qdrant vector database with embeddings is working correctly.")
        else:
            print("\nWARNING: No results found - this might indicate an issue.")

    except Exception as e:
        print(f"ERROR: Error during retrieval test: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_retrieval())