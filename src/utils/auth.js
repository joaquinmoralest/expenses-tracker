import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import { auth } from "../App";

const provider = new GoogleAuthProvider()

export function getUserId() {
  const user = auth.currentUser
  const uid = user?.uid

  return uid
}

export function registerAccount(email, password) {
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

export function LoginWithEmail(email, password) {
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

export function loginGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user
      
      return user
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    // The email of the user's account used.
      const email = error.customData.email;
    // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(`Error code ${errorCode}: ${errorMessage}`)
    })
}

export function signOutAccount() {
  signOut(auth).then(() => {
    console.log('Saliste de la sesion')
  }).catch((error) => {
    // An error happened.
    console.log(error)
  });
}