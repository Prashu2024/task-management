# from pydantic import BaseSettings
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "taskdb"
    POSTGRES_HOST: str = "localhost"
    POSTGRES_PORT: int = 5432
    SECRET_KEY: str = "change_this_to_a_super_secret"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  
    ALGORITHM: str = "HS256"
    DATABASE_URL: Optional[str] = None

    class Config:
        env_file = ".env"


settings = Settings()

# if not settings.DATABASE_URL:
#     settings.DATABASE_URL = (
#         f"postgresql+psycopg2://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@"
#         f"{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
#     )

if not settings.DATABASE_URL:
    settings.DATABASE_URL = (
        f"postgresql+asyncpg://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@"
        f"{settings.POSTGRES_HOST}:{settings.POSTGRES_PORT}/{settings.POSTGRES_DB}"
    )
