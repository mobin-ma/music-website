import React from 'react'
import RegisterForm from '../components/forms/RegisterForm'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='w-full min-h-screen flex items-center'>
      <div className="basis-1/2 flex flex-col justify-center items-center">
        <h1 className='text-white text-3xl font-bold'>Welcome to the registration page!</h1>
        <span className='text-white'>hurry up! Create an account now!!</span>
        <p className='w-8/12 mt-6 text-rose-700 text-center'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua {' '}
          <Link className='text-white transition-all hover:text-red-400 underline' to='/login'>Log in </Link>.
        </p>
      </div>
      <div className="basis-1/2">
        <RegisterForm />
      </div>
    </div>
  )
}

export default Register