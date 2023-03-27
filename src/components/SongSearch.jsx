import React, { useState, useEffect } from 'react'
import SongDetails from './SongDetails'
import SongForm from './SongForm'
import Loader from './Loader'
import { helpHttp } from '../helpers/helpHttp'
import { HashRouter, NavLink, Route, Routes } from "react-router-dom";
import Error404 from '../pages/Error404'
import SongTable from './SongTable'
import SongPage from '../pages/SongPage'

let mySongsInit = JSON.parse(localStorage.getItem("mySongs")) || [];

const SongSearch = () => {
    const [search, setSearch] = useState(null)
    const [lyric, setLyric] = useState(null)
    const [bio, setBio] = useState(null)
    const [loading, setLoading] = useState(false)
    const [mySongs, setMySongs] = useState(mySongsInit)

    useEffect(() => {
        if (search === null) return;

        const fetchData = async () => {
            const { artist, song } = search

            let artisUrl = `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${artist}`
            let songUrl = `https://api.lyrics.ovh/v1/${artist}/${song}`

            console.log(artisUrl, songUrl)

            setLoading(true)

            const [artistRes, songRes] = await Promise.all([
                helpHttp().get(artisUrl),
                helpHttp().get(songUrl),
            ])

            console.log(artistRes, songRes)
            setBio(artistRes)
            setLyric(songRes)
            setLoading(false)
        }

        fetchData()

        localStorage.setItem("mySongs",JSON.stringify(mySongs));
    }, [search,mySongs])

    const handleSearch = (data) => {
        // console.log(data)
        setSearch(data)
    }

    const handleSaveSong = () => {
        alert("Salvando canción en favoritos")
        let currentSong = {
            search,
            lyric,
            bio
        }
        let songs = [...mySongs, currentSong]
        setMySongs((songs))
        setSearch(null)
        localStorage.setItem("mySongs",JSON.stringify(songs));
    }

    const handleDeleteSong = (id) => {
        let isDelete =  window.confirm(`Desea eliminar la canción con el id: ${id}`)
        // confirm(`Desea eliminar la canción con el id: ${id}`)
        if (isDelete) {
            let songs = mySongs.filter((el,index) => index !== id);
            setMySongs(songs)
            localStorage.setItem("mySongs",JSON.stringify(songs));
        }
    }
    return (
        <div>
            <HashRouter>
                <header>
                    <h2>Buscador de Canciones con RUTAS</h2>
                    <nav>
                        <NavLink to='/'>Home</NavLink>
                    </nav>
                </header>
                {loading && <Loader />}
                <article className="grid-1-2">
                    <Routes>
                        <Route path='/' element={
                            <>
                                <SongForm handleSearch={handleSearch} handleSaveSong={handleSaveSong}/>
                                <SongTable mySongs={mySongs} handleDeleteSong={handleDeleteSong}/>
                                {search && !loading && (
                                    <SongDetails search={search} lyric={lyric} bio={bio} />
                                )}
                            </>
                        } />
                        <Route path='/canciones/:id' element={<SongPage mySongs={mySongs}/>}/>
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                </article>
            </HashRouter>
        </div>
    )
}

export default SongSearch