# Codelab: Building the DevFest Event Guide Chatbot

This codelab will guide you through the process of building the DevFest Event Guide Chatbot from scratch. You'll learn how to set up a Python backend with Google's ADK and a React frontend with a modern UI.

## Prerequisites

- **Node.js** (v18+)
- **Python** (v3.11+)
- **uv** (Install via `curl -LsSf https://astral.sh/uv/install.sh | sh`)
- **IDE** (VS Code recommended)

---

## Step 1: Project Initialization

First, let's create the root directory for our project.

```bash
mkdir devfest-event-chatbot
cd devfest-event-chatbot
```

We'll also create a `Makefile` to make running commands easier later on. Create a file named `Makefile` in the root directory:

```makefile
install:
	@echo "🔧 Installing uv..."
	curl -LsSf https://astral.sh/uv/0.6.12/install.sh | sh
	@echo "🔧 Syncing Python and frontend dependencies..."
	cd backend && uv sync && cd .. && cd frontend && npm install

dev:
	make dev-backend & make dev-frontend

dev-backend:
	cd backend && uv run adk api_server . --allow_origins="*"

dev-frontend:
	cd frontend && npm run dev
```

---

## Step 2: Backend Development

Now, let's set up the Python backend that will power our chatbot agent.

1.  **Initialize backend with `uv`:**
    uv init [project_name]
    ```bash
    uv init backend
    ```
    It will create a directory structure for your backend project:
    ```bash
    backend/
    ├── pyproject.toml
    ├── uv.lock
    └── .venv/
    ```

2.  **Add dependencies:**
    We need the Google Agent Development Kit (ADK).
    ```bash
    cd backend && uv add google-adk
    ```

3.  **Create the Agent:**
    Create a directory structure for your agent package:
    ```bash
    cd backend
    mkdir devfest_guide
    cd devfest_guide
    touch __init__.py
    touch agent.py
    ```
    Or auto-create the agent package with adk
    ```bash
    adk create_agent devfest_guide
    ```
    It will create a directory structure for your agent package:
    ```bash
    devfest_guide/
    ├── agent.py
    ├── __init__.py
    └── .env
    ```

    **`devfest_guide/agent.py`**:
    This file defines your AI agent, its model, and instructions.
    ```python
    from google.adk.core.agent import Agent

    ROOT_AGENT_INSTRUCTION = """
    You are a helpful assistant for the DevFest Ogbomoso 2025 event.
    Answer questions about the schedule, speakers, and event details.
    """

    root_agent = Agent(
        model='gemini-2.0-flash-001',
        name='devfest_guide',
        description='A helpful assistant for user questions.',
        instruction=ROOT_AGENT_INSTRUCTION,
    )
    ```

    **`devfest_guide/__init__.py`**:
    Expose the agent so the server can find it.
    ```python
    from . import agent
    ```

5.  **Test the Backend:**
    Run ADK WEB UI to test the agent.
    ```bash
    cd backend
    adk web
    ```

    Or Go back to the root directory and run:
    ```bash
    cd ..
    make playground
    ```
    You should see the ADK WEB UI server starting up on port 8501.

6.  **Running As API Server**
    ```bash
    cd backend
    uv run adk api_server . --allow_origins="*"
    ``` 
---

## Step 3: Frontend Development

Next, we'll build the user interface using React and Vite.

1.  **Create the frontend directory:**
    From the project root:
    ```bash
    npm create vite@latest frontend -- --template react-ts
    cd frontend
    ```

2.  **Install Dependencies:**
    We'll need Tailwind CSS for styling, Lucide for icons, and HeroUI for components.
    ```bash
    npm install
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    npm install lucide-react framer-motion clsx tailwind-merge @heroui/react @heroui/theme
    npm install uuid @types/uuid react-markdown remark-gfm
    ```

3.  **Configure Tailwind CSS:**
    Update `tailwind.config.js` (or `.cjs`) to include HeroUI and your custom colors.

    ```javascript
    const { heroui } = require("@heroui/react");

    /** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          colors: {
            devfest: {
              blue: "#4285F4",
              red: "#EA4335",
              yellow: "#FBBC04",
              green: "#34A853",
              black: "#000000",
            },
          },
        },
      },
      darkMode: "class",
      plugins: [heroui()],
    };
    ```

4.  **Add Styles:**
    Add Tailwind directives to `src/index.css`:
    ```css
    @import "tailwindcss";

    @config "../tailwind.config.cjs";

    /* Custom animations for chatbot */
    @keyframes pulse-glow {

        0%,
        100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3);
        }

        50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.7), 0 0 60px rgba(59, 130, 246, 0.5);
        }
    }

    .animate-pulse-glow {
        animation: pulse-glow 2s ease-in-out infinite;
    }
    ```

5.  **Build Components:**
    Create your components in `src/components/`. You'll need:
    - `ChatbotWidget.tsx`: The main chat interface.
    - `Hero.tsx`: The landing page hero section.
    - `Schedule.tsx`, `Speakers.tsx`, etc.

    (Refer to the project source code for the full implementation of these components.)

6.  **Integrate Backend:**
    In `App.tsx` or your chat component, use `fetch` to communicate with your backend API (e.g., `/api/run_sse` for streaming responses). Ensure you handle session creation and message sending.

---

## Step 4: Running the Full Application

Now that both parts are set up, you can run the entire application using the Makefile we created in Step 1.

1.  **From the root directory:**
    ```bash
    make dev
    ```

2.  **Access the App:**
    Open your browser and go to `http://localhost:5173`. You should see your DevFest landing page with the working chatbot!

---

## Conclusion

Congratulations! You've built a full-stack AI chatbot application. You've learned how to:
- Set up a Python backend with Google ADK.
- Create a modern React frontend with Tailwind and HeroUI.
- Connect the two to create an interactive experience.

Feel free to expand on this by adding more features, such as specific tools for the agent to look up real-time schedule data or speaker bios!
