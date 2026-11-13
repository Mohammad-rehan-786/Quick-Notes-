import React, { useState } from 'react';

function NoteCard({ note, onDelete, isDeleting }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Format timestamp into sleek human-readable format
  const formatDateTime = (dateString) => {
    if (!dateString) return 'Just now';
    try {
      const date = new Date(dateString.replace(' ', 'T'));
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const handleDeleteClick = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 4000);
    } else {
      onDelete(note.id);
    }
  };

  return (
    <article className="note-glass-card">
      {/* Top neon decorative gradient line */}
      <div className="card-neon-top-bar"></div>

      <div className="card-inner">
        <div className="card-header">
          <div className="card-title-row">
            <span className="card-cyber-dot"></span>
            <h3 className="card-title">{note.title}</h3>
          </div>

          <div className="card-actions">
            {confirmDelete ? (
              <button
                type="button"
                className="btn-card-delete confirm"
                onClick={handleDeleteClick}
                disabled={isDeleting}
                title="Click again to confirm deletion"
              >
                {isDeleting ? (
                  <span className="mini-spinner-neon"></span>
                ) : (
                  <>
                    <svg
                      viewBox="0 0 24 24"
                      width="13"
                      height="13"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Confirm?</span>
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                className="btn-card-delete"
                onClick={handleDeleteClick}
                disabled={isDeleting}
                title="Delete this note"
                aria-label={`Delete note: ${note.title}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <p className="card-content">{note.content}</p>

        <div className="card-footer">
          <div className="card-date-badge">
            <svg
              viewBox="0 0 24 24"
              width="13"
              height="13"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{formatDateTime(note.created_at)}</span>
          </div>

          <span className="card-id-pill">ID #{note.id}</span>
        </div>
      </div>
    </article>
  );
}

export default NoteCard;
