import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { saveItem, clearItem, isLogin } from "../../storage/storage";
const SERVER_URL = "http://localhost:8080";

const Login = () => {
  const navigator = useNavigate();
  const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });

  const postLogin = async (loginFields) => {
    try {
      const response = await axios.post(
        SERVER_URL + "/users/login",
        loginFields
      );
      const { message, token } = response.data;
      alert(message);
      saveItem("accessToken", token);
      navigator("/");
    } catch (e) {
      alert(e.response.data.details);
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setLoginFields({
      ...loginFields,
      [name]: value,
    });
  };

  const onKeypress = async (e) => {
    if (e.key !== "Enter") return;
    if (loginFields.email === "" || loginFields.password === "") return;

    onLogin();
  };

  const onLogin = async () => {
    const { email, password } = loginFields;

    if (email === "") {
      alert("이메일을 입력해주세요.");
    } else if (password === "") {
      alert("비밀번호를 입력해주세요.");
    } else {
      await postLogin({
        email: loginFields.email,
        password: loginFields.password,
      });
    }
  };

  const onLogout = () => {
    clearItem();
    setLoginFields({
      email: "",
      password: "",
    });
  };

  return (
    <>
      {isLogin() ? (
        <div className="logout">
          <h2 className="logout-title">로그아웃</h2>
          <button type="button" onClick={onLogout}>
            Log out
          </button>
        </div>
      ) : (
        <div className="login">
          <h2 className="login-title">로그인 Page</h2>
          <div className="login-form">
            <label htmlFor="login-email">E-mail</label>
            <input
              type="email"
              id="login-email"
              name="email"
              placeholder="이메일을 입력해 주세요"
              value={loginFields.email}
              onChange={handleChange}
              onKeyPress={(e) => onKeypress(e)}
              autoComplete="off"
            />
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              name="password"
              placeholder="비밀번호를 입력해 주세요"
              value={loginFields.password}
              onChange={handleChange}
              onKeyPress={(e) => onKeypress(e)}
              autoComplete="off"
            />
            <button type="button" onClick={onLogin}>
              Log in
            </button>
          </div>
          <div>
            <button>
              <a href="/signUp">회원가입</a>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
