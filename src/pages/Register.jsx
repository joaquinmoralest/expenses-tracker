import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input/Input'
import Navbar from '../components/Navbar/Navbar'
import { setUserInfo } from '../redux/appSlice'
import '../styles/Register.css'
import { getUserId, loginGoogle, registerAccount } from '../utils/auth'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleSubmit() {
    registerAccount(email, password)

    const user = {
      uid: getUserId(),
      signinMethod: 'email',
      firstName: '',
      lastName: '',
    }

    dispatch(setUserInfo(user))
    navigate('/')
  }

  function register() {
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
          <form className='form-register' onSubmit={handleSubmit}>
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
            <button className='btn-register'>Crear cuenta</button>
          </form>
          <button className='btn-register' onClick={register}>Signin with Google</button>
        </div>
      </div>
    </>
  )
}

export default Register