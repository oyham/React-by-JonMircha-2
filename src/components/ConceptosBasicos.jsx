import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Acerca from '../pages/Acerca'
import Contacto from '../pages/Contacto'
import Error404 from '../pages/Error404'
import MenuConceptos from './MenuConceptos'

const ConceptosBasicos = () => {

       return (
        <div>
            <h2>Conceptos Basicos</h2>
            <Router>
            <MenuConceptos />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/acerca" element={<Acerca />}/>
                    <Route path="/contacto" element={<Contacto />}/>
                    <Route path="*" element={<Error404 />}/>
                </Routes>
            </Router>
        </div>
    )
}

export default ConceptosBasicos