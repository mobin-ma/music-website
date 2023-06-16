import React, { useState } from 'react';
import Error from '../Error';
import Loader from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loginUser } from '../../redux/features/authSlice';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.auth.isLoading);
    const error = useSelector((state) => state.auth.error);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }))
    }

    if (isAuthenticated) return <Navigate to='/' />

    return (
        <form className='w-3/4 px-5 py-10 border border-rose-600 rounded-lg flex flex-col items-center justify-center gap-10' onSubmit={handleSubmit}>
            {error ? <Error errorText={error} /> : null}
            <div className='w-full flex flex-col gap-2 items-start justify-center relative'>
                <label className='text-white ml-5 md:text-lg text-xs'>Email :</label>
                <input
                    className='w-full py-3 bg-transparent border border-red-600 rounded-full text-gray-400 transition-all focus:border-red-400 focus:ring-0'
                    type="text"
                    placeholder='Enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>

            <div className='w-full flex flex-col gap-2 items-start justify-center relative'>
                <label className='text-white ml-5 md:text-lg text-xs'>Password :</label>
                <input
                    className='w-full py-3 bg-transparent border border-red-600 rounded-full text-gray-400 transition-all focus:border-red-400 focus:ring-0'
                    type="password"
                    placeholder='Enter your password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>
            {
                isLoading ? <Loader /> :
                    <button className='bg-rose-600 px-4 py-2 rounded-full text-white text-sm font-bold duration-300 hover:bg-rose-700' disabled={isLoading}>Login</button>
            }
        </form>
    )
}

export default LoginForm