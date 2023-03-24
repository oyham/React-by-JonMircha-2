import React, { useState, useEffect } from 'react'
import SongDetails from './SongDetails'
import SongForm from './SongForm'
import Loader from './Loader'
import { helpHttp } from '../helpers/helpHttp'
import { HashRouter, NavLink, Route, Routes } from "react-router-dom";
import Error404 from '../pages/Error404'

const SongSearch = () => {
    const [search, setSearch] = useState(null)
    const [lyric, setLyric] = useState(null)
    const [bio, setBio] = useState(null)
    const [loading, setLoading] = useState(false)

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
    }, [search])

    const handleSearch = (data) => {
        // console.log(data)
        setSearch(data)
    }

    return (
        <div>
            <HashRouter>
                <header>
                    <h2>Buscador de Canciones con RUTAS</h2>
                    <nav>
                        <NavLink to='/canciones'>Home</NavLink>
                    </nav>
                </header>
                {loading && <Loader />}
                <article className="grid-1-3">
                    <Routes>
                        <Route path='/canciones' element={
                            <>
                                <SongForm handleSearch={handleSearch} />
                                <h2>Tabla de Canciones</h2>
                                {search && !loading && (
                                    <SongDetails search={search} lyric={lyric} bio={bio} />
                                )}
                            </>
                        } />
                        <Route path='/canciones/:id' element={
                            <h2>Página de canción</h2>
                        } />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                </article>
            </HashRouter>
        </div>
    )
}

export default SongSearch