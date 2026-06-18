#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/.."
docker compose down -v 2>/dev/null || true
docker compose up -d db
echo "Waiting for Postgres..."
until docker compose exec -T db pg_isready -U postgres -d direct_booking >/dev/null 2>&1; do sleep 1; done
echo "✓ Postgres ready on localhost:5434 (database: direct_booking)"
