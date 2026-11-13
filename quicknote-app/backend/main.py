from contextlib import asynccontextmanager
from datetime import datetime
from typing import List
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

from database import get_db_connection, init_db
from models import NoteCreate, NoteResponse, MessageResponse


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle event handler that runs on application startup and shutdown."""
    # Ensure database table is created before accepting requests
    init_db()
    yield


# Initialize FastAPI application
app = FastAPI(
    title="QuickNote API",
    description="REST API backend for the QuickNote web application",
    version="1.0.0",
    lifespan=lifespan,
)

# Configure CORS so the React frontend can communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from Vite dev server and any local port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Health"])
def health_check():
    """Health check endpoint to verify backend status."""
    return {"status": "online", "message": "QuickNote API is running successfully"}


@app.get("/notes", response_model=List[NoteResponse], tags=["Notes"])
def get_all_notes():
    """
    Retrieve all saved notes from the SQLite database.
    Notes are returned ordered by ID descending (newest first).
    """
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, title, content, created_at FROM notes ORDER BY id DESC"
        )
        rows = cursor.fetchall()
        # Convert sqlite3.Row objects to standard Python dictionaries
        return [dict(row) for row in rows]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch notes: {str(e)}"
        )
    finally:
        conn.close()


@app.get("/notes/{note_id}", response_model=NoteResponse, tags=["Notes"])
def get_note_by_id(note_id: int):
    """
    Retrieve a specific note by its unique ID.
    Returns 404 if the note does not exist.
    """
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, title, content, created_at FROM notes WHERE id = ?",
            (note_id,)
        )
        row = cursor.fetchone()
        if not row:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Note with ID {note_id} not found."
            )
        return dict(row)
    finally:
        conn.close()


@app.post("/notes", response_model=NoteResponse, status_code=status.HTTP_201_CREATED, tags=["Notes"])
def create_note(note: NoteCreate):
    """
    Create a new note with a title and content.
    Stores the note permanently in the SQLite database with a timestamp.
    """
    title = note.title.strip()
    content = note.content.strip()

    if not title or not content:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Title and content are required and cannot be empty."
        )

    # Human-readable formatted creation date
    created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO notes (title, content, created_at) VALUES (?, ?, ?)",
            (title, content, created_at)
        )
        conn.commit()
        new_id = cursor.lastrowid

        # Fetch the newly created row to return to the client
        cursor.execute(
            "SELECT id, title, content, created_at FROM notes WHERE id = ?",
            (new_id,)
        )
        new_note = cursor.fetchone()
        return dict(new_note)
    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create note: {str(e)}"
        )
    finally:
        conn.close()


@app.delete("/notes/{note_id}", response_model=MessageResponse, status_code=status.HTTP_200_OK, tags=["Notes"])
def delete_note(note_id: int):
    """
    Delete a specific note by its unique ID.
    Returns 404 if the note does not exist.
    """
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        # Check if the note exists before attempting deletion
        cursor.execute("SELECT id FROM notes WHERE id = ?", (note_id,))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Note with ID {note_id} not found."
            )

        cursor.execute("DELETE FROM notes WHERE id = ?", (note_id,))
        conn.commit()
        return {"message": f"Note with ID {note_id} was successfully deleted."}
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete note: {str(e)}"
        )
    finally:
        conn.close()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

