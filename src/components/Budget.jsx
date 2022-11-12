import '../styles/Budget.css'
import Button from './Button/Button'
import Input from './Input/Input'
import { CATEGORIES as categories } from '../utils/constants'
import { useState } from 'react'
import ListItem from './ListItem/ListItem'

function Budget () {
  const [budgetItem, setBudgetItem] = useState([])
  const [amount, setAmount] = useState('')
  const [concept, setConcept] = useState('')
  const [category, setCategory] = useState('')

  function handleSubmit (e) {
    e.preventDefault()

    const newBudgetItenToAdd = {
      id: Date.now(),
      amount: Number(amount),
      concept,
      category
    }

    setBudgetItem([...budgetItem, newBudgetItenToAdd])

    setAmount('')
    setConcept('')
  }

  function handleDeleteClick (id) {
    const newBudgetItem = budgetItem.filter((item) => item.id !== id)

    setBudgetItem(newBudgetItem)
  }

  function handleAmount (e) {
    setAmount(e.target.value)
  }

  function handleConcept (e) {
    setConcept(e.target.value)
  }

  function handleCategory (e) {
    setCategory(e.target.value)
  }

  return (
    <div className="budget-page">
      <div className='budget-title'>
        <h2>Presupuesto</h2>
      </div>
      <div className="budget-container">
        <div className='budget-intro txt-center'>
          <p className='mb-1'>Una de las partes principales de todo sistema financiero saludable es la elaboracion de un presupuesto.</p>
          <p>Utiliza esta herramienta para fijar los gastos que tienes mensualmente y asi ordenar tus finanzas a medida que gastas segun lo planificado.</p>
        </div>
      </div>

      <main className="budget-container">
        <div className='budget-planning txt-center'>
          <h3>Gastos mensuales</h3>
          <form className='budget-form' onSubmit={handleSubmit}>
            <Input
              onChange={handleAmount}
              name='expenseAmount'
              className='w-5'
              placeholder='Monto'
              type='number'
              value={amount}
              required
              disabled
            />
            <Input
              onChange={handleConcept}
              name='expenseConcept'
              placeholder='Concepto'
              type='text'
              value={concept}
              required
            />
            <select
              className='select-category'
              onChange={handleCategory}
              name="categories"
              id="categories"
              required
            >
              {
                categories.map((category) => {
                  return (
                    <option key={category} value={category}>{category}</option>
                  )
                })
              }
            </select>
            <Button
              type='add'
            />
          </form>
          <div className='resume-budget'>
            <ul>
              {
                budgetItem.map((item) => {
                  return (
                    <li key={item.id}>
                      <ListItem
                        onClick={() => handleDeleteClick(item.id)}
                        amount={item.amount}
                        concept={item.concept}
                        category={item.category}
                      />
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
        <div className='budget-report txt-center'>
          <h3>Reporte</h3>
        </div>
      </main>
    </div>
  )
}

export default Budget
