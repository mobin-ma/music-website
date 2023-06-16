import React, { useEffect, useRef } from 'react';
import { HiPlay, HiPause } from 'react-icons/hi';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import AudioPlayer from 'react-audio-player';
import { play, pause, setCurrentTrack, setVolume } from '../redux/features/songsListSlice';
import { setAudioPlayerRef } from '../redux/features/songsListSlice';
import logo from '../assets/logo.png';

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const currentTrack = useSelector((state) => state.songsList.currentTrack);
  const isPlaying = useSelector((state) => state.songsList.isPlaying);
  const songs = useSelector((state) => state.songsList.songs);
  const isVolume = useSelector((state) => state.songsList.isVolume);
  const song = songs ? songs.map(song => song.song) : null;
  const audioPlayerRef = useRef(null)
  const audioElement = audioPlayerRef.current ? audioPlayerRef.current.audioEl.current : null;

  useEffect(() => {
    dispatch(setAudioPlayerRef(audioElement))
  }, [dispatch, audioElement])

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    dispatch(setVolume(newVolume))
    audioPlayerRef.current.volume = newVolume;
  };

  const handlePlay = () => {
    if (audioPlayerRef.current.audioEl.current.paused) {
      audioPlayerRef.current.audioEl.current.play()
      dispatch(play());
    }
  };

  const handlePause = () => {
    if (audioPlayerRef.current.audioEl.current.played) {
      audioPlayerRef.current.audioEl.current.pause()
      dispatch(pause());
    }
  };

  const handleNext = () => {
    const audioElement = audioPlayerRef.current.audioEl.current;
    const currentSongIndex = songs.findIndex(song => song.id === currentTrack.id);
    const nextSongIndex = currentSongIndex + 1;

    if (nextSongIndex < songs.length) {
      const nextTrack = songs[nextSongIndex];
      dispatch(setCurrentTrack(nextTrack));
      audioElement.src = `https://spotify.amirja.ir${nextTrack.song}`;
      audioElement.load();
      setTimeout(() => {
        audioElement.play();
        dispatch(play());
      }, 100);
    }
  };

  const handlePrevious = () => {
    const audioElement = audioPlayerRef.current.audioEl.current;
    const currentSongIndex = songs.findIndex(song => song.id === currentTrack.id);
    const previousSongIndex = currentSongIndex - 1;

    if (previousSongIndex >= 0) {
      const previousTrack = songs[previousSongIndex];
      dispatch(setCurrentTrack(previousTrack));
      audioElement.src = `https://spotify.amirja.ir${previousTrack.song}`;
      audioElement.load();
      setTimeout(() => {
        audioElement.play();
        dispatch(play());
      }, 100);
    }
  };

  return (
    <div className='w-full p-20 lg:p-3 flex justify-between items-center'>
      <div>
        <img className='w-full h-12 rounded-full animate-spin d' src={currentTrack ? `https://spotify.amirja.ir${currentTrack ? currentTrack.cover : null}` : logo} alt="img" />
      </div>
      <div className='w-1/5 flex justify-around items-center'>
        <AudioPlayer
          ref={audioPlayerRef}
          src={currentTrack ? `https://spotify.amirja.ir${currentTrack.song}` : `https://spotify.amirja.ir${song[0]}`}
          autoPlay={false}
          controls={false}
          onEnded={handleNext}
          volume={isVolume}
        />
        <TbPlayerTrackPrevFilled size={30} className='text-white cursor-pointer' onClick={handlePrevious} />
        {
          isPlaying ? <HiPause size={40} className='text-white' onClick={handlePause} /> : <HiPlay size={40} className='text-white' onClick={handlePlay} />
        }
        <TbPlayerTrackNextFilled size={30} className='text-white cursor-pointer' onClick={handleNext} />
      </div>
      <div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isVolume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  )
}

export default MusicPlayer