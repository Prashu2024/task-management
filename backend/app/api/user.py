from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, HTTPException, Security
from sqlalchemy.orm import Session
from typing import List
from app import schemas, crud, models
from app.db.session import get_db
from app.deps import get_current_user, bearer_scheme
from app.schemas import UserResponse, UserCreate
from app.crud import get_user, get_users
from app.models import User


router = APIRouter(prefix="/user", tags=["users"])


@router.get("/", response_model=List[UserResponse], dependencies=[Security(bearer_scheme)])
async def list_users(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    return await get_users(db)


@router.get("/{user_id}", response_model=UserResponse, dependencies=[Security(bearer_scheme)])
async def get_task_user(user_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    user = await get_user(db, user_id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
