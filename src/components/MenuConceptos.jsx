import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const MenuConceptos = () => {
  return (
    <nav>
      <ol>
        <li>
          <span>Enlaces HTML (no recomendado): </span>
          <a href="/">Home</a>
          <a href="/acerca">Acerca</a>
          <a href="/contacto">Contacto</a>
        </li>
        <li>
          <span>Componente Link: </span>
          <Link to="/">Home</Link>
          <Link to="/acerca">Acerca</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/no-existe">Error 404</Link>
        </li>
        <li>
          <span>Componente NavLink: </span>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/acerca">Acerca</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
        </li>
        <li>
          <span>Parámetros: </span>
          <Link to="/usuario/jonmircha">JonMircha</Link>
          <Link to="/usuario/kenai">Kenai</Link>
        </li>
        <li>
          <span>Parámetros de consulta: </span>
          <Link to="/productos">Productos</Link>
        </li>
        <li>
          <span>Redirecciones: </span>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <span>Redireciones Privadas: </span>
          <Link to="login">Login</Link>
          <Link to="dashboard">Dashboard</Link>
        </li>
      </ol>
    </nav>
  )
}

export default MenuConceptos