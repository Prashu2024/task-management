# Task Manager API - Backend

This document provides instructions for setting up and running the backend of the Task Manager API.

## Technologies Used

*   **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.
*   **SQLAlchemy**: The Python SQL Toolkit and Object Relational Mapper that gives developers the full power of SQL.
*   **PostgreSQL**: A powerful, open-source object-relational database system.
*   **Pydantic**: Data validation and settings management using Python type hints.
*   **python-jose**: A JOSE (JSON Object Signing and Encryption) implementation in Python for handling JWTs.
*   **Passlib**: A password hashing library for Python.
*   **Uvicorn**: An ASGI web server, used to run FastAPI applications.

## Setup Instructions

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository_url>
    cd task-manger
    ```

2.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

3.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    ```

4.  **Activate the virtual environment:**
    *   **Windows:**
        ```bash
        .\venv\Scripts\activate
        ```
    *   **macOS/Linux:**
        ```bash
        source venv/bin/activate
        ```

5.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

6.  **Database Setup:**
    *   Ensure you have a PostgreSQL database running.
    *   Create a `.env` file in the `backend/` directory (if it doesn't exist) and configure your database connection string. Example:
        ```
        DATABASE_URL="postgresql://user:password@host:port/database_name"
        SECRET_KEY="your_super_secret_key_for_jwt"
        ACCESS_TOKEN_EXPIRE_MINUTES=30
        ```
        Replace `user`, `password`, `host`, `port`, and `database_name` with your PostgreSQL credentials.
        Also, set a strong `SECRET_KEY` for JWT token encryption.

7.  **Initialize the database and create tables:**
    ```bash
    python app/init_db.py
    ```
    This script will create the necessary database tables.

## Running the Application

To start the FastAPI development server:

```bash
uvicorn app.main:app --reload
```

The API will be accessible at `http://127.0.0.1:8000`.

## API Documentation

Once the server is running, you can access the interactive API documentation (Swagger UI) at:

[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

Here you can explore all available endpoints, their request/response schemas, and test them directly.

### Authentication

The API uses Bearer Token authentication.
1.  **Register:** Use the `/auth/register` endpoint to create a new user.
2.  **Login:** Use the `/auth/login` endpoint with your `email` and `password` to obtain an access token.
3.  **Authorize:** In the Swagger UI, click the "Authorize" button (usually a lock icon). Enter your obtained access token in the format `Bearer YOUR_ACCESS_TOKEN` (e.g., `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`) and click "Authorize". This will allow you to access protected endpoints.
