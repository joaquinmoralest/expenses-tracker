import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'

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
export const analytics = getAnalytics(app)
export const db = getFirestore(app)
export const auth = getAuth(app)

function App () {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/register'
          element={<Register />}
        />
      </Routes>
    </div>
  )
}

export default App
