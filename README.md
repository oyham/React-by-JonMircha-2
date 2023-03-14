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
# 54. React Router. Sintaxis para declarar rutas.
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
# 55. React Router. Ruta de error 404
Creamos los componentes Home y Error404. 

Para el *path* de Error404 colocaremos un **"*"** (asterico) indicando que cualquier ruta que no se encuentre en la barra de direcciones va a cargar error, y sí o sí debemos de llamar a este componente al final de Routes por el tema de la jerarquía a la hora de que Router renderize dichas rutas.
```js
...
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/acerca" element={<Acerca />}/>
                    <Route path="/contacto" element={<Contacto />}/>
                    <Route path="*" element={<Error404 />}/>
                </Routes>
...
```
---
# 56. React Router. Compoentes Link y NavLink
Crearemos el componente **MenuConceptos.jsx** que devuelva dentro de una etiqueta *nav* 3 enlaces con sus href respecto a los componentes que tengamos.Lo importamos antes del componente Router. Así cómo está hace que se carge la página nuevamente y es o no es lo que estamos buscando.
```js
import React from 'react'
const MenuConceptos = () => {
  return (
    <nav>
      <ol>
        <li>
          <span>Menú con enlaces html(no recomendado):</span>
          <a href="/">Home</a>
          <a href="/acerca">Acerca</a>
          <a href="/contacto">Contacto</a>
        </li>
      </ol>
    </nav>
  )
}
export default MenuConceptos
```
Otra manera es reemplazar las etiquetas *a* por componentes **Link**, cambiando así los *href* por la etiqueta *to*. Debemos de colocar el componente MenuConceptos dentro del componente **Router** pero fuera del componente **Routes** para que pueda funcionar, y de esta manera conseguimos cambiar el contenido de la UI sin que se tenga que renderizar la página por cada enlace que visitemos.
```js
        <li>
          <span>Componente Link: </span>
          <Link to="/">Home</Link>
          <Link to="/acerca">Acerca</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/no-existe">Error 404</Link>
        </li>
```
Y por último veremos el componente **NavLink**, lleva tambien *to* y ademas podemos añadirle el atributo **activeClassName** que se utiliza para poder añadir estilos según nos encontremos en dicha ruta.
index.css:
```css
.active {
  font-weight: bold;
  color: #61dafb;
}
```
MenuConceptos:
```js
        <li>
          <span>Componente NavLink: </span>
          <NavLink to="/" activeClassName="active">Home</NavLink>
          <NavLink to="/acerca" activeClassName="active">Acerca</NavLink>
          <NavLink to="/contacto" activeClassName="active">Contacto</NavLink>
        </li>
```
Estos últimas dos formas de navegar entre componentes es la forma recomendable ya que no vuelve a renderizar la página mientras carga dinámicamente la UI.

---
# 57. React Router. Paso de Parámetros (hook useParams)
Creamos en *page* el archivo **Usuario.jsx**. Dentro de este creamos un `let { username } = useParams()`, y devolverá cómo parametro dicho nombre de usuario. Luego en **ConceptosBasicos** creamos un nuevo componente *Route* para renderizar *Usuario*, con la simple modificación de que en su *path* agregemos dicha variable que creamos con *useParams* anteponiendolo con **:** para que react router sepa que estamos haciendo referencia a una ruta que puede variar, luego de colocar `/usuario`, quedando esto así `/usuario/:username/:age`. Cabe aclarar que podemos seguir añadiendo tantos *:* cómo queramos. Éste sera un valor que dinámicamente puede cambiar. 

#### Corrección de error: "activeClassName" no se utiliza más ya que ya se encuentra por default en los NavLink. Si se quiere hacer uso de él sólo basta con definir .active en CSS y dar estilos.

useParams es un objeto dónde cada propiedad hace referencia a cada uno de los parametros que vamos pasando a traves de la URL. Esta manera de definir rutas nos permiten urls amigables por así decirlo.

Finalmente dejaremos `usuario/:username`. Añadimos una nueva *li* con 2 componentes *Link*, indícando el *path* de `usuario/jonmircha` y `usuario/kenai`.
Usuario.jsx:
```js
import React from 'react'
import { useParams } from 'react-router-dom'

const Usuario = () => {
    // let params = useParams()
    // console.log(params)
    let { username } = useParams()
    return (
        <div>
            <h2>Perfil del usuario</h2>
            <p>Nombre del usuario <b>{username}</b></p>
        </div>
    )
}

export default Usuario
```
MenuConceptos.jsx:
```js
        <li>
          <span>Parámetros: </span>
          <Link to="/usuario/jonmircha">JonMircha</Link>
          <Link to="/usuario/kenai">Kenai</Link>
        </li>
```
ConceptosBasicos.jsx:
```js
<Route path="/usuario/:username" element={<Usuario />}/>
```
---
# 58. React Router. Parámetros de consulta (hooks useLocation y useHistory)
### Estos metodos no son recomendados actualmente.
Creación de *page* llamada **Productos.jsx** y lo mandamos a importar en ConceptosBasicos.jsx `<Route path="/productos" element={<Productos />}/>`.
El useLocation devuelve un objeto:
```
Object 
  hash: ""
  key: "9djy9n4y"
  pathname: "/productos"
  search: ""
  state: null
  [[Prototype]]: Object
```
**NO RECOMENDADO**: El search es el que se encarga de las query params. Destructuramos *search* del useLocation y utilizamos un *"new URLSearchParams(search)"* guardado en una `let query`. Ésta se encargará de serealizar los parametros de *search*.
Si observamos la consola, veremos que el URLSearchParams posee varios métodos.

Luego de aqui utilicé un método que encontre en los comentarios, haciendo uso del {useSearchParams} de react-router. 
```js
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
const LIMIT = 20;
let start, end;

const Productos = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
      start = searchParams.get("inicio") || "1";
      end = searchParams.get("fin") || "20";
      setSearchParams({ inicio: start, fin: end });
    }, []);
    
    console.log(start,end)

    const handleNext = (e) => {
      start = new String(parseInt(start) + LIMIT);
      end = new String(parseInt(end) + LIMIT);
      setSearchParams({ inicio: start, fin: end });
    };
    const handlePrev = (e) => {
      start = new String(parseInt(start) - LIMIT);
      end = new String(parseInt(end) - LIMIT);
      setSearchParams({ inicio: start, fin: end });
    
    }
    return (
        <div>
            <h2>Productos</h2>
            <p>Mostrando productos del <b>{start}</b> al <b>{end}</b>.</p>
            <button onClick={handlePrev}>Atrás</button>
            <button onClick={handleNext}>Adelante</button>
        </div>
    )
}
export default Productos
```
---
