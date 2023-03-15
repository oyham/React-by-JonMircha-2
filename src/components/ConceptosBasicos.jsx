import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Acerca from '../pages/Acerca'
import Contacto from '../pages/Contacto'
import Error404 from '../pages/Error404'
import MenuConceptos from './MenuConceptos'
import Usuario from '../pages/Usuario'
import Productos from '../pages/Productos'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import PrivateRoute from './PrivateRoute'


const ConceptosBasicos = () => {

    return (
        <div>
            <h2>Conceptos Basicos</h2>
            <Router>
                <MenuConceptos />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/acerca" element={<Acerca />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="/usuario/:username" element={<Usuario />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/about" element={<> <Navigate to="/acerca" /> </>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<PrivateRoute private={Dashboard} />} />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </Router>
        </div>
    )
}

export default ConceptosBasicos