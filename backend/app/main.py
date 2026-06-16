from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.routes import auth, bookings, calendar, chat, content, inquiries, insurance, webhooks
from app.config import settings
from app.core.database import Base, engine
from app.seed import seed_database

Path(settings.upload_dir).mkdir(parents=True, exist_ok=True)


@asynccontextmanager
async def lifespan(_app: FastAPI):
    Base.metadata.create_all(bind=engine)
    seed_database()
    yield


app = FastAPI(title=settings.app_name, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

prefix = settings.api_prefix

app.include_router(auth.router, prefix=prefix)
app.include_router(content.router, prefix=prefix)
app.include_router(bookings.router, prefix=prefix)
app.include_router(inquiries.router, prefix=prefix)
app.include_router(insurance.router, prefix=prefix)
app.include_router(calendar.router, prefix=prefix)
app.include_router(chat.router, prefix=prefix)
app.include_router(webhooks.router, prefix=prefix)

app.mount("/uploads", StaticFiles(directory=settings.upload_dir), name="uploads")


@app.get("/health")
def health():
    return {"status": "ok", "app": settings.app_name}
