import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from 'react-icons/rx';
import { IoAdd } from 'react-icons/io5';
import { addMusiToPlaylist, deleteMusiToPlaylist, deletePlaylistSongsData, setCloseModal, setPlaylistSongsData } from '../redux/features/playlistSlice';
import Loader from './Loader';

const ModalAddMusic = () => {
    const [openSongslist, setOpenSongslist] = useState(false);
    const [targetSong, setTargetSong] = useState(null);
    const dispatch = useDispatch();
    const openModalAddMusic = useSelector((state) => state.playlists.openModalAddMusic);
    const playlistSongsData  = useSelector((state) => state.playlists.playlistSongs);
    const songs = useSelector((state) => state.songsList.songs);

    const handlerCloseModal = () => {
        dispatch(setCloseModal())
    }

    const handlerTargetSong = (id) => {
        const selectedSong = songs.find(song => song.id === id);
        setTargetSong(selectedSong);
        setOpenSongslist(false)
    }

    const handlerDeleteSong = (id) => {
        const formData = new FormData();
        formData.append('playlist', openModalAddMusic.id);
        formData.append('song', id);
        dispatch(deleteMusiToPlaylist(formData));

        // Update Playlist Songs
        dispatch(deletePlaylistSongsData(id))
    }

    const handlerSubmit = () => {
        const formData = new FormData();
        formData.append('playlist', openModalAddMusic.id);
        formData.append('song', targetSong.id);
        dispatch(addMusiToPlaylist(formData));
        dispatch(setPlaylistSongsData(targetSong));
        setTargetSong(null);
    }

    return (
        <div className='w-4/5 h-auto bg-black absolute p-7 top-1/2 -translate-y-1/2 z-50 rounded-xl'>
            <div className='flex justify-between items-center border-b mb-3 pb-2'>
                <h2 className='text-white'>{openModalAddMusic && openModalAddMusic.name}</h2>
                <RxCross2 className='text-white text-lg hover:text-red-500 duration-200 cursor-pointer' onClick={handlerCloseModal} />
            </div>
            <div className='relative flex flex-col items-center gap-5'>
                <div className='flex flex-col items-center justify-center gap-2 w-full shadow-2xl shadow-gray-800/10'>
                    <p className='text-white text-sm'>Add to Music</p>
                    <IoAdd className='text-white cursor-pointer active:text-red-500' onClick={() => setOpenSongslist(prevState => !prevState)} />
                    {targetSong && <button className='bg-green-600 text-white font-bold text-sm hover:bg-green-700 py-1 px-5 transition duration-150 ease-in-out rounded-3xl' onClick={handlerSubmit}>Ok</button>}
                    {
                        openSongslist &&
                        <div className='absolute p-3 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-xl w-1/2 h-5/6 overflow-auto flex flex-wrap items-center justify-center gap-4'>
                            <RxCross2 className='text-white text-lg hover:text-red-500 duration-200 cursor-pointer' onClick={() => setOpenSongslist(false)} />
                            {
                                songs ? songs.map((song) => {
                                    return <div key={song.id} className='w-full flex items-center justify-around gap-3 p-2 bg-zinc-800/50 rounded-lg cursor-pointer'>
                                        <img className='w-[40px] h-[40px]' src={`https://spotify.amirja.ir${song.cover}`} alt="cover" />
                                        <p className='text-white text-sm flex-1'>{song.name}</p>
                                        <IoAdd className='text-white' onClick={() => handlerTargetSong(song.id)} />
                                    </div>
                                }) : <Loader />
                            }
                        </div>
                    }
                </div>
                <ul className='w-full flex items-center justify-center flex-col overflow-scroll h-72 gap-5'>
                    {
                        playlistSongsData.length > 0 ? playlistSongsData.map((item) => {
                            return (
                                <li key={item.id} className='w-full flex justify-around items-center gap-3 bg-zinc-800/50 p-3 rounded-xl'>
                                    <img className='w-[40px] h-[40x]' src={`https://spotify.amirja.ir${item.cover}`} alt="cover" />
                                    <p className='text-white text-sm font-semibold flex-1 text-left'>{item.name}</p>
                                    <RxCross2 className='text-white' onClick={() => handlerDeleteSong(item.id)} />
                                </li>
                            );
                        }) : <p className='text-white text-lg text-center font-bold'>Plase Add Music to Playlist</p>
                    }
                </ul>
            </div>
        </div>
    )
}

export default ModalAddMusic