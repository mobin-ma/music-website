import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { editPlaylist, setCloseModal } from '../redux/features/playlistSlice';
import Loader from './Loader';

const Modal = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectImage, setSelectImage] = useState(null);
    const dispatch = useDispatch();
    const openModalEdit = useSelector((state) => state.playlists.openModalEdit);
    const isLoading = useSelector((state) => state.playlists.isLoading);

    const handlerCloseModal = () => {
        dispatch(setCloseModal())
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name)
        formData.append('description', description)
        formData.append('image', selectImage)

        dispatch(editPlaylist({ id: openModalEdit.id, formData }));

        setName('')
        setDescription('')
    }

    return (
        <div className='w-4/5 h-auto bg-black/95 absolute p-7 top-1/2 -translate-y-1/2 z-50 rounded-xl'>
            <div className='flex justify-between items-center border-b mb-3 pb-2'>
                <h2 className='text-white'>{openModalEdit && openModalEdit.name}</h2>
                <RxCross2 className='text-white text-lg hover:text-red-500 duration-200 cursor-pointer' onClick={handlerCloseModal} />
            </div>
            <form className='flex justify-center items-center gap-5' onSubmit={handleSubmit}>
                <div className='w-[280px] h-[280px] bg-zinc-900 flex flex-col justify-center items-center'>
                    <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300/40 px-6 py-10">
                        <div className="text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                            </svg>
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label className="relative cursor-pointer rounded-md bg-transparent font-bold text-rose-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-rose-600 hover:text-rose-600">
                                    <span>Upload a file</span>
                                    <input type="file" accept="image/*" className="sr-only" onChange={(e) => setSelectImage(e.target.files[0])} />
                                </label>

                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 10MB</p>
                        </div>
                    </div>
                </div>

                <div className='flex-1 px-5 py-10 flex flex-col items-center justify-center gap-10'>
                    <div className='w-full flex flex-col gap-2 items-start justify-center relative'>
                        <label className='text-white ml-5 md:text-lg text-xs'>Name :</label>
                        <input
                            className='w-full py-3 bg-zinc-900 border-none rounded-xl text-gray-400 transition-all focus:ring-zinc-300'
                            type="text"
                            placeholder='Enter your name playlist'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>

                    <div className='w-full flex flex-col gap-2 items-start justify-center relative'>
                        <label className='text-white ml-5 md:text-lg text-xs'>Description :</label>
                        <input
                            className='w-full py-3 bg-zinc-900 border-none rounded-xl text-gray-400 transition-all focus:ring-zinc-300'
                            type="text"
                            placeholder='Enter your description playlist'
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>
                </div>

                {
                    isLoading ? <Loader /> : <button className='bg-rose-500 px-4 py-2 rounded-xl text-white text-sm font-bold transition duration-700 ease-in-out hover:bg-rose-700 hover:scale-110'>Sumbit</button>
                }
            </form>
        </div>
    )
}

export default Modal