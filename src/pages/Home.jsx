import React from 'react'
import Layout from '../components/Layout'
import Main from './Main'
import Search from './Search'
import Explore from './Explore'
import PlayLists from './PlayLists'
import Albums from './Albums'
import Artists from './Artists'
import { Route, Routes } from 'react-router-dom'

const Home = () => {

    return (
        <Layout>
            <Routes>
                <Route exact path="*" element={<Main />} />
                <Route path="/search" element={<Search />} />
                <Route path="/explore" element={<Explore />} />
                <Route path='/playlists' element={<PlayLists />} />
                <Route path='/albums' element={<Albums />} />
                <Route path='/artists' element={<Artists />} />
            </Routes>
        </Layout>
    )
}

export default Home