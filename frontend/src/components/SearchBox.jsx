import './SearchBox.css'
import { useCallback, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getTodos } from '../api/api';

function Searchbox() {
  const [showMenu, setShowMenu] = useState('none');
  const [todos, setTodos] = useState([]);
  const [results, setResults] = useState([]);

  const fetchData = useCallback(async () => setTodos(await getTodos()), []);

  useEffect(() => {
    fetchData();
  }, [fetchData, showMenu]);

  const display = useCallback(() => setShowMenu('flex'), []);
  const hide = useCallback(() => setShowMenu('none'), []);

  const search = e => {
    setResults(getResults(e.target.value.toLowerCase().trim(), todos).splice(0));
    if (e.key === 'Enter' && results[0]) {
      Navigate({ to: `/edit?${results[0]._id}` });
    }
  };

  return (
    <div className="search-box">
      <i className="fa-solid fa-magnifying-glass"></i>
      <div className="dropdown">
        <input
          type="text"
          placeholder="Search..."
          onFocus={display}
          onBlur={hide}
          onKeyUp={search}
        />
        <div
          className="dropdown-menu"
          style={{ display: showMenu }}
        >
          {results.map((result) => {
            return (
              <Link
                to={`/edit?${result._id}`}
                key={result._id}
                className='row'
              >
                {result.title}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function getResults(value, todos) {
  const results = [];
  if (value === "") return [];

  for (let { title, _id } of todos) {
    if (title.toLowerCase().indexOf(value) === -1) {
      continue;
    }
    results.push({ title, _id });
  }
  return results;
};

export default Searchbox