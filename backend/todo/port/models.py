"""
Todo and Task models.
"""

from pydantic import BaseModel

from datetime import datetime

import uuid


class Task(BaseModel):
    """Task object."""

    id: str = uuid.uuid4()
    title: str
    completed: bool = False


class Todo(BaseModel):
    """Todo object."""

    id: str = uuid.uuid4()
    created_at: datetime = datetime.now()
    title: str
    color: str
    task: list[Task]
