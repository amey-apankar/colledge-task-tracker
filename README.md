# Task Space MERN Task Tracker

A task tracker built using the MERN stack (MongoDB, Express, React, Node.js). Designed with Bricolage Grotesque typography, an organic Forest Green and Warm Sand theme, and a zero-configuration automatic fallback database.

## Key Features

* Full CRUD Operations: Create tasks, view list, update status or details, and delete.
* Strict Form Validation: Length constraints (maximum 100 character title, 500 character description) and character counters.
* Dynamic Filters and Sorting: Filter list items instantly by status (Pending, In Progress, Completed) and sort by Creation Date or Priority Weight (High, Medium, Low).
* Interactive UI and Custom CSS: Handcrafted animations, smooth micro-interactions, responsive layouts (mobile and desktop), and responsive glassmorphic cards.
* Out-of-the-box In-Memory DB: Fallback to an automatic in-memory database server (mongodb-memory-server) if no remote connection string is configured. No database installation required.

## Setup and Running Locally

### 1. Prerequisites
* Node.js installed on your machine.

### 2. Backend Setup
1. Navigate to the backend directory:
   cd backend
2. Install dependencies:
   npm install
3. Create a .env file and define MONGO_URI to connect to your remote MongoDB instance. If left blank, it will automatically download and start an isolated in-memory database.
4. Run the backend development server:
   npm run dev

The server runs at http://localhost:5000

### 3. Frontend Setup
1. Navigate to the frontend directory:
   cd frontend
2. Install dependencies:
   npm install
3. Start the Vite development client:
   npm run dev

The client runs at http://localhost:5173
