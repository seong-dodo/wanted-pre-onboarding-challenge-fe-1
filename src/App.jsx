import {
  Routes,
  Route,
} from 'react-router-dom';

import React from 'react';

import MainPage from './pages/index';
import LoginPage from './pages/login/index';
import SignUpPage from './pages/signUp/index';
import TodoPage from './pages/todo/index';

const App = () => {

 return (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/todo" element={<TodoPage />} />
    </Routes>
  )
}

export default App;
