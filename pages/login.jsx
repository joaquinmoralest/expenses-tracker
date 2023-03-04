import { useState } from 'react'
import Input from '../components/Input/Input'
import { loginGoogle, LoginWithEmail } from '../utils/auth'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../redux/appSlice'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'

function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  async function handleSubmit (e) {
    e.preventDefault()
    await LoginWithEmail(email, password)

    router.push('/')
  }

  async function login () {
    const userData = await loginGoogle()
      .then((user) => {
        const { uid, name, email } = user

        return {
          uid,
          name,
          email
        }
      })

    dispatch(setUserInfo(userData))
    router.push('/')
  }

  return (
    <Layout>
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
    </Layout>
  )
}

export default Login
