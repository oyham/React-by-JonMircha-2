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
#### ELEMENT: se encarga de renderizar tal componente o devolver jsx.# React-by-JonMircha-2
