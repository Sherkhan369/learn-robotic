from fastapi import APIRouter, HTTPException
from typing import List
import logging
from schemas.responses import QueryRequest, QueryResponse, SelectedTextQueryRequest, SourceReference
from services.vector_db import vector_db_service
from services.embedding import embedding_client
from services.llm_service import llm_service
from services.response_formatter import save_query_history
from services.query_tracker import query_tracker
from services.database import AsyncSessionLocal
from prompts.system_prompt import GENERAL_SYSTEM_PROMPT, SELECTED_TEXT_SYSTEM_PROMPT

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post("/query", response_model=QueryResponse)
async def query_endpoint(request: QueryRequest):
    """
    General RAG query endpoint - searches textbook content and generates response
    """
    try:
        logger.info(f"Processing query: {request.query[:50]}...")

        # Get database session
        async with AsyncSessionLocal() as db:
            # Get or create session
            session_id = await query_tracker.get_or_create_session(db, request.session_id)

            # Create embedding for the query
            try:
                query_embedding = await embedding_client.create_embedding(request.query)
            except Exception as embedding_error:
                logger.error(f"Error creating embedding for query: {embedding_error}")
                raise HTTPException(status_code=500, detail="Error creating embedding for query")

            # Search for relevant chunks in vector database
            try:
                search_results = await vector_db_service.search_vectors(
                    query_vector=query_embedding,
                    limit=5  # Retrieve top 5 most relevant chunks
                )
            except Exception as search_error:
                logger.error(f"Error searching vectors: {search_error}")
                raise HTTPException(status_code=500, detail="Error searching for relevant content")

            # Check if we have any search results
            if not search_results:
                logger.warning(f"No search results found for query: {request.query[:50]}...")
                # Return a helpful response instead of erroring
                response = QueryResponse(
                    success=True,
                    response="I couldn't find any relevant content in the textbook for your question. The textbook content may not have been properly ingested into the system yet. Please contact the administrator to ensure the textbook content has been processed.",
                    sources=[]
                )

                # Save query to history even if no results found
                await save_query_history(
                    db=db,
                    query_text=request.query,
                    response_text=response.response,
                    session_id=session_id,
                    query_type="general",
                    retrieved_chunks=[]
                )

                logger.info("Query processed with no results found")
                return response

            # Extract content from search results
            retrieved_chunks = [
                {
                    "id": result["id"],
                    "content": result["payload"]["content"],
                    "score": result["score"],
                    "source_path": result["payload"].get("source_path"),
                    "section": result["payload"].get("section")
                }
                for result in search_results
            ]

            # Generate response using LLM
            try:
                llm_response = await llm_service.generate_response(
                    query=request.query,
                    context_chunks=[chunk["content"] for chunk in retrieved_chunks],
                    system_prompt=GENERAL_SYSTEM_PROMPT
                )
            except Exception as llm_error:
                logger.error(f"Error generating LLM response: {llm_error}")
                # Return a helpful response instead of erroring
                response = QueryResponse(
                    success=True,
                    response="I found relevant content in the textbook, but encountered an issue generating a response. This might be due to API configuration issues or rate limiting. Please try again later.",
                    sources=[
                        SourceReference(
                            id=chunk["id"],
                            content=chunk["content"][:200] + "..." if len(chunk["content"]) > 200 else chunk["content"],
                            score=chunk["score"],
                            source_path=chunk["source_path"],
                            section=chunk["section"]
                        )
                        for chunk in retrieved_chunks
                    ]
                )

                # Save query to history
                await save_query_history(
                    db=db,
                    query_text=request.query,
                    response_text=response.response,
                    session_id=session_id,
                    query_type="general",
                    retrieved_chunks=retrieved_chunks
                )

                logger.info("Query processed with LLM error but returned helpful response")
                return response

            # Format response with sources
            sources = [
                SourceReference(
                    id=chunk["id"],
                    content=chunk["content"][:200] + "..." if len(chunk["content"]) > 200 else chunk["content"],
                    score=chunk["score"],
                    source_path=chunk["source_path"],
                    section=chunk["section"]
                )
                for chunk in retrieved_chunks
            ]

            response = QueryResponse(
                success=True,
                response=llm_response,
                sources=sources
            )

            # Save query to history
            await save_query_history(
                db=db,
                query_text=request.query,
                response_text=llm_response,
                session_id=session_id,
                query_type="general",
                retrieved_chunks=retrieved_chunks
            )

            logger.info("Query processed successfully")
            return response

    except Exception as e:
        logger.error(f"Error processing query: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Error processing query")


