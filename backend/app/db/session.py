from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings


# Using SQLAlchemy's connection pool by default. For production tune pool_size and max_overflow.
# engine = create_engine(settings.DATABASE_URL, pool_size=10, max_overflow=20)

# async engine (use asyncpg instead of psycopg2)
engine = create_async_engine(
    settings.DATABASE_URL.replace("psycopg2", "asyncpg"),
    pool_size=10,
    max_overflow=20,
    # echo=True,  
)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# sessionmaker for async sessions
AsyncSessionLocal = sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False, autoflush=False, autocommit=False
)


# Dependency
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# Dependency
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
