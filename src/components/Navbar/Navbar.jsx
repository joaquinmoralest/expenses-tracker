import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav>
      <div className='nav-logo'>
        <img src="" alt="" />
      </div>
      <Link to={`login`}>Iniciar sesión</Link>
      <Link to={`register`}>Crear cuenta</Link>
    </nav>
  )
}

export default Navbar