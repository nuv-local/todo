import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useCookie } from './useHooks';
import { getTodos } from './api/api';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import Edit from './pages/Edit/Edit';
import Login from './pages/Login/Login';

function App() {
  const { token, name, loading } = useCookie();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (token) getTodos().then((todos) => setTodos(todos));
  }, [token]);
  
  // if (loading) return;
  // if (!token) return <Login />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout name={name}/>}>
          <Route index element={<Home todos={todos} setTodos={setTodos}/>}/>
          <Route path='/edit' element={<Edit todos={todos} setTodos={setTodos} />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
