import debounce from "lodash.debounce";

export async function getTodos() {
  return await fetch('/todos').then(res => res.json())
}

export async function getTodo(id) {
  return await fetch(`/todos/${id}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw new Error(`${response.status} - ${response.statusText}`);
    })
}

export function createTodo(title, setTodos) {
  fetch('/todos/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title })
  })
    .then(res => res.json())
    .then(res => setTodos(res))
}

export function updateTodo(todo, setTodo, setTodos) {
  fetch(`/todos/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ todo })
  })
    .then(res => res.json())
    .then(res => setTodo(res))
    .finally(() => this.getTodos().then(todos => setTodos(todos)));
}

export const dbUpdateTodo = debounce(updateTodo, 800);

export function deleteTodo(id, setTodos, navigate) {
  fetch(`/todos/delete/${id}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(res => setTodos(res))
    .finally(() => { if (navigate) navigate('/') });
}

export function newTask(id, todo, setTodo) {

  const input = document.querySelector('.new-task-input');
  const task = { _id: '1', title: input.value, completed: false };
  input.value = '';
  todo.tasks.push(task);
  setTodo({ ...todo })
  fetch(`/todos/create-task/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ task })
  })
    .then(res => res.json())
    .then(res => setTodo(res))
}
