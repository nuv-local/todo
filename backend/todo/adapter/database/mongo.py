from pymongo import MongoClient, ReturnDocument

from todo.port.models import Todo, Task
from todo.port.database import Database, ResourceNotFound, InvalidRequest

import uuid

from datetime import datetime


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
        todo_list = []

        if filter_by.lower() == "completed":
            todo_list = list(self.collection.find({"task.completed": True}))

        elif filter_by.lower() == "uncompleted":
            todo_list = list(self.collection.find({"task.completed": False}))

        elif filter_by not in ("completed", "uncompleted", ""):
            raise InvalidRequest("No such filter exists.")

        if todo_list != []:
            return todo_list

        raise ResourceNotFound("Empty list obtained.")

    def all(self) -> list[Todo]:
        """Get and return a list of Todos in the system."""
        todos = []
        todos = list(self.collection.find())

        if todos != []:
            return todos

        raise ResourceNotFound("Empty list obtained.")

    def get(self, id: str) -> Todo:
        """Get and return a specific Todo with the given ID."""
        if len(id) != 36:
            raise InvalidRequest("Invalid ID.")

        todo = self.collection.find_one({"id": id})

        if todo is None:
            raise ResourceNotFound("Object not found.")

        return todo

    def update(self, id: str, todo_data: Todo) -> Todo:
        """Update and return a Todo with the given ID using the new data."""
        todo = self.get(id)
        new_data = todo_data.dict(exclude_unset=True)

        self.collection.find_one_and_update(
            {"id": id},
            {"$set": new_data},
            return_document=ReturnDocument.AFTER,
        )
        return todo

    def delete(self, id: str) -> None:
        """Delete a single Todo with the given ID."""
        self.get(id)
        self.collection.delete_one({"id": id})