@router.post("/query/selected-text", response_model=QueryResponse)
async def query_selected_text_endpoint(request: SelectedTextQueryRequest):
    """
    Selected-text query endpoint - responds based only on provided selected text
    """
    try:
        logger.info(f"Processing selected-text query: {request.query[:50]}...")

        # Get database session
        async with AsyncSessionLocal() as db:
            # Get or create session
            session_id = await query_tracker.get_or_create_session(db, request.session_id)

            # For selected-text mode, we don't use vector search
            # Instead, we use the selected text as the context
            # Check if selected text is empty or too short
            if not request.selected_text or len(request.selected_text.strip()) < 5:
                response = QueryResponse(
                    success=True,
                    response="The selected text is too short to generate a meaningful response. Please select more text content.",
                    sources=[]
                )

                # Save query to history
                await save_query_history(
                    db=db,
                    query_text=f"Selected text query: {request.query}",
                    response_text=response.response,
                    session_id=session_id,
                    query_type="selected_text",
                    retrieved_chunks=[]
                )

                logger.info("Selected-text query processed with insufficient text")
                return response

            context_chunks = [request.selected_text]

            # Generate response using LLM with selected text as context
            try:
                llm_response = await llm_service.generate_response(
                    query=request.query,
                    context_chunks=context_chunks,
                    system_prompt=SELECTED_TEXT_SYSTEM_PROMPT
                )
            except Exception as llm_error:
                logger.error(f"Error generating LLM response for selected text: {llm_error}")
                # Return a helpful response instead of erroring
                response = QueryResponse(
                    success=True,
                    response="I have the selected text, but encountered an issue generating a response. This might be due to API configuration issues or rate limiting. Please try again later.",
                    sources=[
                        SourceReference(
                            id="selected_text",
                            content=request.selected_text[:200] + "..." if len(request.selected_text) > 200 else request.selected_text,
                            score=1.0,  # Perfect relevance since this is the selected text
                            source_path="selected_text",
                            section="user_selected"
                        )
                    ]
                )

                # Save query to history
                await save_query_history(
                    db=db,
                    query_text=f"Selected text query: {request.query}",
                    response_text=response.response,
                    session_id=session_id,
                    query_type="selected_text",
                    retrieved_chunks=[{
                        "id": "selected_text",
                        "content": request.selected_text,
                        "score": 1.0,
                        "source_path": "selected_text",
                        "section": "user_selected"
                    }]
                )

                logger.info("Selected-text query processed with LLM error but returned helpful response")
                return response

            # Format response with the selected text as source
            sources = [
                SourceReference(
                    id="selected_text",
                    content=request.selected_text[:200] + "..." if len(request.selected_text) > 200 else request.selected_text,
                    score=1.0,  # Perfect relevance since this is the selected text
                    source_path="selected_text",
                    section="user_selected"
                )
            ]

            response = QueryResponse(
                success=True,
                response=llm_response,
                sources=sources
            )

            # Save query to history
            await save_query_history(
                db=db,
                query_text=f"Selected text query: {request.query}",
                response_text=llm_response,
                session_id=session_id,
                query_type="selected_text",
                retrieved_chunks=[{
                    "id": "selected_text",
                    "content": request.selected_text,
                    "score": 1.0,
                    "source_path": "selected_text",
                    "section": "user_selected"
                }]
            )

            logger.info("Selected-text query processed successfully")
            return response

    except Exception as e:
        logger.error(f"Error processing selected-text query: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Error processing selected-text query")