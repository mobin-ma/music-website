import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTrack, play, pause } from '../redux/features/songsListSlice';
import PausePlay from './PausePlay';

const Song = ({ song }) => {
    const dispatch = useDispatch();
    const currentTrack = useSelector((state) => state.songsList.currentTrack);
    const audioPlayerRef = useSelector((state) => state.songsList.audioPlayerRef)
    const ifCurrentTrack = currentTrack ? currentTrack.name : null;

    const handlePlay = () => {
        if (audioPlayerRef.paused) {
            audioPlayerRef.play()
            dispatch(play());
        }
    };

    const handlePause = () => {
        if (audioPlayerRef.played) {
            audioPlayerRef.pause()
            dispatch(pause());
        }
    };

    const handleTrackClick = (trackSong) => {
        dispatch(setCurrentTrack(trackSong));
    };

    return (
        <div className='w-[180px] bg-zinc-700/20 rounded-3xl p-5 flex flex-col justify-center items-center cursor-pointer' onClick={() => handleTrackClick(song)}>
            <div className='relative w-full group'>
                <div className={`absolute inset-0 justify-center items-center bg-zinc-700 bg-opacity-50 group-hover:flex ${ifCurrentTrack === song.name ? 'flex bg-rose-900' : 'hidden'}`}>
                    <PausePlay song={song} handlePause={handlePause} handlePlay={handlePlay} />
                </div>
                <img className='w-full h-auto' src={`https://spotify.amirja.ir${song.cover}`} alt="cover" />
            </div>

            <div className='w-full flex flex-col mt-2 px-3 pb-2'>
                <p className='w-full text-center truncate text-white font-semibold'>{song.name}</p>
                <p className='w-full text-center truncate text-white font-light text-sm'>{song.duration}</p>
            </div>
        </div>
    )
}

export default Song