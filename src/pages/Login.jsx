import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input/Input'
import { getUserId, loginGoogle, LoginWithEmail } from '../utils/auth'
import '../styles/Login.css'
import Navbar from '../components/Navbar/Navbar'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../redux/appSlice'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleSubmit() {
    LoginWithEmail(email, password)

    const user = {
      uid: getUserId(),
      signinMethod: 'email',
      firstName: '',
      lastName: '',
    }

    dispatch(setUserInfo(user))
    navigate('/')
  }

  function login() {
    loginGoogle()

    const user = {
      uid: getUserId(),
      signinMethod: 'google',
      firstName: '',
      lastName: '',
    }

    dispatch(setUserInfo(user))
    navigate('/')
  }

  return(
    <>
      <Navbar />
      <div className='login'>
        <div className='login-container'>
          <div className='logo'>
            <img src="" alt="" />
          </div>
          <form className='form-login' onSubmit={handleSubmit}>
            <Input 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              placeholder='Email'
              className='mb-2'
            />
            <Input 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              placeholder='Contraseña'
              className='mb-2'
            />
            <button className='btn-register'>Iniciar sesión</button>
          </form>
          <button className='btn-login' onClick={login}>Login with Google</button>
        </div>
      </div>
    </>
  )
}

export default Login