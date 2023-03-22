import React, { useState, useEffect } from "react";
import { CrudForm } from "./CrudForm";
import { CrudTable } from "./CrudTable";
import { helpHttp } from "../helpers/helpHttp"
import Loader from "./Loader";
import Message from "./Message";
import { HashRouter, NavLink, Route, Routes } from "react-router-dom";
import Error404 from "../pages/Error404";

const CrudApi = () => {
    const [db, setDb] = useState(null)
    const [dataToEdit, setDataToEdit] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    let api = helpHttp();
    let url = "http://localhost:5000/santos"

    useEffect(() => {
        setLoading(true)
        api.get(url).then((res) => {
            if (!res.err) {
                setDb(res)
                setError(null)
            } else {
                setDb(null)
                setError(res)
                // return;
            }
            setLoading(false)
        })
    }, [url])


    const createData = (data) => {
        data.id = Date.now();

        let options = {
            body: data,
            headers: { "content-type": "application/json" }
        }

        api.post(url, options).then((res) => {
            console.log(res);
            if (!res.err) {
                setDb([...db, res])
            } else {
                setError(res)
            }
        })
    }

    const updateData = (data) => {
        let endpoint = `${url}/${data.id}`
        let options = {
            body: data,
            headers: { "content-type": "application/json" }
        }
        api.put(endpoint, options).then((res) => {
            if (!res.err) {
                let newData = db.map(el => el.id === data.id ? data : el)
                setDb(newData)
            } else {
                setError(res)
            }
        })
    }

    const deleteData = (id) => {
        let isDelete = confirm(`Estás seguro ded elimninar el registro con el id '${id}'`)
        if (isDelete) {
            let endpoint = `${url}/${id}`
            let options = {
                headers: { "content-type": "application/json" }
            }
            api.del(endpoint, options).then((res) => {
                if (!res.err) {
                    let newData = db.filter(el => el.id !== id)
                    setDb(newData)
                } else {
                    setError(res)
                }
            })
        } else {
            return;
        }
    }

    return (
        <>
            <HashRouter>
                <header>
                    <h2>CRUD-API con RUTAS</h2>
                    <nav>
                        <NavLink to='/santos'>Santos</NavLink>
                        <NavLink to='/santos/agregar'>Agregar</NavLink>
                    </nav>
                </header>
                <Routes>
                    <Route path="/santos" element={<h2>Home de Santos</h2>}/>
                    <Route path="/santos/agregar" element={<h2>Agregar Santos</h2>}/>
                    <Route path="/santos/editar/:id" element={<h2>Editar Santos</h2>}/>
                    <Route path="*" element={<Error404 />}/>
                </Routes>
            </HashRouter>
            <CrudForm
                createData={createData}
                updateData={updateData}
                dataToEdit={dataToEdit}
                setDataToEdit={setDataToEdit}
            />
            {loading && <Loader />}
            {error && <Message
                msg={`Error ${error.status}: ${error.statusText}`}
                bgColor="#dc3545" />}
            {db && <CrudTable
                data={db}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
            />}
        </>
    )
}

export default CrudApi