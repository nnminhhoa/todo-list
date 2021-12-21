import React, { useRef, useState } from "react";
import "./TodoList.scss";

const TodoList = () => {
  const storageTodos = JSON.parse(localStorage.getItem("todos"));

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(storageTodos ?? []);

  const inputRef = useRef(null);

  const handleAdd = () => {
    if (input === "") {
      inputRef.current.focus();
    } else {
      setTodos((prev) => {
        const newTodos = [...prev, input];
        const jsonJobs = JSON.stringify(newTodos);
        localStorage.setItem("todos", jsonJobs);
        return newTodos;
      });
      inputRef.current.focus();
      setInput("");
    }
  };

  const handleRemove = (index) => {
    setTodos(() => {
      const newTodos = todos.filter((todo,i) => i !== index)
      const jsonJobs = JSON.stringify(newTodos);
      localStorage.setItem("todos", jsonJobs);
      return newTodos;
    });
  };
  return (
    <div className="main">
      <div className="content">
        <div className="content__form">
          <input
            ref={inputRef}
            value={input}
            type="text"
            placeholder="Enter your todos"
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleAdd}>Add</button>
        </div>
        <div className="content__list">
          <ul>
            {todos.map((item, index) => (
              <li key={index}>
                {item}
                <span onClick={() => handleRemove(index)}>&times;</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
