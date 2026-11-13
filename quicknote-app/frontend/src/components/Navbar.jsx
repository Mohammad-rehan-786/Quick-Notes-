import React from 'react';

function Navbar({ notesCount = 0 }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-icon-wrapper">
            <div className="brand-icon-glow"></div>
            <div className="brand-icon">
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>
          <div className="brand-info">
            <div className="brand-title-row">
              <h1 className="brand-title">
                Quick<span className="brand-gradient-text">Note</span>
              </h1>
              <span className="brand-version-badge">v2.0</span>
            </div>
            <p className="brand-subtitle">Hyper-Fast Modular Knowledge Space</p>
          </div>
        </div>

        <div className="navbar-actions">
          {/* Notes count indicator */}
          <div className="count-pill" title="Total notes saved in browser storage">
            <span className="count-pulse-dot"></span>
            <span className="count-label">Vault:</span>
            <span className="count-value">{notesCount} {notesCount === 1 ? 'Note' : 'Notes'}</span>
          </div>

          <div className="connection-pill">
            <span className="live-spark"></span>
            <span>Local Vault • Zero Backend</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
