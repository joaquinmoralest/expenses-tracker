import { useState } from 'react'
import Input from '../components/Input/Input'
import '../styles/Login.css'
import { loginGoogle, LoginWithEmail, registerAccount } from '../utils'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit() {
    LoginWithEmail(email, password)
  }

  return(
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
        <button className='btn-login' onClick={loginGoogle}>Login with Google</button>
      </div>
    </div>
  )
}

export default Login