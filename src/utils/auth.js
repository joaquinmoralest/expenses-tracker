import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth'
import { auth } from '../App'

export function getUserInfo () {
  const currentUser = auth.currentUser

  return currentUser
}

function mapUserLogged (user) {
  const { uid } = user
  const { displayName } = user
  const { email } = user

  return {
    uid,
    name: displayName,
    email
  }
}

export function authStateChanged (onChange) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const formatedUser = mapUserLogged(user)
      onChange(formatedUser)
    }
  })
}

export async function registerAccount (email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      window.localStorage.setItem('user_temp_data', JSON.stringify(user))
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(`Error code ${errorCode}: ${errorMessage}`)
    })
}

export async function LoginWithEmail (email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      window.localStorage.setItem('user_temp_data', JSON.stringify(user))
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(`Error code ${errorCode}: ${errorMessage}`)
    })
}

export async function loginGoogle () {
  const provider = new GoogleAuthProvider()

  const userData = await setPersistence(auth, browserLocalPersistence)
    .then(async () => {
      const userData = await signInWithPopup(auth, provider)
        .then((user) => {
          return mapUserLogged(user)
        })
      return userData
    })
    .catch((error) => {
      console.log(`setPersistence error, ${error}`)
    })

  return userData
}

export function signOutAccount () {
  signOut(auth).then(() => {
    console.log('Saliste de la sesion')
  }).catch((error) => {
    // An error happened.
    console.log(error)
  })
}
