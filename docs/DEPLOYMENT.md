# Deployment

## Live demo (GitHub Pages)

**Site:** https://pooranhari007-glitch.github.io/YaoMarketplace/

| Page | URL |
|------|-----|
| Home | https://pooranhari007-glitch.github.io/YaoMarketplace/ |
| Stay | https://pooranhari007-glitch.github.io/YaoMarketplace/stay |
| Events | https://pooranhari007-glitch.github.io/YaoMarketplace/events |
| Book | https://pooranhari007-glitch.github.io/YaoMarketplace/book |

## GitHub repository

**Code:** https://github.com/pooranhari007-glitch/YaoMarketplace

Pushes to `main` auto-deploy the public frontend via GitHub Actions.

## API (booking quotes, checkout)

The live site pages work offline. **Booking API** needs a hosted backend:

1. Create a free account at [Render](https://render.com)
2. **New → Blueprint** → connect repo `YaoMarketplace`
3. Deploy `render.yaml` (API service)
4. In GitHub repo **Settings → Secrets and variables → Actions**, add variable:
   - `VITE_API_URL` = `https://YOUR-RENDER-URL.onrender.com/api/v1`
5. Re-run the **Deploy frontend to GitHub Pages** workflow

Until the API is deployed, booking quotes use the fallback URL in the workflow (`yaomarketplace-api.onrender.com`) — deploy Render to activate it.

## Optional: Vercel

```bash
cd frontend
npx vercel login
npx vercel deploy --prod
```

Set `VITE_API_URL` in Vercel project environment variables.

## Local

```bash
cd backend && source .venv/bin/activate && uvicorn app.main:app --reload
cd frontend && npm run dev
```
