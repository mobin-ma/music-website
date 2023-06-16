import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isHeaderSticky, setHeaderSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            if (isScrolled && !isHeaderSticky) {
                setHeaderSticky(true);
            } else if (!isScrolled && isHeaderSticky) {
                setHeaderSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isHeaderSticky]);
    return (
        <div className={`w-full flex items-center py-2 px-5 bg-zinc-900 ${isHeaderSticky ? 'sticky' : ''}`}>
            <div className='flex justify-start items-center basis-1/2'>
                <img className='w-[10%] h-auto' src={logo} alt="" />
            </div>
            <div className='flex justify-end items-center gap-5 basis-1/2'>
                <Link className='border border-rose-600 bg-rose-600 px-4 py-2 rounded-full text-white text-sm font-bold hover:bg-rose-700 duration-300' to='/login'>Login</Link>
                <Link className='border border-rose-600 px-4 py-2 rounded-full text-rose-600 text-sm font-bold hover:bg-rose-600 hover:text-white duration-300' to='/signup'>Signup</Link>
            </div>
        </div>
    )
}

export default Navbar