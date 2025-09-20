from fastapi import APIRouter, Depends, HTTPException, Security
from sqlalchemy.orm import Session
from typing import List
from app import schemas, crud, models
from app.db.session import get_db
from app.deps import get_current_user, bearer_scheme
from app.models import Task, User
from app.schemas import TaskResponse, TaskCreate, TaskUpdate
from app.crud import create_task, get_task, get_tasks, update_task, delete_task


router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.post("/", response_model=TaskResponse, dependencies=[Security(bearer_scheme)])
def create_user_task(task_in: TaskCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return create_task(db=db, task_in=task_in, created_by=current_user.id)


@router.get("/", response_model=List[TaskResponse], dependencies=[Security(bearer_scheme)])
def list_tasks( skip: int =0 , limit: int = 100, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return get_tasks(db, skip=skip, limit=limit)


@router.get("/{task_id}", response_model=TaskResponse, dependencies=[Security(bearer_scheme)])
def get_user_task(task_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    task = get_task(db, task_id=task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.put("/{task_id}", response_model=TaskResponse, dependencies=[Security(bearer_scheme)])
def update_user_task(task_id: int, task_in: TaskUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    task = get_task(db, task_id=task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return update_task(db=db, db_obj=task, obj_in=task_in)


@router.delete("/{task_id}", dependencies=[Security(bearer_scheme)])
def delete_usertask(task_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    task = get_task(db, task_id=task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    delete_task(db=db, task_obj=task)
    return {"msg": "Task deleted successfully"}
