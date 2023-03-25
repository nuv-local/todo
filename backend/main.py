from fastapi import FastAPI, HTTPException

from todo.port.models import Todo
from todo.port.database import ResourceNotFound, InvalidRequest
from todo.adapter.database.mongo import Mongo


app = FastAPI()
db = Mongo()


@app.post("/todo", response_model=Todo)
def post_todo(todo: Todo) -> Todo:
    """Create and return a Todo with the given data."""
    return db.create(title=todo.title, color=todo.color, task=todo.task)


@app.get("/todos")
def get_todos_list(filter_by: str = None) -> list[Todo]:
    """Return a list of Todos in the system by filtering or not."""
    try:
        if filter_by is not None:
            todo_list = db.filtered_by(filter_by)

        elif filter_by is None:
            todo_list = db.all()

        return todo_list

    except ResourceNotFound:
        raise HTTPException(
            status_code=204,
            detail="The request has been completed successfully but the response has no content.",
        )
    except InvalidRequest:
        raise HTTPException(status_code=400, detail="Invalid filter.")


@app.get("/todo/{id}")
def get_todo(id: str) -> Todo:
    """Return a single todo with the given ID."""
    try:
        return db.get(id)
    except ResourceNotFound:
        raise HTTPException(status_code=404, detail="Object not found.")
    except InvalidRequest:
        raise HTTPException(status_code=400, detail="Invalid ID.")


@app.put("/todo/{id}", response_model=Todo)
def update_todo(id: str, new_todo_data: Todo) -> Todo:
    """
    Update and return an updated Todo with the given ID using the new data.
    """
    try:
        todo = db.update(id, new_todo_data)
        return todo

    except ResourceNotFound:
        raise HTTPException(status_code=404, detail="Object not found.")
    except InvalidRequest:
        raise HTTPException(status_code=400, detail="Invalid ID.")


@app.delete("/todo/{id}")
def delete_todo(id: str) -> None:
    """Delete a single Todo with the given ID."""
    try:
        db.delete(id)
    except ResourceNotFound:
        raise HTTPException(status_code=404, detail="Object not found.")
    except InvalidRequest:
        raise HTTPException(status_code=400, detail="Invalid ID.")
