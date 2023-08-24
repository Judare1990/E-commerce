import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import defaultValues from '../utils/defaultValues';
import './styles/loginPage.css'; // Asegúrate de importar tus estilos CSS

const LoginPage = () => {
  const [token, setToken] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar si el modal está abierto

  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url =
      'https://e-commerce-api-v2.academlo.tech/api/v1/users/login';
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem(
          'name',
          `${res.data.user.firstName} ${res.data.user.lastName}`
        );
      })
      .catch((err) => {
        console.log(err);
        localStorage.clear();
      });
    reset(defaultValues);
  };

  const handleClick = () => {
    localStorage.clear();
    setToken();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='login-container'>
      <form className='log' onSubmit={handleSubmit(submit)}>
        <h2 className='login'>Welcome, Please enter you email and password</h2>
        <div className='credentials'>
          <label  htmlFor='email'>Email: </label>
          <input className='email' {...register('email')} type='email' id='email' />
        </div>
        <div>
          <label className='credentials' htmlFor='password'>Password: </label>
          <input {...register('password')} type='password' id='password' />
        </div>
        <button className="login login_button">Login</button>
      </form>
      <Link className='signup_container' to='/user/register'>
        <button>Don't have an account? <span className='signup'>sign up</span></button>
      </Link>
    </div>
  );
};

export default LoginPage;
