import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import NoteEditor from './components/NoteEditor';
import NoteCard from './components/NoteCard';
import './App.css';

// Key for browser localStorage persistence
const STORAGE_KEY = 'quicknote_vault_notes';

// Default starter notes to display on first visit
const INITIAL_DEMO_NOTES = [
  {
    id: 1,
    title: 'Quantum Computing Fundamentals',
    content: 'Exploring superposition, quantum entanglement, and qubit gate algorithms with zero latency.',
    created_at: '2026-11-13 16:30:00',
  },
  {
    id: 2,
    title: 'Futuristic Glassmorphism Interface',
    content: 'Implemented electric cyan and neon purple accents with dynamic ambient light refraction and pure CSS.',
    created_at: '2026-11-13 16:45:00',
  },
  {
    id: 3,
    title: 'Client-Side Offline Engine',
    content: 'Full CRUD persistence powered by HTML5 LocalStorage. Zero backend servers or external network requirements.',
    created_at: '2026-11-13 17:00:00',
  },
];

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Helper to show temporary toast notification
  const showToast = (message, type = 'success') => {
    setToastMessage({ text: message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Helper to persist array to localStorage
  const persistNotes = (updatedNotes) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
    } catch (err) {
      console.error('Failed to write to localStorage:', err);
    }
  };

  // Load notes from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setNotes(JSON.parse(stored));
      } else {
        // Initialize with starter demo notes on first launch
        setNotes(INITIAL_DEMO_NOTES);
        persistNotes(INITIAL_DEMO_NOTES);
      }
    } catch (err) {
      console.error('Failed to read from localStorage:', err);
      setNotes(INITIAL_DEMO_NOTES);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle note creation (100% Client-Side LocalStorage)
  const handleCreateNote = async ({ title, content }) => {
    setIsCreating(true);
    try {
      // Simulate brief smooth response animation
      await new Promise((resolve) => setTimeout(resolve, 150));

      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

      const newNote = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim(),
        created_at: timestamp,
      };

      const updated = [newNote, ...notes];
      setNotes(updated);
      persistNotes(updated);
      showToast('Note committed to Local Vault!', 'success');
      return true;
    } catch (err) {
      console.error('Error saving note:', err);
      alert('Failed to save note locally.');
      return false;
    } finally {
      setIsCreating(false);
    }
  };

  // Handle note deletion (100% Client-Side LocalStorage)
  const handleDeleteNote = async (id) => {
    setDeletingId(id);
    try {
      await new Promise((resolve) => setTimeout(resolve, 120));
      const updated = notes.filter((note) => note.id !== id);
      setNotes(updated);
      persistNotes(updated);
      showToast('Note removed from Local Vault', 'info');
    } catch (err) {
      console.error('Error deleting note:', err);
    } finally {
      setDeletingId(null);
    }
  };

  // Restore starter demo notes
  const handleRestoreDemoNotes = () => {
    setNotes(INITIAL_DEMO_NOTES);
    persistNotes(INITIAL_DEMO_NOTES);
    showToast('Demo notes restored to Local Vault!', 'success');
  };

  // Filter notes based on search query
  const filteredNotes = notes.filter((note) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  });

  return (
    <div className="app-shell">
      {/* Floating Ambient Background Light Orbs */}
      <div className="ambient-orb orb-primary"></div>
      <div className="ambient-orb orb-secondary"></div>
      <div className="ambient-orb orb-tertiary"></div>

      {/* Header Navigation */}
      <Navbar notesCount={notes.length} />

      {/* Main Container */}
      <main className="main-viewport">
        <div className="content-container">

          {/* Toast Notification Alert */}
          {toastMessage && (
            <div className={`toast-cyber-pill ${toastMessage.type}`}>
              <span className="toast-glow-dot"></span>
              <span className="toast-text">{toastMessage.text}</span>
            </div>
          )}

          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-badge">
              <span className="hero-spark">✦</span>
              <span>100% Client-Side Architecture</span>
              <span className="hero-badge-tag">LocalStorage Vault</span>
            </div>

            <h1 className="hero-title">
              Your Thoughts. <span className="hero-gradient-text">Your Space.</span>
            </h1>

            <p className="hero-description">
              A minimalist, high-velocity workspace engineered for modern thinkers.
              Capture ideas seamlessly with zero latency and permanent local browser storage. No backend required.
            </p>

            <div className="hero-stats-row">
              <div className="stat-card">
                <span className="stat-number">100%</span>
                <span className="stat-label">Offline &amp; Secure</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-card">
                <span className="stat-number">0ms</span>
                <span className="stat-label">Server Latency</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-card">
                <span className="stat-number">Pure React</span>
                <span className="stat-label">Zero Backend</span>
              </div>
            </div>
          </section>

          {/* Note Editor Section */}
          <section className="section-editor">
            <NoteEditor
              onNoteCreated={handleCreateNote}
              isCreating={isCreating}
            />
          </section>

          {/* Saved Notes Section */}
          <section className="section-notes">
            <div className="notes-control-bar">
              <div className="notes-heading-group">
                <div className="heading-icon-wrap">
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
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <h2 className="notes-heading">Knowledge Vault</h2>
                <span className="neon-badge-count">
                  {notes.length} {notes.length === 1 ? 'Stored' : 'Stored'}
                </span>
              </div>

              {notes.length > 0 && (
                <div className="search-glass-wrap">
                  <svg
                    className="search-glass-icon"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    className="search-glass-input"
                    placeholder="Search titles or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="search-clear-btn"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear filter"
                    >
                      ✕
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="loading-cyber-state">
                <div className="cyber-spinner-rings">
                  <div className="ring ring-outer"></div>
                  <div className="ring ring-inner"></div>
                </div>
                <p className="loading-text">Loading vault from LocalStorage...</p>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && notes.length === 0 && (
              <div className="empty-cyber-state">
                <div className="empty-cyber-orb">
                  <svg
                    viewBox="0 0 24 24"
                    width="48"
                    height="48"
                    fill="none"
                    stroke="url(#empty-gradient)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <defs>
                      <linearGradient id="empty-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                  </svg>
                </div>
                <h3 className="empty-cyber-title">Vault is Currently Vacant</h3>
                <p className="empty-cyber-desc">
                  No notes saved in your local browser vault. Create your first note above or restore sample demo entries.
                </p>
                <button
                  type="button"
                  className="btn-cyan-link"
                  style={{ marginTop: '1rem', cursor: 'pointer' }}
                  onClick={handleRestoreDemoNotes}
                >
                  Restore Sample Notes
                </button>
              </div>
            )}

            {/* No Search Results */}
            {!isLoading && notes.length > 0 && filteredNotes.length === 0 && (
              <div className="no-search-glass">
                <p>No notes matched filter &quot;{searchQuery}&quot;</p>
                <button
                  type="button"
                  className="btn-cyan-link"
                  onClick={() => setSearchQuery('')}
                >
                  Clear filter
                </button>
              </div>
            )}

            {/* Notes Grid */}
            {!isLoading && filteredNotes.length > 0 && (
              <div className="notes-glass-grid">
                {filteredNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onDelete={handleDeleteNote}
                    isDeleting={deletingId === note.id}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Futuristic Footer */}
      <footer className="app-cyber-footer">
        <div className="content-container footer-flex">
          <div className="footer-left">
            <span className="footer-brand">QuickNote</span>
            <span className="footer-meta">Client-Side Architecture</span>
          </div>
          <div className="footer-right">
            <span>React.js</span>
            <span className="dot-sep">•</span>
            <span>Vite</span>
            <span className="dot-sep">•</span>
            <span>LocalStorage Engine</span>
            <span className="dot-sep">•</span>
            <span className="footer-secure-tag">100% Offline Capable</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
