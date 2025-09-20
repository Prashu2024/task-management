from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # Import CORSMiddleware
from app.api.user import router as user_router
from app.api.task import router as task_router
from app.api.auth import router as auth_router
from app.db import base, session

app = FastAPI(
    title="Task Manager API",
    description="API for managing tasks and users.",
    version="0.1.0",
    openapi_extra={
        "securitySchemes": {
            "bearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            }
        }
    }
)

# include routers
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(task_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Task Manager API is running"}
