import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm'

const Login = () => {
  return (
    <div className='w-full min-h-screen flex items-center'>
      <div className="basis-1/2 flex flex-col justify-center items-center">
        <h1 className='text-white text-3xl font-bold'>Welcome to the Log in page!</h1>
        <span className='text-white'>Please log in!!</span>
        <p className='w-8/12 mt-6 text-rose-700 text-center'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua {' '}
          <Link className='text-white transition-all hover:text-red-400 underline' to='/signup'>Register </Link>.
        </p>
      </div>
      <div className="basis-1/2">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login