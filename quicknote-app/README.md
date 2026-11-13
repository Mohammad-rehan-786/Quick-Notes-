# QuickNote — Futuristic Neon Glassmorphism Notes App

QuickNote is a high-velocity, 100% client-side (backend-less) note-taking application designed with a premium **Neon Glassmorphism + Futuristic Dark Theme**.

All notes are stored directly and permanently inside your browser's **HTML5 LocalStorage Vault** with zero network latency, zero setup friction, and zero backend server dependencies.

---

## 🚀 Key Highlights

- **100% Backend-Less & Offline Ready**: No Python, no FastAPI, no database servers to start. Works instantly in any modern browser.
- **Permanent Browser Vault**: Automatically persists notes to `localStorage`. Notes survive browser refreshes, tab closures, and computer restarts.
- **Neon Glassmorphism Aesthetics**: Deep space black (`#080B14`), electric cyan (`#06B6D4`), and neon purple (`#8B5CF6`) accents with frosted glass cards (`backdrop-filter: blur(16px)`).
- **Instant Full CRUD**:
  - **Create**: Add notes with validation and live character count.
  - **Read**: Live search filtering by title and content.
  - **Delete**: One-click deletion with interactive confirmation.
  - **Auto-Restore**: Pre-loaded with demo notes and a one-click restore button.
- **Pure CSS3**: Built without Tailwind CSS or heavy utility libraries.

---

## 🛠️ Technology Stack

- **Framework**: React 18 (Functional Components, Hooks)
- **Bundler**: Vite 5
- **Styling**: Pure CSS3 with custom properties, glassmorphism, and neon glow effects
- **Persistence**: HTML5 `localStorage` Engine

---

## ⚡ Quick Start (Windows PowerShell)

You only need Node.js installed.

1. Navigate to the frontend directory:
   ```powershell
   cd "quicknote-app\frontend"
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Start the Vite development server:
   ```powershell
   npm run dev
   ```

Open your browser at:
👉 **`http://localhost:5173`**

---

## 📁 Project Architecture

```
quicknote-app/
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx         # Header with glowing logo & live notes vault counter
    │   │   ├── NoteCard.jsx       # Frosted glass card with timestamp & delete confirm
    │   │   └── NoteEditor.jsx     # Glass form with focus glow & commit button
    │   ├── App.jsx                # Core app, state & LocalStorage engine
    │   ├── App.css                # Futuristic neon glassmorphism CSS
    │   ├── index.css              # Reset, typography (Outfit & Inter), color variables
    │   └── main.jsx               # React DOM entry point
    ├── index.html                 # HTML shell with Google Fonts
    ├── package.json               # Dependencies & scripts
    └── vite.config.js             # Vite configuration
```
