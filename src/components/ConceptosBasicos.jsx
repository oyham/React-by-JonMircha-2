import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Acerca from '../pages/Acerca'
import Contacto from '../pages/Contacto'

const ConceptosBasicos = () => {

       return (
        <div>
            <h2>Conceptos Basicos</h2>
            <Router>
                <Routes>
                    <Route path="/" 
                    element={
                        <div>
                            <h3>Home</h3>
                            <p>Welcome</p>
                        </div>
                    } />
                    <Route path="/acerca" 
                    element={
                        <Acerca />
                    } />
                    <Route path="/contacto" 
                    element={
                        <Contacto />
                    } />
                </Routes>
            </Router>
        </div>
    )
}

export default ConceptosBasicos