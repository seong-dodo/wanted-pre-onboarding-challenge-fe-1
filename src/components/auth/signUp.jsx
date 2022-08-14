import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const SERVER_URL = "http://localhost:8080";

const SignUp = () => {
  const navigate = useNavigate();
  const [signFields, setSignFiels] = useState({
    email: "",
    password: "",
  });

  const postSignUp = async ({ email, password }) => {
    try {
      const response = await axios({
        method: "POST",
        url: SERVER_URL + "/users/create",
        data: {
          email: email,
          password: password,
        },
      });

      alert(response.data.message);
      navigate("/login");
    } catch (e) {
      alert(e.response.data.details);
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setSignFiels({
      ...signFields,
      [name]: value,
    });
  };

  const onKeypress = async (e) => {
    if (e.key !== "Enter") return;
    if (signFields.email === "" || signFields.password === "") return;

    onSubmit();
  };

  const onSubmit = async () => {
    const { email, password } = signFields;
    const validateEmail =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    const validatePassword =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const hangulcheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    if (email === "") {
      alert("이메일을 입력해주세요.");
    } else if (password === "") {
      alert("비밀번호를 입력해주세요.");
    } else if (!validateEmail.test(email)) {
      alert("이메일을 형식에 맞춰 입력해주세요.");
    } else if (!validatePassword.test(password)) {
      alert(
        "숫자,영문자,특수문자 조합으로 8자리 이상 사용하여 비밀번호를 입력해주세요."
      );
    } else if (/(\w)\1\1\1/.test(password)) {
      alert("비밀번호 입력시 같은 문자를 4번 이상 사용하실 수 없습니다.");
    } else if (password.search(/\s/) != -1) {
      alert("비밀번호는 공백 없이 입력해주세요.");
    } else if (hangulcheck.test(password)) {
      alert("비밀번호에 한글을 사용 할 수 없습니다.");
    } else {
      await postSignUp({
        email: signFields.email,
        password: signFields.password,
      });
    }
  };

  return (
    <div className="signUp">
      <h2 className="signUp-title">회원 가입</h2>
      <div className="signUp-form">
        <label htmlFor="signUp-email">E-mail</label>
        <input
          type="email"
          id="signUp-email"
          name="email"
          placeholder="이메일을 입력해 주세요"
          value={signFields.email}
          onChange={handleChange}
          onKeyPress={(e) => onKeypress(e)}
          autoComplete="off"
        />
        <label htmlFor="signUp-password">Password</label>
        <input
          type="password"
          id="signUp-password"
          name="password"
          placeholder="비밀번호를 입력해 주세요"
          value={signFields.password}
          onChange={handleChange}
          onKeyPress={(e) => onKeypress(e)}
          autoComplete="off"
        />
        <button
          type="button"
          onClick={onSubmit}
          disabled={signFields.email === "" || signFields.password === ""}
        >
          가입하기
        </button>
      </div>
    </div>
  );
};

export default SignUp;
