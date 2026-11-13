import React, { useState } from 'react';

function NoteEditor({ onNoteCreated, isCreating }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation: ensure neither field is empty or just whitespace
    if (!title.trim() && !content.trim()) {
      setValidationError('Please enter both a title and content for your note.');
      return;
    }
    if (!title.trim()) {
      setValidationError('Please enter a note title.');
      return;
    }
    if (!content.trim()) {
      setValidationError('Please enter some content for your note.');
      return;
    }

    setValidationError('');

    const success = await onNoteCreated({
      title: title.trim(),
      content: content.trim(),
    });

    if (success) {
      // Clear inputs upon successful submission
      setTitle('');
      setContent('');
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (validationError) setValidationError('');
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    if (validationError) setValidationError('');
  };

  return (
    <div className="note-editor-glass">
      {/* Ambient decorative glow around editor */}
      <div className="editor-ambient-glow"></div>

      <div className="editor-header">
        <div className="editor-title-wrap">
          <div className="editor-icon-badge">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <div>
            <h2 className="editor-heading">Draft New Entry</h2>
            <p className="editor-subtext">Stored permanently in local browser vault</p>
          </div>
        </div>

        <div className="editor-tag-pill">
          <span className="editor-tag-dot"></span>
          <span>Instant Auto-Index</span>
        </div>
      </div>

      {validationError && (
        <div className="editor-alert error">
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{validationError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="editor-form">
        <div className="form-group">
          <div className="form-label-row">
            <label htmlFor="note-title" className="form-label">
              Note Title
            </label>
            <span className="field-hint">Required</span>
          </div>
          <div className="input-wrapper">
            <input
              id="note-title"
              type="text"
              className="form-input"
              placeholder="e.g. System Architecture & High-Performance Pipelines"
              value={title}
              onChange={handleTitleChange}
              maxLength={120}
              disabled={isCreating}
              autoComplete="off"
            />
            <div className="input-focus-border"></div>
          </div>
        </div>

        <div className="form-group">
          <div className="form-label-row">
            <label htmlFor="note-content" className="form-label">
              Note Content
            </label>
            <span className="field-hint">Markdown / Text</span>
          </div>
          <div className="input-wrapper">
            <textarea
              id="note-content"
              className="form-textarea"
              placeholder="Describe your architecture, thoughts, meeting actions, or code references..."
              rows={5}
              value={content}
              onChange={handleContentChange}
              disabled={isCreating}
            ></textarea>
            <div className="input-focus-border"></div>
          </div>
        </div>

        <div className="editor-footer">
          <div className="char-counter-pill">
            <span className="char-number">{content.length}</span>
            <span className="char-label">characters</span>
          </div>

          <button
            type="submit"
            className="btn-glow-primary"
            disabled={isCreating || !title.trim() || !content.trim()}
          >
            <div className="btn-glow-layer"></div>
            <div className="btn-content">
              {isCreating ? (
                <>
                  <span className="spinner-neon"></span>
                  <span>Writing to Vault...</span>
                </>
              ) : (
                <>
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  <span>Commit Note</span>
                </>
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}

export default NoteEditor;
