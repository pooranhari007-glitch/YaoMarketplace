from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    app_name: str = "Direct Booking Platform"
    debug: bool = True
    api_prefix: str = "/api/v1"

    # SQLite works without Docker; use Postgres in production or via docker compose
    database_url: str = "sqlite:///./booking_platform.db"

    secret_key: str = "change-me-in-production"
    access_token_expire_minutes: int = 60 * 24

    cors_origins: str = "http://localhost:5173,http://localhost:5174"

    stripe_secret_key: str = ""
    stripe_webhook_secret: str = ""
    stripe_publishable_key: str = ""

    openai_api_key: str = ""

    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    email_from: str = "noreply@example.com"

    upload_dir: str = "uploads"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
