from services.vector_db import vector_db_service
import asyncio
import sys
import os

# Add the backend directory to the path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

async def test():
    try:
        count = await vector_db_service.get_vector_count()
        print(f'Vector count: {count}')
    except Exception as e:
        print(f'Error getting vector count: {e}')

if __name__ == "__main__":
    asyncio.run(test())