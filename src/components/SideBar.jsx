import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs'
import { MdPlaylistPlay } from 'react-icons/md'
import { BiAlbum } from 'react-icons/bi'
import { GiMusicalNotes } from 'react-icons/gi'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/features/authSlice';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [btnLogOut, setBtnLogOut] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const audioPlayerRef = useSelector((state) => state.songsList.audioPlayerRef);

    const handlerLogOut = () => {
        dispatch(logOut());
        navigate("/");
        if (audioPlayerRef) {
            audioPlayerRef.pause();
            audioPlayerRef.currentTime = 0;
        }
        window.location.reload();
    }
    const handlerActive = () => {
        if (btnLogOut === false) {
            setBtnLogOut(true)
            document.getElementById('LOGOUT').classList.add('hidden')
            document.getElementById('LOGOUT').classList.remove('block')
        } else {
            setBtnLogOut(false)
            document.getElementById('LOGOUT').classList.add('block')
            document.getElementById('LOGOUT').classList.remove('hidden')
        }
    }
    return (
            <div className='w-full min-h-screen flex bg-zinc-800 flex-col divide-y divide-zinc-600/50 pb-14'>
                <div className='w-full flex justify-center items-center p-5'>
                    <div className='w-full flex items-center gap-2'>
                        <div className='w-7 h-7 bg-gradient-to-tl to-red-700 from-orange-600 rounded-full flex justify-center items-center text-white font-semibold capitalize'>{user.arg.email[0]}</div>
                        <span className='w-1/2 text-white text-sm font-light truncate'>{user ? user.arg.email : 'Erorr'}</span>
                    </div>
                    <div className='cursor-pointer relative p-1 rounded-lg border-zinc-500 group' onClick={handlerActive}>
                        <div id='LOGOUT' className='w-[100px] absolute bg-black/90 p-3 -bottom-14 right-0 z-[999] rounded-lg duration-1000 hidden'>
                            <button className='text-white duration-200 hover:text-gray-400' onClick={handlerLogOut}>log out</button>
                        </div>
                        <BsThreeDots className='text-zinc-600 group-active:text-white' />
                    </div>
                </div>

                <ul className='w-full flex-1 flex flex-col justify-evenly p-5'>
                    <Link className='w-full text-white font-semibold text-base rounded-xl hover:bg-rose-500/50 p-3 duration-300 active:text-red-500' to='/'>Home</Link>
                    <Link className='w-full text-white font-semibold text-base rounded-xl hover:bg-rose-500/50 p-3 duration-300 active:text-red-500' to='/search'>Search</Link>
                    <Link className='w-full text-white font-semibold text-base rounded-xl hover:bg-rose-500/50 p-3 duration-300 active:text-red-500' to='/explore'>Explore</Link>
                </ul>

                <ul className='h-auto flex-1 flex flex-col justify-evenly p-5'>
                    <h3 className='text-zinc-600 font-semibold text-sm uppercase'>MyCollection</h3>
                    <li>
                        <Link className='flex items-center gap-2 text-white font-semibold rounded-xl hover:bg-rose-500/50 p-3 duration-300 active:text-red-500 truncate' to='/playlists'>
                            <MdPlaylistPlay className='text-2xl' />
                            Playlists
                        </Link>
                    </li>
                    <li>
                        <Link className='flex items-center gap-2 text-white font-semibold rounded-xl hover:bg-rose-500/50 p-3 duration-300 active:text-red-500 truncate' to='/albums'>
                            <BiAlbum className='text-2xl' />
                            Albums
                        </Link>
                    </li>
                    <li>
                        <Link className='flex items-center gap-2 text-white font-semibold rounded-xl hover:bg-rose-500/50 p-3 duration-300 active:text-red-500 truncate' to='/artists'>
                            <GiMusicalNotes className='text-2xl' />
                            Artists
                        </Link>
                    </li>
                </ul>

            </div>
    )
}

export default SideBar