import React from "react";

const MainPage = () => {
  return (
    <div className="main">
      <header className="header">
        <h1>
          <a href="/">프리온보딩 챌린지 프로젝트</a>
        </h1>
      </header>
      <ul className="navBar">
        <li className="navBar-item">
          <a href="/todo">할일</a>
        </li>
        <li className="navBar-item">
          <a href="/login">로그인</a>
        </li>
        <li className="navBar-item">
          <a href="/signUp">회원가입</a>
        </li>
      </ul>
    </div>
  );
};

export default MainPage;
