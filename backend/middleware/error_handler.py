from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from typing import Callable
import logging

logger = logging.getLogger(__name__)


class APIError(Exception):
    """Base API exception class"""
    def __init__(self, message: str, status_code: int = 500):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


async def http_exception_handler(request: Request, exc: APIError):
    """Handle API errors"""
    logger.error(f"API Error: {exc.message}")
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": {"message": exc.message, "status_code": exc.status_code}}
    )


def add_error_handlers(app: FastAPI):
    """Add error handlers to the FastAPI app"""
    @app.exception_handler(APIError)
    async def handle_api_error(request: Request, exc: APIError):
        return await http_exception_handler(request, exc)

    @app.exception_handler(Exception)
    async def handle_general_error(request: Request, exc: Exception):
        logger.error(f"Unexpected error: {str(exc)}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={"error": {"message": "Internal server error", "status_code": 500}}
        )
        
        