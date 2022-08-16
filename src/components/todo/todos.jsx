import React from "react";

import { useState } from "react";

import axios from "axios";
import { saveItem, loadItem, clearItem, isLogin } from "../../storage/storage";
import { useEffect } from "react";
const SERVER_URL = "http://localhost:8080";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    id: 0,
    title: "",
    content: "",
    createdAt: "",
    updatedAt: "",
  });
  const [mode, setMode] = useState("CREATE");

  useEffect(() => {
    getTodos();
  }, [todo]);

  const addTodo = async ({ title, content }) => {
    try {
      const response = await axios({
        method: "POST",
        url: SERVER_URL + "/todos",
        headers: {
          Authorization: loadItem("accessToken"),
        },
        data: {
          title: title,
          content: content,
        },
      });
      alert("할일이 추가되었습니다.");
    } catch (e) {
      console.log(e);
      alert(e.response.data.details);
      console.error(e);
    }
  };

  const getTodos = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: SERVER_URL + "/todos",
        headers: {
          Authorization: loadItem("accessToken"),
        },
      });
      const { data } = response.data;
      // 순서 정렬해주기 생성 날짜 최신순으로
      setTodos(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (e) {
      console.log(e);
      alert(e.response.data.details);
      console.error(e);
    }
  };

  const deleteTodo = async (id) => {
    try {
      if (confirm("삭제하시겠습니까?")) {
        const response = await axios({
          method: "DELETE",
          url: SERVER_URL + `/todos/${id}`,
          headers: {
            Authorization: loadItem("accessToken"),
          },
        });
        alert("삭제되었습니다.");
        setTodos(todos.filter((i) => i.id !== id));
      }
    } catch (e) {
      console.log(e);
      alert(e.response.data.details);
      console.error(e);
    }
  };

  const activeModify = async (id) => {
    try {
      const response = await axios({
        method: "GET",
        url: SERVER_URL + `/todos/${id}`,
        headers: {
          Authorization: loadItem("accessToken"),
        },
      });
      const { data } = response.data;
      setMode("MODIFY");
      setTodo({ ...data });
    } catch (e) {
      console.log(e);
      alert(e.response.data.details);
      console.error(e);
    }
  };

  const updateTodo = async (id) => {
    try {
      const response = await axios({
        method: "PUT",
        url: SERVER_URL + `/todos/${id}`,
        headers: {
          Authorization: loadItem("accessToken"),
        },
        data: {
          title: todo.title,
          content: todo.content,
        },
      });
      alert("수정이 완료되었습니다.");
      setMode("CREATE");
      getTodos();
      setTodo({
        ...todo,
        title: "",
        content: "",
      });
    } catch (e) {
      console.log(e);
      alert(e.response.data.details);
      console.error(e);
    }
  };

  const onKeyPress = (e) => {
    if (e.code !== "Enter") return;
    if (todo.title === "" || todo.content === "") return;

    if (mode === "MODIFY") {
      updateTodo();
    } else {
      onSubmit();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    await addTodo({
      title: todo.title,
      content: todo.content,
    });

    setTodo({
      id: 0,
      title: "",
      content: "",
      createdAt: "",
      updatedAt: "",
    });
  };

  return (
    <div className="todo">
      <h3 className="todo-title">to do 목록</h3>
      <div className="todo-form">
        <label htmlFor="todo-title-input">제목</label>
        <input
          type="title"
          id="todo-title-input"
          name="title"
          placeholder="제목을 입력해 주세요"
          value={todo.title}
          onChange={handleChange}
          onKeyPress={(e) => onKeyPress(e)}
          autoComplete="off"
        />
        <label htmlFor="todo-content-input">세부 내용</label>
        <input
          type="content"
          id="todo-content-input"
          name="content"
          placeholder="할 일을 입력해 주세요"
          value={todo.content}
          onChange={handleChange}
          onKeyPress={(e) => onKeyPress(e)}
          autoComplete="off"
        />
        <>
          {mode === "MODIFY" && (
            <button
              type="submit"
              name="todo"
              onClick={() => updateTodo(todo.id)}
            >
              변경
            </button>
          )}
          {mode === "CREATE" && (
            <button type="submit" name="todo" onClick={onSubmit}>
              추가
            </button>
          )}
        </>
      </div>
      {mode === "MODIFY" && (
        <div>
          <div>수정할 내용 상세보기</div>
          <div>
            <div>{todo.title}</div>
            <div>{todo.content}</div>
            <div>
              등록일 <span>{todo.createdAt}</span>
            </div>
            <div>
              수정일 <span>{todo.updatedAt}</span>
            </div>
          </div>
        </div>
      )}
      {todos.map(({ id, title, content, createdAt, updatedAt }) => (
        <div key={id}>
          <button onClick={() => activeModify(id)}>수정</button>
          <button onClick={() => deleteTodo(id)}>삭제</button>
          <div>{title}</div>
          <div>{content}</div>
          <div>
            등록일 <span>{createdAt}</span>
          </div>
          <div>
            수정일 <span>{updatedAt}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todos;
