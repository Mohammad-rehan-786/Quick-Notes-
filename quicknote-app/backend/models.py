from pydantic import BaseModel, Field, field_validator


class NoteCreate(BaseModel):
    """Schema for creating a new note."""
    title: str = Field(..., description="Title of the note")
    content: str = Field(..., description="Content or description of the note")

    @field_validator("title")
    @classmethod
    def validate_title(cls, v: str) -> str:
        trimmed = v.strip()
        if not trimmed:
            raise ValueError("Note title cannot be empty or only whitespace.")
        return trimmed

    @field_validator("content")
    @classmethod
    def validate_content(cls, v: str) -> str:
        trimmed = v.strip()
        if not trimmed:
            raise ValueError("Note content cannot be empty or only whitespace.")
        return trimmed


class NoteResponse(BaseModel):
    """Schema for note response sent back to client."""
    id: int
    title: str
    content: str
    created_at: str


class MessageResponse(BaseModel):
    """Schema for generic status/message responses."""
    message: str

