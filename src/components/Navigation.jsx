import React from 'react'
import { Link } from 'react-router-dom'

function Navigation() {
  return (
    <div>Navigation
    <Link to={"/"}> Inicio</Link>
    <Link to={"/users"}> Inicio</Link>
    </div>  
  )
}

export default Navigation