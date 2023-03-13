# SEGUNDA PARTE DEL CURSO DE REACT *_by_* JONMIRCHA.

---
# 53. React Router. Introducción y definición de rutas
- En la versión 6 el modulo "Switch" fue remplazado por "routes" por lo cual la importación también cambiará 
Ejemplo: import { Routes ,Route } from 'react-router-dom';
- Otro cambió fue que ya no es necesario agregar la propiedad "exact" en las rutas
- También creo que la sintaxis para definir las rutas a cambiado de: 
``<Route path="/" component={Home} />`` a:``<Route path='/welcome' element={<Home/>}/>``

Creacion de folder components + file ConceptosBasicos.
ReactRouter será como un componente contenedor envolviendo los demas componentes.
El componente padre para la web es conocido como BrowserRouter, pero lo que se suele hacer es utilizar Router directamente. Podemos llamar a la versión react router para la web con `{BrowserRouter as Router}`.

Colocamos el componente **Router** y dentro podemos ir definiendo las rutas que quiero cargar, envolviendo estas con el componente **Routes**. Para poder definir las rutas necesitamos el componente **Route**. Estas reciben ciertas *props*, como el *path* y *element*.
#### PATH: se encarga de encontrar la ruta que coincída con la barra de direcciones.
#### ELEMENT: se encarga de renderizar tal componente o devolver jsx.
```js
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
```
---
# 54. React Router: Sintaxis para declarar rutas.
Creamos la carpega *page* dentro de *src* para crear los componentes a renderizar en **Route**. Acerca.jsx será el primer componente a trabajar, y lo nombramos en español porque trataremos de ser fiél a la ruta que el usuario va a colocar en la aplicación. Posteriormente creamos Contaco.jsx e importamos los dos componentes en la prop *element* dentro de sus respectivos Route según su *path*. Tener en cuenta que todo lo que esté fuera del Router siempre se va a mostrar al cargar la aplicación. Ej: Cabecera, el contenido que va a varia envuelto en Router, y el píe de página.
##### Los componentes Route pueden ser tratados como contenedores o lineales. 
```js
...
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
...
```
