import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { clearExpenses, clearIncome, clearUserInfo } from '../../redux/appSlice'
import { signOutAccount } from '../../utils/auth'

function Navbar () {
  const userInfo = useSelector(state => state?.app?.user)
  const dispatch = useDispatch()

  function handleClick () {
    signOutAccount()

    dispatch(clearExpenses())
    dispatch(clearIncome())
    dispatch(clearUserInfo())
  }

  return (
    <nav className='navbar'>
      <div className='nav-logo'>
        <img src='' alt='' />
      </div>
      <div className='nav-links'>
        <Link href='/'>Inicio</Link>
        <Link href='/budget'>Presupuesto</Link>
        {
          !userInfo?.uid
            ? (
              <>
                <Link href='/login'>Iniciar sesión</Link>
                <Link href='/register'>Crear cuenta</Link>
              </>
              )
            : (
              <Link onClick={handleClick}>Cerrar sesión</Link>
              )
        }
      </div>
    </nav>
  )
}

export default Navbar
