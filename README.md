# CodeQuest Interview Lab

> **Tagline:** Practice. Debug. Think. Crack Interviews.

**CodeQuest Interview Lab** is a web-based technical interview practice platform designed to help developers and students prepare for coding interviews across 4 completely distinct practice modes.

---

## 🚀 Key Features & 4 Practice Modes

1. **Mode 1 — Find the Mistake & Run**
   - **Supported Languages:** Python | C | Java
   - **Concept:** Code snippet contains a small intentional mistake (syntax error, logic bug, wrong operator, loop condition). The user identifies the bug, edits the code in the editor, and executes it.
2. **Mode 2 — Write Code From Scratch**
   - **Supported Languages:** Python | C | Java | SQL
   - **Concept:** Problem statement, input/output descriptions, constraints, and test cases provided without starter solution code. User writes the full program or SQL query from scratch.
3. **Mode 3 — Predict the Output**
   - **Supported Languages:** Python | C | Java
   - **Concept:** Complete program provided alongside multiple output options. User selects the correct output, submits, and views an explanation of why the output occurs.
4. **Mode 4 — Fill the Missing Code**
   - **Supported Languages:** Python | C | Java
   - **Concept:** Code provided with clearly visible placeholders (`________`). User fills in the missing code and executes the completed program.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite 6, Tailwind CSS, Lucide Icons, Monaco Editor (`@monaco-editor/react`).
- **Backend:** Node.js, Express, Child Process Sandbox Isolation.
- **Languages Executed:**
  - **Python:** Python 3.12 (`python`)
  - **C:** GCC (`gcc` / Dev-Cpp GCC)
  - **Java:** JDK (`javac` & `java`)
  - **SQL:** SQLite 3 in-memory engine

---

## 📂 Project Structure

```
codequest/
├── public/                  # Static assets
├── server/
│   ├── data/
│   │   └── questions.js     # Question database across all 4 modes & 4 languages
│   ├── routes/
│   │   ├── questionRoutes.js# REST endpoints for questions & mode filtering
│   │   └── executionRoutes.js# Endpoints for code execution & SQL queries
│   ├── services/
│   │   ├── codeSandbox.js   # Isolated Python, C, Java execution sandbox
│   │   └── sqlSandbox.js    # SQLite execution engine & schema populator
│   └── index.js             # Express server entry point
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Header with mode indicator & live statistics
│   │   ├── HomePage.jsx     # Landing page featuring the 4 practice cards
│   │   ├── ModeCard.jsx     # Card component for each mode
│   │   ├── ModeSetupModal.jsx# Setup modal for language & difficulty
│   │   ├── PracticeSession.jsx# Main practice studio layout & navigation
│   │   ├── QuestionPanel.jsx# Question statement & options
│   │   ├── CodeEditor.jsx   # Monaco code editor wrapper
│   │   ├── ResultPanel.jsx  # Test cases, logs, SQL tables & verdict badges
│   │   ├── CompletionSummary.jsx# End of session summary & statistics
│   │   └── UnsavedWarningModal.jsx# Unsaved changes protection modal
│   ├── services/
│   │   └── api.js           # API client for backend communication
│   ├── App.jsx              # Main App layout & view management
│   ├── main.jsx             # React DOM root
│   └── index.css            # Tailwind directives & custom scrollbars
├── .env.example             # Example environment variables
├── package.json             # NPM dependencies & scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite development server configuration
└── README.md                # Project documentation
```

---

## ⚙️ Installation & Setup

1. **Clone or navigate to the project directory:**
   ```bash
   cd codequest
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Start Development Servers (Frontend + Backend concurrently):**
   ```bash
   npm run dev
   ```
   - **Frontend:** `http://localhost:3000`
   - **Backend API:** `http://localhost:5000`

---

## 🔐 Code & SQL Execution Security

- **Process Isolation:** User code runs inside temporary directories created with `fs.mkdtemp`.
- **Execution Timeouts:** Enforced 5-second maximum execution timeout (`timeout: 5000`) to prevent infinite loops or process hangs.
- **Resource Cleanup:** Temporary directories and files are immediately destroyed after execution (`fs.rm`).
- **SQL Sandbox:** SQL queries run against a temporary, isolated SQLite in-memory database (`:memory:`) populated with table schema and sample data. Dangerous DDL/PRAGMA operations are restricted.

---

## 🏭 Production Build

To build the application for production deployment:
```bash
npm run build
npm start
```
The Express backend serves both the API endpoints and the static Vite frontend production bundle.
