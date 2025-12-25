@echo off
REM Startup script for RAG Chatbot Backend on Windows

REM Activate virtual environment if it exists
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
) else if exist "env\Scripts\activate.bat" (
    call env\Scripts\activate.bat
)

REM Install dependencies if requirements.txt exists
if exist "requirements.txt" (
    pip install -r requirements.txt
)

REM Start the FastAPI application
echo Starting RAG Chatbot Backend...
set HOST=0.0.0.0
set PORT=%API_PORT%
if "%PORT%"=="" set PORT=8000
uvicorn main:app --host %HOST% --port %PORT% --reload