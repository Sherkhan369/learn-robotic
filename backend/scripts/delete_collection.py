import sys
import asyncio
from pathlib import Path

# Add the backend directory to the path so we can import modules
sys.path.append(str(Path(__file__).parent))

from services.vector_db import vector_db_service

async def main():
    print("Deleting Qdrant collection...")
    try:
        await vector_db_service.delete_collection()
        print("Collection deleted successfully!")
    except Exception as e:
        print(f"Error deleting collection: {e}")
        # If collection doesn't exist, that's fine too
        print("Collection may not have existed, which is OK")

if __name__ == "__main__":
    asyncio.run(main())