# DevFest Event Guide Chatbot

Welcome to the DevFest Event Guide Chatbot project! This application is designed to help attendees navigate the DevFest Ogbomoso 2025 event, providing information about schedules, speakers, and more through an interactive AI-powered chat interface.

## 🚀 Project Overview

This project consists of two main parts:
- **Backend**: A Python-based API server using Google's Agent Development Kit (ADK) and Gemini models to power the chatbot's intelligence.
- **Frontend**: A modern, responsive React application built with Vite, Tailwind CSS, and HeroUI, featuring a beautiful landing page and an embedded chatbot widget.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v18 or higher)
- **Python** (v3.11 or higher)
- **uv** (Fast Python package installer and resolver)
- **Make** (Build automation tool)

## ⚡ Quick Start

The easiest way to run the entire project (both backend and frontend) is using the provided `Makefile`.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd devfest-event-chatbot
    ```

2.  **Install dependencies:**
    ```bash
    make install
    ```
    This command will install Python dependencies using `uv` and frontend dependencies using `npm`.

3.  **Run the application:**
    ```bash
    make dev
    ```
    This will start both the backend server (on port 8000) and the frontend development server (usually on port 5173) concurrently.

4.  **Open your browser:**
    Navigate to `http://localhost:5173` to see the application in action.

## 📂 Project Structure

```
devfest-event-chatbot/
├── backend/            # Python backend code
│   ├── devfest_guide/  # Agent logic and configuration
│   ├── .venv/          # Virtual environment (managed by uv)
│   ├── pyproject.toml  # Python project dependencies
│   └── uv.lock         # Lock file for Python dependencies
├── frontend/           # React frontend code
│   ├── src/            # Source code (components, pages, etc.)
│   ├── public/         # Static assets
│   ├── package.json    # Frontend dependencies
│   └── tailwind.config.cjs # Tailwind CSS configuration
├── Makefile            # Automation commands
└── README.md           # This file
```

## 🔧 Manual Setup

If you prefer to run the backend and frontend separately or want to understand the setup process in detail:

### Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Sync dependencies:
    ```bash
    uv sync
    ```

3.  Run the backend server:
    ```bash
    uv run adk api_server . --allow_origins="*"
    ```

### Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
