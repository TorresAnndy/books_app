import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

// 👉 Cambia esta URL si tu MockAPI es diferente
const API_URL = "https://68476f3fec44b9f3493d1308.mockapi.io/todos";

const ApiContext = React.createContext();
const useApiContext = () => useContext(ApiContext);

const CreateTodo = () => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [due, setDue] = useState("");
  const { addTodo } = useApiContext();

  const handleAddTodo = () => {
    if (!text.trim() || !author.trim()) {
      alert("Por favor ingresa texto y autor");
      return;
    }

    addTodo({ text, author, due, completed: false });
    setText("");
    setAuthor("");
    setDue("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddTodo();
      }}
      style={{ border: "1px solid #ccc", padding: "1em", marginBottom: "1em" }}
    >
      <h2>Crear Todo</h2>
      <div>
        <label>Texto</label>
        <br />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ingrese texto del todo"
          required
          rows={4}
          style={{ width: "100%", resize: "vertical" }}
        />
      </div>
      <div>
        <label>Autor</label>
        <br />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Ingrese autor"
          required
        />
      </div>
      <div>
        <label>Fecha límite</label>
        <br />
        <input
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />
      </div>
      <button type="submit" style={{ marginTop: "1em" }}>
        Agregar Todo
      </button>
      <p>
        <small>Zona UTC Central</small>
      </p>
    </form>
  );
};

const UpdateTodo = ({ todo }) => {
  const { updateTodo } = useApiContext();
  return (
    <label>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => updateTodo(todo.id)}
      />
      {todo.completed ? " Completado" : " Pendiente"}
    </label>
  );
};

const DeleteTodo = ({ todo }) => {
  const { deleteTodo } = useApiContext();
  return (
    <button
      onClick={() => deleteTodo(todo.id)}
      style={{
        color: "white",
        backgroundColor: "red",
        border: "none",
        padding: "0.5em 1em",
        cursor: "pointer",
        marginTop: "0.5em",
      }}
    >
      Eliminar
    </button>
  );
};

const ReadTodos = () => {
  const { todos } = useApiContext();
  return (
    <div>
      {todos.map((todo) => (
        <div
          key={todo.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "1em",
            padding: "1em",
          }}
        >
          <h3>{todo.text}</h3>
          <p>
            <strong>Autor:</strong> {todo.author}
          </p>
          <p>
            <strong>Fecha límite:</strong> {todo.due || "No definida"}
          </p>
          <UpdateTodo todo={todo} />
          <DeleteTodo todo={todo} />
        </div>
      ))}
    </div>
  );
};

const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
    } catch (error) {
      console.error("Error al obtener todos:", error);
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const response = await axios.post(API_URL, newTodo);
      setTodos((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error al agregar todo:", error);
    }
  };

  const updateTodo = async (id) => {
    try {
      const todoToUpdate = todos.find((t) => t.id === id);
      if (!todoToUpdate) return;
      const updatedTodo = {
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
      };
      await axios.put(`${API_URL}/${id}`, updatedTodo);
      setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
    } catch (error) {
      console.error("Error al actualizar todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error al eliminar todo:", error);
    }
  };

  return (
    <ApiContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
      <div
        style={{
          maxWidth: "600px",
          margin: "2em auto",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1>Lista de Todos</h1>
        <CreateTodo />
        <hr />
        <ReadTodos />
      </div>
    </ApiContext.Provider>
  );
};

export default Todos;
