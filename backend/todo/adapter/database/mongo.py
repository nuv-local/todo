from pymongo import MongoClient, ReturnDocument

from todo.port.models import Todo, Task
from todo.port.database import Database

import uuid

from datetime import datetime

from fastapi import HTTPException

from starlette import status


class Mongo(Database):
    def __init__(self) -> None:
        client = MongoClient("mongodb://localhost")
        db = client["local"]
        self.collection = db["todo"]

    def create(self, title: str, color: str, task: list[Task] | None) -> Todo:
        """Create and return a todo with the given data."""
        if task is None:
            task = []

        todo = Todo(
            id=str(uuid.uuid4()),
            created_at=datetime.now(),
            title=title,
            color=color,
            task=task,
        )

        todo_data = todo.dict()
        self.collection.insert_one(todo_data)
        return todo

    def filtered_by(self, filter_by: str) -> list[Todo]:
        """Return list of Todos that comply with the received filter."""
        if filter_by.lower() == "completed":
            todos = list(self.collection.find({"task.completed": True}))
        elif filter_by.lower() == "uncompleted":
            todos = list(self.collection.find({"task.completed": False}))

        if todos:
            return todos

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Todos not found."
        )

    def all(self) -> list[Todo]:
        """Get and return a list of Todos in the system."""
        todos = list(self.collection.find())

        if todos:
            return todos

        raise HTTPException(status_code=status.HTTP_204_NO_CONTENT)

    def get(self, id: str) -> Todo:
        """Get and return a specific Todo with the given ID."""
        todo = self.collection.find_one({"id": id})

        if todo:
            return todo

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found."
        )

    def update(self, id: str, todo: Todo) -> Todo:
        """Update and return a Todo with the given ID using the new data."""
        new_data = todo.dict(exclude_unset=True)

        if self.get(id):
            self.collection.find_one_and_update(
                {"id": id},
                {"$set": new_data},
                return_document=ReturnDocument.AFTER,
            )
            return todo

    def delete(self, id: str) -> None:
        """Delete a single Todo with the given ID."""
        if self.get(id):
            self.collection.delete_one({"id": id})
            HTTPException(status_code=status.HTTP_204_NO_CONTENT)
