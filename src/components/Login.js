import '../index.css';
import React from 'react';

function Login() {
  return (
    <form className="login-register">
      <h1 className="login-register__title">Вход</h1>
      <input className="login-register__input" placeholder='Email' type='email' required></input>
      <input className="login-register__input" placeholder='Пароль' type='password' required></input>
      <button className='login-register__button'>Войти</button>
    </form>
  );
}

export default Login;
