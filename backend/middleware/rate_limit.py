from fastapi import FastAPI, Request, HTTPException
from collections import defaultdict
from datetime import datetime, timedelta
import time
import logging

logger = logging.getLogger(__name__)

# Simple in-memory rate limiter (for demo purposes)
# In production, use Redis or similar for distributed rate limiting
request_counts = defaultdict(list)


def add_rate_limiting(app: FastAPI):
    """Add rate limiting middleware to the FastAPI app"""
    @app.middleware("http")
    async def rate_limit_middleware(request: Request, call_next):
        # Get client IP
        client_ip = request.client.host

        # Define rate limits (requests per minute)
        max_requests_per_minute = 60  # Adjust as needed

        # Clean old requests (older than 1 minute)
        now = datetime.utcnow()
        cutoff_time = now - timedelta(minutes=1)
        request_counts[client_ip] = [
            timestamp for timestamp in request_counts[client_ip]
            if timestamp > cutoff_time
        ]

        # Check if limit exceeded
        if len(request_counts[client_ip]) >= max_requests_per_minute:
            logger.warning(f"Rate limit exceeded for IP: {client_ip}")
            raise HTTPException(
                status_code=429,
                detail="Rate limit exceeded. Please try again later."
            )

        # Add current request timestamp
        request_counts[client_ip].append(now)

        response = await call_next(request)
        return response