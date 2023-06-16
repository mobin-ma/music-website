import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import bgWebSite from '../assets/bg-website.jpg'

const Welcome = () => {
    return (
        <>
            <Navbar />
            <div className='w-full min-h-screen flex flex-col justify-center items-center'>
                <div className='w-1/2 flex flex-col gap-4 items-center justify-center'>
                    <h1 className='text-white sm:text-9xl lg:text-5xl font-bold'>Welcome!</h1>
                    <span className='text-white text-3xl lg:text-base'>hurry up! Create an account now!!</span>
                    <p className='w-8/12 mt-6 text-rose-700 text-center text-2xl lg:text-base'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>

                    <Link className='bg-rose-600 p-3 rounded-full text-white font-bold duration-300 hover:bg-rose-700' to='/signup'>Get start</Link>
                </div>
                <div className='mt-5 p-20'>
                    <img className='w-full h-auto' src={bgWebSite} alt="" />
                </div>
            </div>
        </>
    )
}

export default Welcome