# Deployment

## Public site (GitHub Pages)

**URL:** https://pooranhari007-glitch.github.io/YaoMarketplace/

Pushes to `main` trigger `.github/workflows/deploy-pages.yml`.

## Local M1 stack

```bash
bash scripts/start-m1.sh          # fresh Postgres
cd backend && source .venv/bin/activate && uvicorn app.main:app --reload
cd frontend && npm run dev
```

## API staging (M2)

Deploy backend to Render/Railway and set `VITE_API_URL` in GitHub Actions vars.
