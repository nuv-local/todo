import React, { useRef } from "react";

import './edit.css';
import { dbUpdateTodo } from "../../api/api";

export default function Task({
  task, todo, setTodo, setTodos
}){
  const inputRef = useRef(null);
  
  return (
    <div key={task._id} className='todo-task' onClick={() => {
      if(inputRef.current) inputRef.click();
    }}>
      <input 
        ref={inputRef}
        type='checkbox' 
        className="checkbox"  
        defaultChecked={task.completed}
        onClick={e => e.stopPropagation()}
        onChange={() => {
          task.completed = !task.completed;
          dbUpdateTodo(todo, setTodo, setTodos);
        }}
      />
      <p>{task.title}</p>
      <div className='task-options' onClick={ e => {
          e.stopPropagation();
          todo.tasks = todo.tasks.filter(currTask => currTask._id !== task._id);
          dbUpdateTodo(todo, setTodo, setTodos);
        }}>
        <p>...</p>
      </div>
    </div>
  )
}