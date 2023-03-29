from typing import Protocol

from todo.port.models import Todo, Task


class Database(Protocol):
    def create(self, title: str, color: str, task: list[Task] | None) -> Todo:
        ...

    def filtered_by(self, filter_by: str) -> list[Todo]:
        ...

    def all(self) -> list[Todo]:
        ...

    def get(self) -> Todo:
        ...

    def update(self) -> Todo:
        ...

    def delete(self) -> None:
        ...


class ResourceNotFound(Exception):
    pass


class InvalidRequest(Exception):
    pass
