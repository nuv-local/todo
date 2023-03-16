import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Modal from "../../modal/ModalTemplate.jsx";
import Task from "./task.jsx";
import './edit.css';
import { deleteTodo, getTodo, getTodos, newTask } from "../../api/api.js";

export default function Edit({ todos, setTodos }) {
  const id = window.location.search.slice(1);
  const [todo, setTodo] = useState(todos.length ? todos.find(todo => todo._id === id) : false);
  const [showTaskMenu, setShowTaskMenu] = useState(false);
  const [currModal, setModal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getTodo(id).then(todo => setTodo(todo));
    getTodos().then(todos => setTodos(todos));
  }, [id, setTodos]);

  const toggleTaskMenu = useCallback((e) => {
    if (showTaskMenu) return
    setShowTaskMenu(!showTaskMenu);
    const interval = setInterval(() => {
      window.scrollTo({ top: (document.body.scrollHeight)})
    }, 1);
    setTimeout(() => {
      clearInterval(interval);
      e.target.querySelector('input').focus();
    }, 300);
  }, [showTaskMenu]);

  const createTask = useCallback(() => {
    newTask(id, todo, setTodo);
    getTodos().then(todos => setTodos(todos));
  }, [id, todo, setTodos]);
  
  const success = async () => {
    setModal(null);
    deleteTodo(id, setTodos, navigate);
  };
  
  const showModal = () => {
    setModal(<Modal 
      key='new-todo-modal'
      close={() => setModal(null)} 
      title={`Delete TODO: ${todo.title}`}
      onSuccess={success}
      successMessage='Confirm'
      Content={<h1 className='modal-text'>Are you sure?</h1>}
    />)
  };

  if(!todo) navigate('/');
  return (
    <>
      <label key='modal'>
        {currModal}
      </label>
      <Link to='/' draggable='false'>
        <div id="go-back"><i className="fa-solid fa-arrow-left"></i></div>
      </Link>
      <div id="todo-edit">
        <p className='delete-todo' onClick={showModal}>x</p>
        <h1>{todo?.title}</h1>
        {todo.tasks?.map((task) => (
          <Task 
            key={task._id}
            task={task}
            todo={todo}
            setTodo={setTodo}
            setTodos={setTodos}
          />
        ))}
        <div 
          className={`new-task ${showTaskMenu ? 'menu' : ''}`} 
          onClick={toggleTaskMenu}
        >
          <button 
          className="new-task-submit" 
          onClick={createTask}>+</button>
          <p>Add task</p>
          <input 
            placeholder="title..." 
            className="new-task-input"
            onKeyUp={e => {if(e.key === 'Enter') createTask()}}
          />
          <button className="new-task-confirm" onClick={createTask}>Create Task</button>
          <button className="new-task-cancel" onClick={toggleTaskMenu}>Cancel</button>
        </div>
      </div>
    </>
  )
}