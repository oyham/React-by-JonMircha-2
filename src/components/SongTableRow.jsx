import React from 'react'
import { useNavigate } from 'react-router-dom'

const SongTableRow = ({ id, el, handleDeleteSong }) => {
    console.log(el)

    let navigate = useNavigate()
    return (
        <tr>
            <td><img src="https://placeimg.com/40/40/any" alt="any" /></td>
            <td>Nombre artista</td>
            <td>Nombre canción</td>
            <td>
                <button onClick={() => navigate(`/canciones/${id}`)}>Ver</button>
                <button onClick={() => handleDeleteSong(id)}>Eliminar</button>
            </td>
        </tr>
    )
}

export default SongTableRow