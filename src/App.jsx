import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import Button from './components/Button/Button'
import ListItem from './components/ListItem/ListItem'
import ProgressBar from './components/ProgressBar'
import { addExpense, formatAmount } from './utils'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

function App() {
  const [remaining, setRemaining] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [expenses, setExpenses] = useState([])
  const [income, setIncome] = useState(0)
  const [newIncome, setNewIncome] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenseConcept, setExpenseConcept] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => calculateRemaining(), [])

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
      id: expenses.length + 1,
      date: new Date().toISOString().slice(0, 10),
      amount: Number(expenseAmount),
      concept: expenseConcept,
    }

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
            <input 
              onChange={handleExpenseAmount} 
              name='expenseAmount' 
              className='input amount' 
              placeholder='Monto' 
              type='number' 
              value={expenseAmount}
              required
            />
            <input 
              onChange={handleExpenseConcept} 
              name='expenseConcept' 
              className='input concept' 
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
              expenses.map((expense) => {
                return(
                  <ListItem 
                    key={expense.id}
                    amount={expense.amount}
                    concept={expense.concept}
                    date={expense.date}
                  />
                )
              })
            }
          </div>
        </section>

        <section className='budget'>
          <h4 className='txt-center'>Ingresos</h4>
          <form className='form' onSubmit={addIncome}>
            <input 
              onChange={handleIncome} 
              name='incomeAmount' 
              className='input' 
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
  )
}

export default App
