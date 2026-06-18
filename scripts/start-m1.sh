#!/usr/bin/env bash
# Start Milestone 1 stack: PostgreSQL + API
set -e
cd "$(dirname "$0")/.."

echo "→ Starting PostgreSQL..."
docker compose up -d db

echo "→ Waiting for database..."
until docker compose exec -T db pg_isready -U postgres -d booking_platform >/dev/null 2>&1; do
  sleep 1
done
echo "✓ PostgreSQL ready on localhost:5434"

echo ""
echo "Start API:  cd backend && source .venv/bin/activate && uvicorn app.main:app --reload"
echo "Start site: cd frontend && npm run dev"
echo ""
echo "API docs:   http://localhost:8000/docs"
echo "Public site: http://localhost:5173"
