import sqlite3
from pathlib import Path

# Path to the SQLite database file in the backend directory
DB_PATH = Path(__file__).resolve().parent / "quicknote.db"


def get_db_connection() -> sqlite3.Connection:
    """Create and return a SQLite database connection with row access by column name."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    # Ensure foreign keys are respected if relations are added in the future
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn


def init_db():
    """Initialize the SQLite database and create the 'notes' table if it does not exist."""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at TEXT NOT NULL
            );
            """
        )
        conn.commit()


if __name__ == "__main__":
    init_db()
    print(f"Database initialized successfully at {DB_PATH}")

