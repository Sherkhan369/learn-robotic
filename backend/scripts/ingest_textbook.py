import asyncio
import sys
import argparse
from pathlib import Path

# Add the backend directory to the path so we can import modules
sys.path.append(str(Path(__file__).parent))
sys.path.append(str(Path(__file__).parent.parent))

from services.ingestion import ingestion_service
from services.database import init_db, engine
from sqlalchemy.ext.asyncio import AsyncSession


async def main():
    parser = argparse.ArgumentParser(description="Ingest textbook content into RAG system")
    parser.add_argument("--source-path", required=True, help="Path to textbook MDX files")
    parser.add_argument("--force-rebuild", action="store_true", help="Force rebuild of vector database")

    args = parser.parse_args()

    source_path = args.source_path
    force_rebuild = args.force_rebuild

    print(f"Starting textbook ingestion from: {source_path}")
    print(f"Force rebuild: {force_rebuild}")

    # Initialize database
    await init_db()

    # Create async session
    async with AsyncSession(engine) as session:
        # Perform ingestion
        result = await ingestion_service.ingest_textbook(source_path, session)

    print(f"Ingestion completed!")
    print(f"Documents processed: {result['documents']}")
    print(f"Chunks created: {result['chunks']}")


if __name__ == "__main__":
    asyncio.run(main())