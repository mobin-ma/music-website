import React, { useState } from 'react'
import SideBar from './SideBar'
import MusicPlayer from './MusicPlayer'
import { FaBars } from 'react-icons/fa'

const Layout = ({ children }) => {
    const [menu, setMenu] = useState(false)
    const hadlerMenu = () => { 
        if (menu) {
            document.getElementById('menu').classList.add('block')
            document.getElementById('menu').classList.remove('hidden')
            setMenu(false)
        } else {
            document.getElementById('menu').classList.add('hidden')
            document.getElementById('menu').classList.remove('block')
            setMenu(true)
        }
    }
    return (
        <>
            <div className='flex flex-col lg:flex-row'>
                <div className='block lg:hidden m-5 w-full text-right'>
                    <button className='px-5' onClick={hadlerMenu}>
                        <FaBars className='text-white text-5xl' />
                    </button>
                </div>
                <div id='menu' className='w-full basis-[17%] hidden lg:block overflow-hidden'>
                    <SideBar />
                </div>
                <div className='w-full min-h-screen basis-[83%] overflow-hidden'>
                    {children}
                </div>
            </div>
            <div className='w-full bg-zinc-950 shadow-[0_5px_15px_0px] shadow-black/50 fixed bottom-0 left-0 z-[1000]'>
                <MusicPlayer />
            </div>
        </>
    )
}

export default Layout