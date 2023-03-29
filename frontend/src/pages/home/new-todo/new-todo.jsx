import { useState } from 'react';
import { createTodo } from '../../../api/api.js';
import Modal from '../../../modal/ModalTemplate.jsx';
import './new-todo.css'

function NewTodoButton({ modal, todos, setTodos }) {
  const [title, setTitle] = useState('');

  const success = async () => {
    modal(null);;
    todos.push({ _id: false, title, tasks: [] });
    createTodo(title, setTodos);
  };

  const showModal = () => {
    modal(<Modal
      key='new-todo-modal'
      close={() => modal(null)}
      title='New TODO'
      onSuccess={success}
      successMessage='Create TODO'
      Content={
        <input
          autoFocus
          placeholder="TODO's name..."
          type='text'
          className='modal-input'
          onChange={(e) => setTitle(e.target.value)} />
      }

    />);
  }

  return (
    <div key='new-todo-button' className='new-todo' onClick={() => showModal()}>
      <p>+</p>
    </div>
  )
}

export default NewTodoButton