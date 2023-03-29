import React from "react";
import { useState } from "react";

import Sidebar from "../../sidebar/sidebar";
import filters from "../../sidebar/filters";
import sortBys from "../../sidebar/sortBy";
import NewTodoButton from "./new-todo/New-todo";
import Todo from "./todo-template";

import './home.css'

export default function Home({todos, setTodos}) {
  const [filter, setFilter] = useState(() => filters.All);
  const [sortBy, setSortBy] = useState(() => () => 0);
  const [currModal, setModal] = useState(null);

  const changeFilter = (selectedFilter) => setFilter(() => selectedFilter);
  const changeSortBy = (selectedSortBy) => setSortBy(() => selectedSortBy);

  return (
    <>
      <label key='modal'>
        {currModal}
      </label>
      <Sidebar 
        filters={filters} 
        filterChange={changeFilter}
        sortBy={sortBys}
        sortByChange={changeSortBy}
      />
      <NewTodoButton todos={todos} modal={setModal} setTodos={setTodos}/>
      <div key="todos" className='container'>
        <header>
          <h1>My TODOs</h1>
        </header>
        <div id="grid">
          {todos?.filter(filter).sort(sortBy).map((todo) => (
            <Todo 
              todo={todo}
              todos={todos}
              setTodos={setTodos}
              modal={setModal}
              key={todo._id}
            />
          ))}
        </div>
      </div>
    </>
  );
};