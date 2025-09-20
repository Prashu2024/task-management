from typing import Optional
from datetime import datetime
from pydantic import BaseModel
from enum import Enum
from app.schemas.user import UserResponse


class TaskStatus(str, Enum):
    todo = "todo"
    in_progress = "in_progress"
    done = "done"


class TaskBase(BaseModel):
    title: str
    description: str 
    status: Optional[TaskStatus] = TaskStatus.todo
    deadline: Optional[datetime] = None
    assigned_to: Optional[int] = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    deadline: Optional[datetime] = None
    assigned_to: Optional[int] = None


class TaskResponse(TaskBase):
    id: int
    created_by: int
    created_at: datetime
    updated_at: datetime
    assigned_to: Optional[int] = None
    # assignee: Optional[UserResponse] = None
    # creator: Optional[UserResponse] = None

    class Config:
        from_attributes = True
