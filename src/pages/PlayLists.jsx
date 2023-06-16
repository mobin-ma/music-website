import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPlaylist, deletePlaylist, getPlaylist, setOpenModalEdit, setOpenModalAddMusic } from '../redux/features/playlistSlice';
import { IoAdd, IoTrash } from 'react-icons/io5';
import { BiEdit } from 'react-icons/bi'
import ModalEdit from '../components/ModalEdit';
import ModalAddMusic from '../components/ModalAddMusic';

const PlayList = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlists.playlists);
  const openModalEdit = useSelector((state) => state.playlists.openModalEdit);
  const openModalAddMusic = useSelector((state) => state.playlists.openModalAddMusic);
  const access = useSelector((state) => state.auth.tokens.access);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(createPlaylist(access))
  }

  const handlerDelete = (playlistID) => {
    dispatch(deletePlaylist(playlistID))
  }

  const handlerModalEdit = (item) => {
    dispatch(setOpenModalEdit(item))
  }

  const handlerModalAddMusic = (item) => {
    dispatch(setOpenModalAddMusic(item))
  }

  useEffect(() => {
    dispatch(getPlaylist(access))
  }, [dispatch, access])

  return (
    <div className='w-full h-screen flex flex-col justify-around items-center rounded-full relative'>
      <div className='w-full flex flex-col md:flex-row items-center justify-around my-5'>
        <div>
          <h1 className='text-white text-7xl lg:text-5xl font-bold'>Play list</h1>
          <p className='text-rose-500 text-2xl lg:text-xl'>Welcome to Playlist page!!</p>
        </div>
        <button>
          <IoAdd className='text-white text-3xl cursor-pointer hover:text-red-400' onClick={handleClick} />
        </button>
      </div>
      <div className='w-full flex-1 flex flex-wrap justify-center items-center gap-5 overflow-auto pb-11'>
        {
          playlists.length > 0 ? playlists.map((item) => {
            return <>
              {openModalEdit && <ModalEdit />}
              {openModalAddMusic && <ModalAddMusic />}
              <div key={item.id} className='w-[280px] lg:w-[180px] h-auto bg-zinc-500/30 rounded-lg flex flex-col cursor-pointer' >
                <div className='relative'>
                  {
                    item.image === null ? <div className='w-full h-[180px] rounded-t-lg bg-zinc-800 flex justify-center items-center text-xl font-bold text-gray-400'>{item.name}</div> :
                      <img className='w-full h-auto rounded-t-lg' src={`https://spotify.amirja.ir${item.image}`} alt="cover" />
                  }
                  <div className={`w-full flex justify-around items-center p-2 ${item.image ? 'bg-black/95' : 'bg-transparent'} absolute bottom-0 right-0 left-0 z-20`}>
                    <IoTrash className='text-red-500 text-sm hover:' onClick={() => handlerDelete(item.id)} />
                    <BiEdit className='text-gray-200 text-sm' onClick={() => handlerModalEdit(item)} />
                    <IoAdd className='text-gray-200 text-base' onClick={() => handlerModalAddMusic(item)} />
                  </div>
                </div>
                <p className='px-4 py-2 text-white font-bold border-b border-gray-300/30'>{item.name}</p>
                <span className='px-4 py-2 text-gray-500 font-light text-xs'>TERAK :{item.song_number}</span>
              </div>
            </>
          }) : <p className='text-gray-400/30 text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Please <span className='underline decoration-red-500 text-red-400 cursor-pointer' onClick={handleClick} >add</span> a playlist</p>
        }
      </div>
    </div>
  )
}

export default PlayList