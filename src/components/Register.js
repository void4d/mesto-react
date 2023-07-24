import '../index.css';
import React from 'react';

function Register() {
  return (
    <form className="login-register">
      <h1 className="login-register__title">Регистрация</h1>
      <input className="login-register__email" placeholder='Email' type='email' required></input>
      <input className="login-register__password" placeholder='Пароль' type='password' required></input>
      <button className='login-register__button'>Зарегистрироваться</button>
      <p className='login-register__text'>Уже зарегистрированы? Войти</p>
    </form>
  );
}

export default Register;
