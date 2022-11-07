import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from './Input/Input'
import { getUserInfo, loginGoogle, LoginWithEmail } from '../utils/auth'
import '../styles/Login.css'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../redux/appSlice'

function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    setCurrentUser(getUserInfo())
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleSubmit () {
    LoginWithEmail(email, password)

    const user = {
      uid: currentUser.uid,
      signinMethod: 'email',
      name: '',
      email: ''
    }

    dispatch(setUserInfo(user))
    navigate('/')
  }

  async function login () {
    const userData = await loginGoogle()
      .then((user) => {
        const { uid, name, email } = user

        return {
          uid,
          signinMethod: 'google',
          name,
          email
        }
      })

    dispatch(setUserInfo(userData))
    navigate('/')
  }

  return (
    <>
      <div className='login'>
        <div className='login-container'>
          <div className='logo'>
            <img src='' alt='' />
          </div>
          <form className='form-login' onSubmit={handleSubmit}>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='Email'
              className='mb-2'
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type='password'
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
