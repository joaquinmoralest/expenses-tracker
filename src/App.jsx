import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import ProgressBar from './components/ProgressBar'

function App() {
  const [remaining, setRemaining] = useState(0)
  const [percentage, setPercentage] = useState(100)
  const [expenses, setExpenses] = useState([])
  const [income, setIncome] = useState(0)
  const [newIncome, setNewIncome] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenseConcept, setExpenseConcept] = useState('')

  useEffect(() => calculateRemaining())

  function formatAmount(amount) {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount)
  }

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

  function addExpense(e) {
    e.preventDefault()

    const newExpenseToAdd = {
      id: expenses.length + 1,
      date: new Date().toISOString().slice(0, 10),
      amount: Number(expenseAmount),
      concept: expenseConcept,
    }

    setExpenses([...expenses, newExpenseToAdd])
    calculateRemaining()
    setExpenseAmount('')
    setExpenseConcept('')
  }

  function addIncome(e) {
    e.preventDefault()

    setIncome(newIncome)
    setRemaining(newIncome)
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
        <h1>Seguimiento de gastos</h1>
        <h3>Ordena tus finanzas partiendo por conocer tus habitos</h3>
      </div>
      
      <main className='main-content'>
        <section className='expenses'>
          <h4 className='txt-center'>Gastos</h4>
          <form className='form' onSubmit={addExpense}>
            <input 
              onChange={handleExpenseAmount} 
              name='expenseAmount' 
              className='input amount' 
              placeholder='Monto' 
              type='number' 
              value={expenseAmount}
            />
            <input 
              onChange={handleExpenseConcept} 
              name='expenseConcept' 
              className='input concept' 
              placeholder='Concepto' 
              type="text" 
              value={expenseConcept}
            />
            <button className='btn-add'>
              <span className="material-symbols-outlined">
                add
              </span>
            </button>
          </form>

          <div className='resume-list'>
            {
              expenses.map((expense) => {
                return(
                  <div className='resume-item' key={expense.id}>
                    <div className='resume-amount'>
                      <p>{formatAmount(expense.amount)}</p>
                    </div>
                    <div className='resume-concept'>
                      <p>{expense.concept}</p>
                    </div>
                    <div className='resume-date'>
                      <p>{expense.date}</p>
                    </div>
                  </div>
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
            <button className='btn-add'>
              <span className="material-symbols-outlined">
                add
              </span>
            </button>
          </form>
          <h4 className='txt-center mt-3'>Presupuesto</h4>
          <ProgressBar 
            // bgColor='full'
            remaining={percentage}
          />
          <h5 className='txt-center'>{formatAmount(remaining)} de {formatAmount(income)}</h5>
        </section>
      </main>
    </div>
  )
}

export default App
