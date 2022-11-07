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

export function authStateChanged () {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  })
}

export function registerAccount (email, password) {
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

export function LoginWithEmail (email, password) {
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
          const { uid } = user.user
          const { displayName } = user.user
          const { email } = user.user

          return {
            uid,
            name: displayName,
            email
          }
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
