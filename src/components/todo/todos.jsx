import React from "react";

import { useState } from "react";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    id: 0,
    value: "",
    status: "TODO",
    isChecked: false,
  });

  const onKeyPress = (e) => {
    console.log("keypress", e.code);
    if (e.code !== "Enter") return;

    onSubmit();
  };

  const handleChange = (e) => {
    setTodo({
      ...todo,
      value: e.target.value,
    });
  };

  const onSubmit = () => {
    setTodos([...todos, todo]);

    setTodo({
      ...todo,
      id: todo.id + 1,
      value: "",
    });
  };

  return (
    <div className="todo">
      <h3 className="todo-title">to do 목록</h3>
      <div className="todo-form">
        <label htmlFor="todo-input">To do</label>
        <input
          type="todo"
          id="todo-input"
          name="todo"
          placeholder="할 일을 입력해 주세요"
          value={todo.value}
          onChange={handleChange}
          onKeyPress={(e) => onKeyPress(e)}
        />
        <button type="submit" name="todo" onClick={onSubmit}>
          추가
        </button>
      </div>
      {todos.map(({ id, value }) => (
        <div key={id}>{value}</div>
      ))}
    </div>
  );
};

export default Todos;
