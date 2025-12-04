install:
	@command -v uv >/dev/null 2>&1 || { \
		echo "🚀 Installing uv..."; \
		curl -LsSf https://astral.sh/uv/0.6.12/install.sh | sh; \
		source $$HOME/.local/bin/env; \
	}
	@echo "🔧 Syncing Python and frontend dependencies..."
	cd backend && uv sync && cd .. && cd frontend && npm install

dev:
	make dev-backend & make dev-frontend

dev-backend:
	cd backend && uv run adk api_server . --allow_origins="*"

dev-frontend:
	cd frontend && npm run dev

playground:
	cd backend && uv run adk web --port 8501