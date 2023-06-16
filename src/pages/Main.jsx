import React, { useEffect } from 'react'
import Song from '../components/Song'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { songList } from '../redux/features/songsListSlice';
import { albumsList } from '../redux/features/albumsSlice';
import { Link, Navigate } from 'react-router-dom';
import { updateToken } from '../redux/features/authSlice';

const Main = () => {
  const dispatch = useDispatch();
  const access = useSelector((state) => state.auth.tokens.access);
  const refresh = useSelector((state) => state.auth.tokens.refresh);
  const loading = useSelector((state) => state.songsList.loading);
  const error = useSelector((state) => state.songsList.error);
  const songs = useSelector((state) => state.songsList.songs);
  const albums = useSelector((state) => state.albums.albums);
  useEffect(() => {
    if (error) {
      dispatch(updateToken(refresh))
    }
    dispatch(songList(access));
    dispatch(albumsList(access));
  }, [dispatch, access, error, refresh])

  if (refresh === null) {
    return <Navigate to='login'/>
  }

  if (loading) {
    return <Loader />
  }



  return (
    <div className='flex px-3'>
      <div className='basis-full lg:basis-3/4 h-screen overflow-auto flex flex-col items-center gap-y-16 pb-24'>
        <div className='w-full flex flex-col md:flex-row items-center justify-around mt-5'>
          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-white text-7xl lg:text-5xl font-bold'>Home</h1>
            <p className='text-rose-500 text-2xl lg:text-xl'>Welcome to music web app!</p>
          </div>
          <select className='bg-black rounded-lg border border-red-500 text-zinc-300 text-sm outline-none' value='' onChange={() => { }}>
            <option value="pop">pop</option>
          </select>
        </div>
        <div className='grid grid-cols-4 gap-4'>
          {
            songs ? songs.map((song) => { return <Song key={song.id} song={song} /> }) : <Loader />
          }
        </div>
      </div>
      <div className='basis-1/4 hidden lg:flex flex-col mt-5 gap-4'>
        <div className='p-2 bg-zinc-600/20 rounded-lg'>
          <div className='flex items-center justify-between'>
            <h2 className='text-white text-lg font-bold'>Top Albums</h2>
            <Link to='/albums' className='text-red-500 underline font-light text-sm'>See more</Link>
          </div>
          <ol className='flex flex-col p-5 gap-4'>
            {
              albums ? albums.map((album) => (
                <li key={album.id} className='flex items-center gap-4'>
                  <img className='w-[50px] h-auto' src={`https://spotify.amirja.ir${album.cover}`} alt="album" />
                  <div className='flex-1'>
                    <p className='text-white'>{album.name}</p>
                    <span className='text-gray-400 text-sm font-light'>Adele</span>
                  </div>
                  <Link to={`/albums/${album.id}`} className='text-red-500 text-xs underline'>See</Link>
                </li>
              )) :
                <Loader />
            }
          </ol>
        </div>
        <div className='p-2 bg-zinc-600/20 rounded-lg'>
          <div className='flex items-center justify-between'>
            <h2 className='text-white text-lg font-bold'>Top Artists</h2>
            <Link to='/artists' className='text-red-500 underline font-light text-sm'>See more</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main