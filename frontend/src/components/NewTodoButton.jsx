import { useState } from 'react';
import { createTodo } from '../api/api.js';
import Modal from './ModalTemplate.jsx';
import './NewTodoButton.css'

function NewTodoButton({ setModal, todos, setTodos }) {
  const [title, setTitle] = useState('');

  const success = async () => {
    setModal(null);
    todos.push({ _id: 0, title, tasks: [] });
    createTodo(title, setTodos);
  };

  const showModal = () => {
    setModal(<Modal
      key='new-todo-modal'
      close={() => setModal(null)}
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