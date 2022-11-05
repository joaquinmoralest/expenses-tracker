import { useEffect } from 'react'
import { useState } from 'react'
import './styles/App.css'
import Button from './components/Button/Button'
import ListItem from './components/ListItem/ListItem'
import ProgressBar from './components/ProgressBar'
import { formatAmount } from './utils/utils'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Input from './components/Input/Input'
import Navbar from './components/Navbar/Navbar'
import { addExpenseToFirestore, getExpensesFromFirestore } from './utils/service'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo, updateExpenses } from './redux/appSlice'
import { getUserId } from './utils/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDKQa-sQRAaIZD5SWf7Ksez57nBviqbpzs",
  authDomain: "expenses-tracker-e3898.firebaseapp.com",
  projectId: "expenses-tracker-e3898",
  storageBucket: "expenses-tracker-e3898.appspot.com",
  messagingSenderId: "361822931921",
  appId: "1:361822931921:web:02d9ed462ad058e18b2ef0",
  measurementId: "G-R6M0559JM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

function App() {
  const [remaining, setRemaining] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [expenses, setExpenses] = useState([])
  const [income, setIncome] = useState(0)
  const [newIncome, setNewIncome] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenseConcept, setExpenseConcept] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  const userInfo = useSelector(state => state?.app?.user)
  const expensesArr = useSelector(state => state?.app?.expenses)
  const dispatch = useDispatch()

  useEffect(() => calculateRemaining(), [])

  useEffect(() => {
    const uid = getUserId()
    const user = {
      uid: uid ? uid : 'Z',
      signinMethod: 'anonimously',
      firstName: '',
      lastName: '',
    }
    dispatch(setUserInfo(user))
  }, [])

  useEffect(() => {
    const getArrFirestore = async () => {
      try {
        let expensesFirestore = await getExpensesFromFirestore(userInfo?.uid)

        dispatch(updateExpenses(expensesFirestore))
      } catch(e) {
        console.log(`getExpensesFromFirestore failed, ${e}`)
      }
    }
    
    if (![undefined].includes(userInfo?.uid)) {
      getArrFirestore()
    }
  }, [])

  useEffect(() => {
    if (screen.width <= 420) {
      setIsMobile(true)
    }
  }, [])

  function calculateRemaining() {
    let totalExpenses = 0

    expenses.forEach((expense) => {
      totalExpenses = totalExpenses + expense.amount
    })

    let newRemaining = income - totalExpenses
    let newPercentage = (newRemaining / income) * 100

    setRemaining(newRemaining)
    setPercentage(newPercentage.toFixed(0))
  }

  function addExpenses(e) {
    e.preventDefault()

    const newExpenseToAdd = {
      date: new Date().toISOString().slice(0, 10),
      amount: Number(expenseAmount),
      concept: expenseConcept,
    }

    addExpenseToFirestore(userInfo?.uid, newExpenseToAdd)

    setExpenses([...expenses, newExpenseToAdd])

    // Local Storage
    // window.localStorage.setItem(`Expense ${newExpenseToAdd.id}`, JSON.stringify(newExpenseToAdd))

    calculateRemaining()
    setExpenseAmount('')
    setExpenseConcept('')
  }

  function addIncome(e) {
    e.preventDefault()

    setIncome(newIncome)
    setRemaining(newIncome)
    calculateRemaining()
    setNewIncome('')
  }

  function handleExpenseAmount(e) {
    setExpenseAmount(e.target.value)
  }

  function handleExpenseConcept(e) {
    setExpenseConcept(e.target.value)
  }

  function handleIncome(e) {
    setNewIncome(e.target.value)
  }

  return (
    <div className="App">
      <Navbar />
      <div className="container">

        <div className='title'>
          {
            !isMobile ? (
              <>
                <h1>Seguimiento de gastos</h1>
                <h3>Ordena tus finanzas partiendo por conocer tus habitos</h3>
              </>
            ) : (
              <>
                <h2>Seguimiento de gastos</h2>
                <h4>Ordena tus finanzas partiendo por conocer tus habitos</h4>
              </>
            )
          }
        </div>
        
        <main className='main-content'>
          <section className='expenses'>
            <h4 className='txt-center'>Gastos</h4>
            <form 
              className='form' 
              onSubmit={addExpenses}>
              <Input 
                onChange={handleExpenseAmount} 
                name='expenseAmount' 
                className='w-5' 
                placeholder='Monto' 
                type='number' 
                value={expenseAmount}
                required
              />
              <Input 
                onChange={handleExpenseConcept} 
                name='expenseConcept' 
                placeholder='Concepto' 
                type="text" 
                value={expenseConcept}
                required
              />
              <Button 
                type='add'
              />
            </form>

            <div className='resume-list'>
              {
                expenses.map((expensesArr) => {
                  return(
                    <ListItem 
                      key={expensesArr.id}
                      amount={expensesArr.amount}
                      concept={expensesArr.concept}
                      date={expensesArr.date}
                    />
                  )
                })
              }
            </div>
          </section>
          {console.log(expensesArr)}

          <section className='budget'>
            <h4 className='txt-center'>Ingresos</h4>
            <form className='form' onSubmit={addIncome}>
              <Input 
                onChange={handleIncome} 
                name='incomeAmount' 
                placeholder='Tu ingreso total para este mes...' 
                type="number" 
                value={newIncome} 
              />
              <Button 
                type='add'
              />
            </form>
            <h4 className='txt-center mt-3'>Presupuesto</h4>
            <ProgressBar 
              remaining={percentage}
            />
            <h5 className='txt-center'>{formatAmount(remaining)} de {formatAmount(income)}</h5>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
