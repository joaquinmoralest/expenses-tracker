import '../styles/globals.css'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Provider } from 'react-redux'
import store from '../redux/store'

const firebaseConfig = {
  apiKey: 'AIzaSyDKQa-sQRAaIZD5SWf7Ksez57nBviqbpzs',
  authDomain: 'expenses-tracker-e3898.firebaseapp.com',
  projectId: 'expenses-tracker-e3898',
  storageBucket: 'expenses-tracker-e3898.appspot.com',
  messagingSenderId: '361822931921',
  appId: '1:361822931921:web:02d9ed462ad058e18b2ef0',
  measurementId: 'G-R6M0559JM9'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

function MyApp ({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
