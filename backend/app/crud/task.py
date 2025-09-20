from sqlalchemy.orm import Session
from app import models, schemas
from typing import List
from app.models import Task


def create_task(db: Session, task_in: schemas.TaskCreate, created_by: int):
    db_task = Task(
        title=task_in.title,
        description=task_in.description,
        status=task_in.status,
        deadline=task_in.deadline,
        created_by=created_by,
        assigned_to=task_in.assigned_to,
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


def get_task(db: Session, task_id: int):
    return db.query(Task).filter(Task.id == task_id).first()


def get_tasks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Task).offset(skip).limit(limit).all()


def update_task(db: Session, db_obj: Task, obj_in: schemas.TaskUpdate):
    # Only update fields that are set in obj_in
    update_data = obj_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        if hasattr(db_obj, field):
            setattr(db_obj, field, value)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def delete_task(db: Session, task_obj:Task):
    db.delete(task_obj)
    db.commit()
    return True
