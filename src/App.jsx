import { useState } from 'react';
import './style/app.css';
import './style/Menu.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './route/Home';
import BookList from './route/BooksList';
import NoPage from './route/NoPage';
import TodoApp from './route/ToDoApp';
import Grafico from './route/Grafico';
import Todos from './route/TodosGrid';
    


function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/books">Libros</Link></li>
          <li><Link to="/todoapp">Tareas</Link></li>
          <li><Link to="/grafico">Grafico</Link></li>
          <li><Link to="/todos">CRUD</Link></li>
          <li><Link to="*">Aqui no hay nada</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/todoapp" element={<TodoApp />} />
        <Route path="/grafico" element={<Grafico/>} />
        <Route path="/todos" element={<Todos/>} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
