#!/usr/bin/env bash
set -e

API="${API_URL:-http://127.0.0.1:8000}"
FE="${FE_URL:-http://127.0.0.1:5173}"
ADMIN="${ADMIN_URL:-http://127.0.0.1:5174}"

fail=0
check() {
  local name="$1" url="$2" expect="${3:-200}"
  code=$(curl -s -o /dev/null -w "%{http_code}" "$url" || echo "000")
  if [ "$code" = "$expect" ]; then
    echo "OK   $name ($code)"
  else
    echo "FAIL $name (got $code, want $expect)"
    fail=1
  fi
}

echo "=== Direct Booking Platform health check ==="
check "API /health" "$API/health"
check "API content" "$API/api/v1/content/home"
check "Public site" "$FE/"
check "Admin site" "$ADMIN/"

token=$(curl -s -X POST "$API/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}' | \
  python3 -c "import sys,json; print(json.load(sys.stdin).get('access_token',''))" 2>/dev/null || true)

if [ -n "$token" ]; then
  code=$(curl -s -o /dev/null -w "%{http_code}" "$API/api/v1/bookings" -H "Authorization: Bearer $token")
  [ "$code" = "200" ] && echo "OK   Admin auth + bookings ($code)" || { echo "FAIL Admin bookings ($code)"; fail=1; }
else
  echo "FAIL Admin login"
  fail=1
fi

if [ -f backend/booking_platform.db ]; then
  echo "OK   SQLite DB exists"
else
  echo "WARN SQLite DB not found (using Postgres or not seeded yet)"
fi

if [ "$fail" -eq 0 ]; then
  echo "=== All checks passed ==="
else
  echo "=== Some checks failed ==="
  exit 1
fi
