import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input/Input'
import Navbar from '../components/Navbar/Navbar'
import '../styles/Register.css'
import { loginGoogle, registerAccount } from '../utils/auth'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  function handleSubmit() {
    registerAccount(email, password)
    navigate('/')
  }

  function register() {
    loginGoogle()
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