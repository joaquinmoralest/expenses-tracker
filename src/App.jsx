import { useState } from 'react'
import './App.css'
import ProgressBar from './components/ProgressBar'

function App() {
  const [remaining, setRemainig] = useState(50)
  const [expenses, setExpenses] = useState([])
  const [income, setIncome] = useState(0)
  const [newIncome, setNewIncome] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenseConcept, setExpenseConcept] = useState('')

  function addExpense(e) {
    e.preventDefault()

    const newExpenseToAdd = {
      id: expenses.length + 1,
      date: new Date().toISOString(),
      amount: expenseAmount,
      concept: expenseConcept,
    }

    setExpenses([...expenses, newExpenseToAdd])
    setExpenseAmount('')
    setExpenseConcept('')
  }

  function addIncome(e) {
    e.preventDefault()

    setIncome(newIncome)
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

  console.log(expenses)

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
            remaining={remaining}
          />
          <h5 className='txt-center'>$5000 de ${income}</h5>
        </section>
      </main>
    </div>
  )
}

export default App
