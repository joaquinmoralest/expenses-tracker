import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUserInfo } from '../../redux/appSlice'
import { signOutAccount } from '../../utils/auth'
import './Navbar.css'

function Navbar() {
  const userInfo = useSelector(state => state?.app?.user)
  const dispatch = useDispatch()

  function handleClick() {
    signOutAccount()

    const user = {
      uid: 'Z',
      signinMethod: 'anonimously',
      firstName: '',
      lastName: '',
    }

    dispatch(setUserInfo(user))
  }

  return (
    <nav className='navbar'>
      <div className='nav-logo'>
        <img src="" alt="" />
      </div>
      <div className='nav-links'>
        <Link to={`/`}>Inicio</Link>
        {
          userInfo?.uid === 'Z' ? (
            <>
              <Link to={`/login`}>Iniciar sesión</Link>
              <Link to={`/register`}>Crear cuenta</Link>
            </>
          ) : (
            <Link onClick={handleClick}>Cerrar sesión</Link>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar