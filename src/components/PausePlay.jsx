import React from 'react'
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux'


const PausePlay = ({ handlePlay, handlePause, song }) => {
    const isPlaying  = useSelector((state) => state.songsList.isPlaying );
    const currentTrack  = useSelector((state) => state.songsList.currentTrack );
    return (
        <div className=''>
            {currentTrack && currentTrack.id === song.id && isPlaying  ? (
                <AiFillPauseCircle size={36} className='text-white' onClick={handlePause} />
            ) : (
                <AiFillPlayCircle size={36} className='text-white' onClick={handlePlay} />
            )}
        </div>
    )
}

export default PausePlay