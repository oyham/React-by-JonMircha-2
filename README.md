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
# 59. React Router. Redirecciones
<!-- "Con los nuevos cambios la redirrecion seria de esta manera.
 <Route path="/about"  element={ <> <Navigate to="/acerca" /> </> } />" -->
Crearemos una nueva *li* con dos **Links** que nos redirija a ``"/about"``  y ``"/contact"``. Primero nos arrojará un Error 404 ya que dichas rutas no existen. Para que funcione debemos de especificar una ruta y en el atributo *element* hacer uso del **Navigate**, envuelto en un fragmento y con el **to** para devolver el componente que queramos.
` <Route path="/about"  element={ <> <Navigate to="/acerca" /> </> } />`

---
# 60. React Router. Rutas anidadas (hook useRouteMatch)
### v5 NO RECOMENDADO. 

#### Equivalencia de useRoutMatch para la v6 de react router:
[Stack Overflow ->](https://stackoverflow.com/questions/72683709/react-router-v6-useroutematch-equivalent)

'En react-router-dom@6 no hay reemplazo para el hook v5 *useRouteMatch*. Los enlaces y las rutas ya no necesitan preocuparse tanto por el patrón de la ruta, sino que simplemente pueden usar rutas y enlaces relativos. En lugar de intentar acceder al patrón de ruta de una ruta, simplemente puede navegar en relación con la ruta coincidente actualmente.'
Un ejemplo: 
```js
const { pathname } = useLocation();

/ navigate to sibling route path
<Link to={`${pathname}/../${RELATED_ID}`}>
  Go to Nested Route {RELATED_ID}
</Link>
```
Esta funcionalidad navega desde '/ruta-a/2' a '/ruta-a/2/../1' o más bien '/ruta-a/1'.
#### Aqui un ejemplo completo en codesandbox: 
[CodeSandbox ->](https://codesandbox.io/s/react-router-use-route-match-v5-forked-nk5qb7?fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.jsx&theme=dark)

Pero en resumen este concepto trata del enlace entre rutas, entre secciones y sub-secciones. Imaginemos que haremos la documentación de un proyecto. Poseemos temas y sub-temas, y para movernos dinámicamente entre ellos podemos utilizar el ejemplo dado arriba. Existe el hook **useMatch** pero eso se los dejo para que lo investiguen por su cuenta. [Visitar ReactRouter/useMatch](https://reactrouter.com/en/main/hooks/use-match).

---
# 61. React Router. Rutas privadas
#### Tutorial actualizado a la v6.
Creamos dos nuevos archivos Login y Dashboard, aplicamos Route a ambos y sus respectivos Links.
Para simular una ruta privada, crearemos el componente PrivateRoute.
 El Route de Dashboard, en el atributo element, debe de renderizar nuestro PrivateRoute, además de enviar como prop el componente que queramos renderizar, en este caso Dashboard.
Luego PrivateRoute destructura como prop dicho atributo para poder renderizarlo.

!Pequeño truco: si deseamos destructurar *props* podemos pasar de esto:
V5
```js
const PrivateRoute = (props) =>{
  return (
    <Route exact={props.exact} path={props.path} component={props.component} />
  )
}
```
A esto:
```js
const PrivateRoute = (props) =>{
  return (
    <Route {...props} />
  )
}
```
Y si deseamos poder manejar una prop por separado, podemos hacer lo siguiente:
```js
const PrivateRoute = ({component,...rest}) =>{
  return  <Route {...rest}} />
}  
```
Diciendo que necesitamos extraer la prop component, o element en v6, y el resto de las props, usar la propagación.

Ahora siguiendo con el tutorial crearemos un condicional que basado en un `let auth` renderice o no el **dashboard**, y siendo nulo el *auth*, nos redirija al **login**.
```js
import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ private: Private }) => {
    //simualcion de autenticación
    let auth;
    auth = true;
    auth = null;

    return auth ? <Private /> : <Navigate to="/login" />;
}

export default PrivateRoute
```
El `private: Private` es un *rename* necesario para que nuestro editor de código interprete que private es un componente, ya que estos comienzan con mayúscula. Los *":"* es cómo decir "estoy definiendo un objeto" sólo que estamos renombrandolo.

---
# 62. React Router. El problema de las rutas en producción
### Las limitantes de React router si sólo estamos haciendo una aplicación del lado del Front-end y no enfocado al lado del servidor. Ej: Si nuestra app ya se encuentra en la web, al momento de que react router tome la ruta de /usuario/jonmircha, nuestra aplicación arrojará un error 404.

A la hora de subir nuestra aplicación a la web debemos de hacer un build de nuestra app. La carpeta public y src no se suben manualmente cómo talvez pensabamos (me incluyo en mis primeros meses de aprendizaje).
Ejecutamos "npm run build". Este comando nos creará una carpeta llamada "build", "dist", según con que hayas desplegado tu aplicación. Abrimos la carpeta en una nueva ventana de vscode y ejecutamos live server.
A primera vista, y viendo su funcionalidad, notaremos que todo anda cómo debería, que no hay diferencia entre nuestra aplicación en producción y ésta desplegada. Pero imaginemos que el usuario desea guardar en favoritos la ruta de '/usuario/jonmircha', para simular esto, copiemos la url de nuestro localhost que nos da nuestro npm run dev o npm run start... al pegarlo en una nueva pestaña, nos devolverá el componente que estemos envíando por la URL; pero al hacer lo mismo con la URL que nos devuelve nuestro live server, al pegar la url en una nueva pestaña/ventana/browser, lo que nos devolverá será un "Cannot GET /usuario/jonmircha". 
Al abrir la herramientas de desarrollo, veremos en la pestaña network que aparecerá un error 404.

¿Y por qué pasa esto?
---
Recordemos que lo que react router hace tras banbalinas es hacer renderizados condicionales y mostrar en la UI según la ruta que tengamos. 

Si no tenemos una estrategía del lado del servidor, vamos a recibir este error, ya que el usuario para que no pase por esto, debe de empezar a consumir nuestra aplicación desde el home, y desde el home es que react router comienza a ejecutar los renderizados condicionales para ir mostrando una cosa u otra.

Si comenzamos la navegación desde el home todo irá bien... imaginemos que nos encontramos en "/acerca", al recargar la página, estamos realizando una petición al servidor, pero cómo del lado del servidor no se encuentra la página "acerca" en sí, no nos la puede devolver. React Router sólo manipula la URL y renderiza en la UI a traves de condicionales pero siempre desde el archivo index que es donde se renderiza tódos los componentes. SPA tiene la ventaja de que tódo carga a la primera petición que realicemos mientras sea en el HOME. Si creamos una carpeta en nuestro build llamada "acerca" y dentro creamos un index.html que devuelva un h3 por ejemplo, al recargar la página desde "/acerca" esta si nos devolverá el index que creamos en la carpeta acerca, pero no lo que previamente se mostraba en la UI al comenzar la navegación desde el HOME.

---
# 63. React Router. HashRouter #️⃣
Esta técnica se basa en utilizar el #, ya que al agregarlo nos permite acceder a enlaces internos, diciendole que nos encontramos en el mismo archivo y debe de buscar por "ID" , o recurso, o un API, por ejemplo.

"http://127.0.0.1:5501/#/acerca" Aquí estaríamos especificando la ruta HOME y que dentro posee el recurso 'acerca'. 

Para el uso del **Hash** crearemos un nuevo menú para mantener los conceptos que veníamos trabajando por separado.
Utiliza el mismo flujo que nuestro BrowserRouter pero con diferentes componentes, en vez de crear un componente Router, haremos uso de **HashRouter**, dentro crearemos una barra de navegación con nav, y dentro importaremos 3 componentes **Link** con sus respectivas rutas del home, acerca y contacto. Fuera del nav haremos uso del componente Route para especificar las 3 rutas mencionadas, además de la ruta de error. 
Luego que veamos que funciona todo correcto, ejecutaremos `'npm run build'`, creando un nuevo compilado para la aplicación en producción. 

---
# 64. React Router. Ejercicios.
Copiamos archivos previos que realizamos en la tanda de ejercicios básicos de React y los pegamos en esta segunda parte. 

---
# 65. React Router. CRUD API con RUTAS (1/2)
##### basename en la V6 de React Router no funciona.
En CrudApi creamos el componente HashRouter y colocamos el atributo basename, que tiene la función de establecer la ruta que compartiran las demás rutas para ahorranos colocarlas manualmente.
Primero necesitamos un header que contenga una barra de navegación con dos NavLinks que contenga el *to* en home (que sería santos por el *basename*) y el otro en *agregar*.
Luego necesitamos el componente que envuelva las rutas que seria Routes con las respectivas Route que queramos tener. Colocaremos la del home, la de agregar, y la de editar, esta ultima con el *"/:id"* para que muestre sólo el santo que queramos editar. Para la elmiminación no colocaremos una ruta ya que lo hacemos desde el home a traves ded un *alert*, aunque si quisieramos una ruta aparte sería como la de editar *"eliminar/:id"*. 

*Quitaremos el basename en HashRouter y colocaremos la ruta /santos manualmente.
Tambien añadiremos la Route del Error404.
CrudApi:
```js
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
...            
```
---
# 66. React Router. CRUD API con RUTAS (2/2)
Pasamos el CrudForm a la ruta de agregar y editar. Los conditional render lo enviamos al home dentro de un fragment.
Al momento de enviar a traves del form un nuevo santo, necesitamos volver a la crud table de forma manual para poder ver el resultado, pero para que se automatice esta lógica, utilizaremos useNavigate para que al momento de presionar el botón de 'enviar' naveguemos nuevamente a la crud table y poder ver el nuevo santo.

Para el botón de 'editar' necesitamos irnos hacia el componente **CrudTableRow** dónde haremos uso del *useNavigate*.
Crearemos una constante que reemplaze la función flecha que poseía el onClick en Editar. Dentro esta poseera lo que previamente ejecutaba el *onClick* y ademas navegaremos hacia la ruta de ``"santos/editar/${id}"`` que previamente ya nuestro CrudTableRow recibe a través de la *prop* **el**.
CrudApi:
```js
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
                    <Route path="/santos" element={
                        <>
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
                    }>

                    </Route>
                    <Route
                        path="/santos/agregar"
                        element={
                            <CrudForm
                                createData={createData}
                                updateData={updateData}
                                dataToEdit={dataToEdit}
                                setDataToEdit={setDataToEdit}
                            />}
                    />
                    <Route
                        path="/santos/editar/:id"
                        element={
                            <CrudForm
                                createData={createData}
                                updateData={updateData}
                                dataToEdit={dataToEdit}
                                setDataToEdit={setDataToEdit}
                            />}
                    />
                    <Route path="*" element={<Error404 />} />
                </Routes>
            </HashRouter>

        </>
    )
```
CrudTableRow:
```js
 let navigate = useNavigate()

    const handleEdit = () => {
        setDataToEdit(el)
        navigate(`/santos/editar/${id}`)
    }

    return (
        <>
            <tr>
                <td>{name}</td>
                <td>{constellation}</td>
                <td>
                    <button onClick={handleEdit}>Editar</button>
...
```
---
# 67. React Router. Buscador Canciones con RUTAS y local Storage (1/5)
Añadiremos al SongSearch los componentes de React Router para crear la estructura de navegación en el buscador de canciones. 
```js
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
```
---
# 68. React Router. Buscador Canciones con RUTAS y local Storage (2/5)
Necestiamos una vde para las canciones, con su valor de estado inicial dinámico, obteniendo así las canciones si es que poseemos guardadas, sinó recuperaremos un arreglo vacío.
```js
let mySongsInit = JSON.parse(localStorage.getItem("mySongs")) || []

const SongSearch = () => {
    ....
    const [mySongs, setMySongs] = useState(mySongsInit)
```
Ahora bien, por cada busqueda que hagamos tenemos que establecer al valor mySongs el valor que obtenemos de la vde respectivamente. Esto lo haremos en el useEffect cada vez que se ejecute al finalizar la petición.
```js
localStorage.setItem("mySongs",JSON.stringify(mySongs))
```
A jon le aparece un warning sobre la vde mySongs, diciendo que al useEffect le falta esa dependencia, y lo soluciona colocando la vde en la dependencia del useEffect `[search,mySongs]`. A mi no me saltó ese warning pero igual incluyo la dependencia al igual que Jon. 

El único evento que poseemos es el handleSearch que es la acción de solicitar la petición y buscar... pero como más adelante crearemos una tabla dónde iremos salvando las canciones favoritas, necestiremos una funcionalidad que nos permita guardar la canción y almacenarla en el localStorage. También necesitamos la funcionalidad de poder eliminar alguna canción de nuestra tabla.
```js
const handleSaveSong = () => {}
const handleDeleteSong = (id) => {}
```
Ahora bien, quien va a desencadenar el evento de salvar la canción? El formulario, a través de un nuevo botón que se encargue de ejectura nuestro manejador. `<SongForm handleSearch={handleSearch} handleSaveSong={handleSaveSong}/>` Necesitamos pasarle el manejador como *prop*.

Ahora en SongForm destructuramos nuestro nuevo manejador y creamos el nuevo input que guarde las canciones favs.
```js
const SongForm = ({ handleSearch, handleSaveSong }) => {
    ...
    <input type="button" onClick={handleSaveSong} value="Añadir a Favoritos" />
```
El botón de añadir a favoritos debería estar deshabilitado a no ser que ya haya una búsqueda. Para controlar el estado de enabled o disabled necesitaremos una vde que comience en true y luego un conditional render en la prop disabled.
```js
const [isDisabled, setIsDisabled] = useState(true)
...
<input ... value="Añadir a Favoritos" disabled={isDisabled && "disabled"}/>
```
¿Y en qué momento debería habilitarse el botón? Luego de la búsqueda, justamente despues del loader previo a mostrar en la UI la canción (aunque Jon lo hace previo al loader). Esto lo hariamos en el handleSubmit al final del todo luego de setear el formulario a sus valores iniciales. También tenemos el problema de que si queremos realziar una nueva búsqueda y enviamos el formulario incompleto, ahí debería deshabilitarse el botón de añadir a favoritos.
```js
...
const handleSubmit = (e) => {
        e.preventDefault();

        if(!form.artist || !form.song){
            alert("Datos incompletos")
            setIsDisabled(true)
            return;
        }

        handleSearch(form)
        setForm(initialForm)
        setIsDisabled(false)
    }       
```
---
# 69. React Router. Buscador Canciones con RUTAS y local Storage (3/5)
Creamos el componente **SongTable** con *rafce*, esta devolvera un *thead* con la columna de Artista, Canción y Acciones, ademas del tbody que se encargara de hacer un mapeo de las canciones, y destructurariamos como props las canciones en *mySongs* y el evento de eliminar las canciones para la acción de eliminar con *hanldeDeleteSong*. En el mapeo de la prop *mySongs* haremos un conditional render preguntandonos si la longitud de la prop mySongs es 0 o nó, ademas de ésta recibir los *el* y *index* cómo llave para cada una de las canciones, y para cada uno de los *el* llamaremos el componente **SongTableRow** con la prop *key* con index. 

Luego crearemos el componente **SongTableRow** con *rafce* que es el qué se encargara de recibir todo el contenido, y devolvera la imagen del artista, el nombre de él y de la canción, y los botones de *Ver* y *Eliminar*.

Reemplazamos el *h2* Tabla de canciones que teníamos en **SongSearch** por el componente **SongTable**
Añadiremos como props adicionales al componente SongTableRow *el*, *id* y la función *handleDeleteSong*, y las destructuramos para hacer uso de ellas. Ahora para la función del botón *Ver* haremos uso del *useNavigate* para dirigirnos a la cancion con el *id* correspondiente, y para el botón de eliminar ejecutaremos en una función flecha el manejador *handleDeleteSong* pasando así el *id*.
Luego en **SongSearch**, en la función handleDeleteSong colocaremos un confirm.

SongSearch:
```js
...
const handleDeleteSong = (id) => {
        confirm(`Desea eliminar la canción con el id: ${id}`)
    }
...
<SongTable mySongs={mySongs} handleDeleteSong={handleDeleteSong}/>
...
```
SongTable:
```js
import React from 'react'
import SongTableRow from './SongTableRow'

const SongTable = ({ mySongs, handleDeleteSong }) => {
    return (
        <div>

            <h3>Mis canciones favortias</h3>
            <table>
                <thead>
                    <tr>
                        <th colSpan={2}>Artista</th>
                        <th>Canción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mySongs.length > 0 ? (
                        mySongs.map((el, index) =>
                            <SongTableRow
                                key={index}
                                el={el}
                                id={index}
                                handleDeleteSong={handleDeleteSong}
                            />)
                    ) : (
                        <tr><td colSpan="4">Sin Canciones</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default SongTable
```
SongTableRow:
```js
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
```
---
# 70. React Router. Buscador Canciones con RUTAS y local Storage (4/5)
Comenzaremos programando la funcion de guardar la canción y eliminar la canción. En el primer método crearemos un objeto que contenga las vde que ya existen en el SongSearch, que són *search, lyric, bio*. Luego utilizar la función actualizadora setMySongs para almacenar las canciones. Recordar que el estado en react es asíncrono, y como este es un arreglo debemos de recibir la vde en la funcion y mezclarla con el nuevo objeto que creamos utilizando spread operator, y adicionalmente actualizaremos la búsqueda a *null* que es su valor por defecto.

Ahora viendo que todo funciona correctamente, destructuraremos las props bio y search de nuestro *el* para obtener asi el nombre de la canción y el nombre del artista, tambien obtendremos la imagen del artista creando un avatar. 

También crearemos la var *avatarStyles* para darle altura y anchura a la imagen del artista.

Ahora crearemos una nueva página en la carpeta page llamada SongPage, para mostrar así la página de x canción según su *id*, y esta devolvera el componente SongDetails que era el componente que mostraba los detalles de la canción, y pasaremos las props de *search, lyric, bio*.

Ahora en **SongSearch**, en el componente Route de canciohnes/id, cargaremos el componente (o mas bien la PAGE) **SongPage**, pasandole la prop *mySongs*.
En SongPage destructuramos mySongs para poder hacer uso de la misma, y ademas hacemos uso del useParams para destructurar el *id*. También crearemos la variable currentSong para asi óder guardar la información de la canción que buscamos recientemente a través del *id* y así poder hacer uso de la destructuración y obtener la busqueda, letras y biografía y pasarlas como props al componente **SongDetails**.

SongSearch:
```js
const handleDeleteSong = (id) => {
        let isDelete =  window.confirm(`Desea eliminar la canción con el id: ${id}`)
        // confirm(`Desea eliminar la canción con el id: ${id}`)
        if (isDelete) {
            let songs = mySongs.filter((el,index) => index !== id);
            setMySongs(songs)
            localStorage.setItem("mySongs",JSON.stringify(songs));
        }
    }
...
<Route path='/canciones/:id' element={<SongPage mySongs={mySongs}/>}/>
```
SongTableRow:
```js
...
    let {bio, search} = el
    let avatar = bio.artists[0].strArtistThumb
    let avatarStyles = {
        width: "auto",
        height: "40px"
    }

    let navigate = useNavigate()

    return (
        <tr>
            <td><img style={avatarStyles} src={avatar} alt={search.artist} /></td>
...            
```
SongPage:
```js
import React from 'react'
import { useParams } from 'react-router-dom'
import SongDetails from '../components/SongDetails'

const SongPage = ({ mySongs }) => {
    let {id} = useParams();
    // console.log(id, mySongs, mySongs[id])
    let currentSong = mySongs[id]
    let {search,lyric,bio} = currentSong
    
    return (
        <SongDetails search={search} lyric={lyric} bio={bio} />
    )
}

export default SongPage
```
---
# 71. React Router. Buscador Canciones con RUTAS y local Storage (5/5)
No se si lo han notado, pero la aplicación no guardaba alguna que otra canción en el localStorage ya que no habíamos implementado esa programación en la función de *handleSaveSong*. Copiamos y pegamos el seteo del item de localStorage que poseemos en handleDeleteSongs ya que cumple la función de setear las canciones convirtiendolas en cadena de texto. Luego de eso creamos la variable songs y le pasamos el array que poseemos en *handleSaveSong*, y luego eliminamos la arrow function que poseía la función actualizadora **setMySongs** para así pasarle sólo la variable *songs*.
```js
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
```
---

