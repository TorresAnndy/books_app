import React, { useReducer, useContext, useRef, useEffect } from "react";
import "../style/ToDoApp.css"; 

const initialTodos = [
  {
    id: 1,
    text: "learn how to communicate",
    completed: true,
    author: "Faby",
    due: "2022-05-01"
  },
  {
    id: 2,
    text: "road out of hell",
    completed: false,
    author: "Alex",
    due: "2022-06-01"
  }
];

const DispatchContext = React.createContext(null);

function appReducer(state, action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          id: Date.now(),
          text: "",
          author: "",
          due: "",
          completed: false,
        },
      ];

    case "delete":
      return state.filter((item) => item.id !== action.payload);

    case "completed":
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, completed: !item.completed }
          : item
      );

    case "update": {
      const { id, field, value } = action.payload;
      return state.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      );
    }

    case "reset":
      return initialTodos;

    default:
      return state;
  }
}

export default function TodoApp() {
  const [state, dispatch] = useReducer(appReducer, initialTodos);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <div className="todo-app-container">
        <h3>Todo List: add, delete, complete and update</h3>
        <div className="todo-buttons">
          <button onClick={() => dispatch({ type: "add" })}>Create Todo</button>
          <button onClick={() => dispatch({ type: "reset" })}>Reset Todos</button>
        </div>
        <TodosList items={stateRef.current} />
      </div>
    </DispatchContext.Provider>
  );
}

function TodosList({ items }) {
  return (
    <div className="todos-list">
      {items.map((item) => (
        <TodoItem key={item.id} {...item} />
      ))}
    </div>
  );
}

function TodoItem({ id, completed, author, text, due }) {
  const dispatch = useContext(DispatchContext);

  const handleUpdate = (field, value) => {
    dispatch({
      type: "update",
      payload: { id, field, value },
    });
  };

  return (
    <div className={`todo-item ${completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch({ type: "completed", payload: id })}
      />
      <input
        type="text"
        value={text}
        placeholder="Todo text"
        onChange={(e) => handleUpdate("text", e.target.value)}
      />
      <input
        type="text"
        value={author}
        placeholder="Author"
        onChange={(e) => handleUpdate("author", e.target.value)}
      />
      <input
        type="date"
        value={due}
        onChange={(e) => handleUpdate("due", e.target.value)}
      />
      <button onClick={() => dispatch({ type: "delete", payload: id })}>
        Delete
      </button>
    </div>
  );
}
