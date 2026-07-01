# Modern Task Space (MERN Task Tracker)

A premium, highly interactive Task Tracker built using the MERN stack (MongoDB, Express, React, Node.js). Designed with custom **Bricolage Grotesque** typography, an organic **Forest Green & Warm Sand** theme, and a zero-configuration automatic fallback database.

## Key Features

- **Full CRUD Operations**: Create tasks, view list, update status/details, and delete.
- **Strict Form Validation**: Length constraints (max 100 character title, 500 character description) and character counters.
- **Dynamic Filters & Sorting**: Filter list items instantly by status (`Pending`, `In Progress`, `Completed`) and sort by Creation Date or Priority Weight (`High` -> `Medium` -> `Low`).
- **Interactive UI & Custom CSS**: Handcrafted animations, smooth micro-interactions, responsive layouts (mobile & desktop), and responsive glassmorphic cards.
- **Out-of-the-Box In-Memory DB**: Fallback to an automatic in-memory database server (`mongodb-memory-server`) if no remote URI is configured. No database installation required.

---

## Setup & Running Locally

### 1. Prerequisites
- Node.js installed on your machine.

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Create a `.env` file and define `MONGO_URI` to connect to your remote MongoDB instance. If left blank, it will automatically download and start an isolated in-memory database.
4. Run the backend development server:
   ```bash
   npm run dev
   ```
   *The server runs at http://localhost:5000*

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development client:
   ```bash
   npm run dev
   ```
   *The client runs at http://localhost:5173*
