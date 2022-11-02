import { 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore"
import { auth, db } from "./App";

const provider = new GoogleAuthProvider()

export function formatAmount(amount) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount)
}

export async function addExpense(amount, concept, date) {
  try {
    const docRef = await addDoc(collection(db, "expenses"), {
      amount,
      concept,
      date,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getExpenses() {
  const expenses = await getDocs(collection(db, "expenses"));

  return expenses
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
      const user = result.user;
      window.localStorage.setItem('user_temp_data', JSON.stringify(user))
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

// export function signOut() {
//   signOut(auth).then(() => {
//     // Sign-out successful.
//   }).catch((error) => {
//     // An error happened.
//     console.log(error)
//   });
// }