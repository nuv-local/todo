import React from "react";
import { useState } from "react";

import './Home.css'
import NewTodoButton from "../../components/NewTodoButton";
import Todo from "../../components/Todo";
import Sidebar from "../../components/Sidebar/Sidebar";
import filters from "../../components/Sidebar/filters";
import sortBys from "../../components/Sidebar/sortBy";

function Home({ todos, setTodos }) {
  const [filter, setFilter] = useState(() => filters.All);
  const [sortBy, setSortBy] = useState(() => () => 0);
  const [currModal, setModal] = useState(null);

  const changeFilter = (selectedFilter) => setFilter(() => selectedFilter);
  const changeSortBy = (selectedSortBy) => setSortBy(() => selectedSortBy);

  return (
    <>
      {currModal}
      <Sidebar
        filters={filters}
        filterChange={changeFilter}
        sortBy={sortBys}
        sortByChange={changeSortBy}
      />
      <NewTodoButton todos={todos} setModal={setModal} setTodos={setTodos} />
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
export default Home