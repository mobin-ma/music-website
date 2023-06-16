import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { albumsList } from '../redux/features/albumsSlice';

const Albums = () => {
  const dispatch = useDispatch();
  const albums = useSelector((state) => state.albums.albums);
  const access = useSelector((state) => state.auth.tokens.access);
  const ifCurrentalbum = albums.name

  useEffect(() => {
    dispatch(albumsList(access));
  }, [dispatch, access])

  return (
    <div className='flex flex-col items-center justify-center gap-10'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-white text-7xl lg:text-5xl font-bold'>Albums</h1>
        <p className='text-rose-500 text-2xl lg:text-xl'>Welcome to Albums page!</p>
      </div>
      <div className='grid grid-cols-4 gap-4 p-4 mx-auto'>
        {
          albums ? albums.map((album) => {
            return (
              <div className='w-[180px] bg-zinc-700/20 rounded-3xl p-5 flex flex-col justify-center items-center cursor-pointer'>
                <div className='relative w-full group'>
                  <div className={`absolute inset-0 justify-center items-center text-white font-bold bg-zinc-700 bg-opacity-50 group-hover:flex ${ifCurrentalbum === album.name ? 'flex bg-rose-900' : 'hidden'}`}>
                    See
                  </div>
                  <img className='w-full h-auto' src={`https://spotify.amirja.ir${album.cover}`} alt="cover" />
                </div>

                <div className='w-full flex flex-col mt-2 px-3 pb-2'>
                  <p className='w-full text-center truncate text-white font-semibold'>{album.name}</p>
                  <p className='w-full text-center truncate text-white font-light text-sm'>{album.duration}</p>
                </div>
              </div>
            )
          }) :
            null
        }
      </div>
    </div>
  )
}

export default Albums