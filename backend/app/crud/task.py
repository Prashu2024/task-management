from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session, joinedload
from app import models, schemas
from typing import List
from app.models import Task
from datetime import datetime, timezone




async def create_task(db: AsyncSession, task_in: schemas.TaskCreate, created_by: int):
    deadline_naive = None
    if task_in.deadline:
        # Convert timezone-aware datetime to timezone-naive UTC datetime
        if task_in.deadline.tzinfo is not None:
            deadline_naive = task_in.deadline.astimezone(timezone.utc).replace(tzinfo=None)
        else:
            deadline_naive = task_in.deadline

    db_task = Task(
        title=task_in.title,
        description=task_in.description,
        status=task_in.status,
        deadline=deadline_naive,
        created_by=created_by,
        assigned_to=task_in.assigned_to,
    )
    db.add(db_task)
    await db.commit()
    await db.refresh(db_task)
    return db_task


async def get_task(db: AsyncSession, task_id: int):
    result = await db.execute(select(Task).options(joinedload(Task.assignee)).options(joinedload(Task.creator)).filter(Task.id == task_id))
    return result.scalars().first()


async def get_tasks(db: AsyncSession, skip: int = 0, limit: int = 100, search: str = "", valid_upto: datetime = None, status: str = None) -> List[Task]:
    query = select(Task).options(joinedload(Task.assignee)).options(joinedload(Task.creator))
    filter_conditions = []
    if valid_upto:
        filter_conditions.append(Task.deadline <= valid_upto)
    if status:
        filter_conditions.append(Task.status == status)
    if search:
        filter_conditions.append(Task.title.contains(search))
    if filter_conditions:
        query = query.filter(*filter_conditions)
    
    result = await db.execute(query.offset(skip).limit(limit))
    return result.scalars().all()


async def update_task(db: AsyncSession, db_obj: Task, obj_in: schemas.TaskUpdate):
    update_data = obj_in.dict(exclude_unset=True)
    if "deadline" in update_data and update_data["deadline"] is not None:
        # Convert timezone-aware datetime to timezone-naive UTC datetime
        if update_data["deadline"].tzinfo is not None:
            update_data["deadline"] = update_data["deadline"].astimezone(timezone.utc).replace(tzinfo=None)
        
    for field, value in update_data.items():
        if hasattr(db_obj, field):
            setattr(db_obj, field, value)
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj


async def delete_task(db: AsyncSession, task_obj: Task):
    await db.delete(task_obj)
    await db.commit()
    return True
