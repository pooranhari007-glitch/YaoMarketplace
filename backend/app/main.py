from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth, content, media, settings as settings_api
from app.config import settings
from app.core.database import Base, engine
from app.seed import seed


@asynccontextmanager
async def lifespan(_app: FastAPI):
    Base.metadata.create_all(bind=engine)
    seed()
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
app.include_router(settings_api.router, prefix=prefix)
app.include_router(content.router, prefix=prefix)
app.include_router(media.router, prefix=prefix)


@app.get("/health")
def health():
    return {"status": "ok"}
