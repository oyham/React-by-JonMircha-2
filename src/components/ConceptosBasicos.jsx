import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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
                        <div>
                            <h3>Acerca</h3>
                        </div>
                    } />
                    <Route path="/contacto" 
                    element={
                        <div>
                            <h3>Contacto</h3>
                        </div>
                    } />
                </Routes>
            </Router>
        </div>
    )
}

export default ConceptosBasicos