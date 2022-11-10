import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input/Input'
import { setUserInfo } from '../redux/appSlice'
import '../styles/Register.css'
import { loginGoogle, registerAccount } from '../utils/auth'
import { addIncomeToFirestore, addUserInfoToFirestore } from '../utils/service'

function Register () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function handleSubmit (e) {
    e.preventDefault()
    const userData = await registerAccount(email, password)
      .then(user => {
        const userData = {
          uid: user.uid,
          first_name: firstName,
          last_name: lastName,
          email,
          signin_method: 'email'
        }
        return userData
      })

    await addUserInfoToFirestore(userData, userData.uid)
    await addIncomeToFirestore(userData.uid, {
      amount: 0,
      date: new Date().toISOString().slice(0, 10)
    })
    dispatch(setUserInfo(userData))
    navigate('/')
  }

  async function registerWithGoogle () {
    const userData = await loginGoogle()
      .then((user) => {
        const { uid, name, email } = user

        return {
          uid,
          name,
          email
        }
      })

    await addUserInfoToFirestore(userData, userData.uid)
    await addIncomeToFirestore(userData.uid, {
      amount: 0,
      date: new Date().toISOString().slice(0, 10)
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
          <form className='form-register' onSubmit={handleSubmit}>
            <Input
              onChange={(e) => setFirstName(e.target.value)}
              type='text'
              placeholder='Nombre'
              className='mb-2'
            />
            <Input
              onChange={(e) => setLastName(e.target.value)}
              type='text'
              placeholder='Apellido'
              className='mb-2'
            />
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
            <button className='btn-register'>Crear cuenta</button>
          </form>
          <button className='btn-register' onClick={registerWithGoogle}>Signin with Google</button>
        </div>
      </div>
    </>
  )
}

export default Register
