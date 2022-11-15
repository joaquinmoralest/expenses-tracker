import '../styles/Budget.css'
import Button from './Button/Button'
import Input from './Input/Input'
import { CATEGORIES as categories, CATEGORIES_COLORS as categoriesColors } from '../utils/constants'
import { useState } from 'react'
import ListItem from './ListItem/ListItem'
import _ from 'lodash'
import 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

function Budget () {
  const [budgetItem, setBudgetItem] = useState([])
  const [amount, setAmount] = useState('')
  const [concept, setConcept] = useState('')
  const [category, setCategory] = useState('')
  // const [categoriesFromBudget, setCategoriesFromBudget] = useState([])
  // const [categoriesFromBudgetFiltred, setCategoriesFromBudgetFiltred] = useState([])
  const [vivienda, setVivienda] = useState(0)
  const [servicios, setServicios] = useState(0)
  const [educacion, setEducacion] = useState(0)
  const [higiene, setHigiene] = useState(0)
  const [transporte, setTransporte] = useState(0)
  const [alimentacion, setAlimentacion] = useState(0)
  const [personal, setPersonal] = useState(0)
  const [ahorro, setAhorro] = useState(0)
  const [recreacion, setRecreacion] = useState(0)
  const [otros, setOtros] = useState(0)
  const reportData = {
    labels: [
      'Vivienda',
      'Servicios',
      'Educacion',
      'Higiene',
      'Transporte',
      'Alimentacion',
      'Personal',
      'Ahorro',
      'Recreacion',
      'Otros'
    ],
    datasets: [{
      label: 'Budget dataset',
      data: [
        vivienda,
        servicios,
        educacion,
        higiene,
        transporte,
        alimentacion,
        personal,
        ahorro,
        recreacion,
        otros
      ],
      backgroundColor:
        categoriesColors.map((category) => category),
      hoverOffset: categories.length
    }]
  }

  // Extrae las categorias de cada item del presupuesto
  // useEffect(() => {
  //   const categoryItem = budgetItem.map((item) => {
  //     return item.category
  //   })

  //   setCategoriesFromBudget([...categoryItem])
  // }, [budgetItem])

  // Filtra las categorias para eliminar duplicados
  // useEffect(() => {
  //   const dataArr = new Set(categoriesFromBudget)
  //   setCategoriesFromBudgetFiltred([...dataArr])
  // }, [budgetItem])

  function handleSubmit (e) {
    e.preventDefault()

    const newBudgetItenToAdd = {
      id: Date.now(),
      amount: Number(amount),
      concept,
      category
    }

    setBudgetItem([...budgetItem, newBudgetItenToAdd])
    if (category === 'Vivienda') {
      const newAmount = Number(amount)
      setVivienda(vivienda + newAmount)
    } else if (category === 'Servicios') {
      const newAmount = Number(amount)
      setServicios(servicios + newAmount)
    } else if (category === 'Educacion') {
      const newAmount = Number(amount)
      setEducacion(educacion + newAmount)
    } else if (category === 'Higiene') {
      const newAmount = Number(amount)
      setHigiene(higiene + newAmount)
    } else if (category === 'Transporte') {
      const newAmount = Number(amount)
      setTransporte(transporte + newAmount)
    } else if (category === 'Alimentacion') {
      const newAmount = Number(amount)
      setAlimentacion(alimentacion + newAmount)
    } else if (category === 'Personal') {
      const newAmount = Number(amount)
      setPersonal(personal + newAmount)
    } else if (category === 'Ahorro') {
      const newAmount = Number(amount)
      setAhorro(ahorro + newAmount)
    } else if (category === 'Recreacion') {
      const newAmount = Number(amount)
      setRecreacion(recreacion + newAmount)
    } else if (category === 'Otros') {
      const newAmount = Number(amount)
      setOtros(otros + newAmount)
    }

    setAmount('')
    setConcept('')
  }

  function handleDeleteClick (itemToDelete) {
    const newBudgetItem = budgetItem.filter((item) => item.id !== itemToDelete.id)

    if (itemToDelete.category === 'Vivienda') {
      const amount = itemToDelete.amount
      setVivienda(vivienda - amount)
    } else if (itemToDelete.category === 'Servicios') {
      setServicios(0)
      const amount = itemToDelete.amount
      setServicios(servicios - amount)
    } else if (itemToDelete.category === 'Educacion') {
      setEducacion(0)
      const amount = itemToDelete.amount
      setEducacion(educacion - amount)
    } else if (itemToDelete.category === 'Higiene') {
      setHigiene(0)
      const amount = itemToDelete.amount
      setHigiene(higiene - amount)
    } else if (itemToDelete.category === 'Transporte') {
      setTransporte(0)
      const amount = itemToDelete.amount
      setTransporte(transporte - amount)
    } else if (itemToDelete.category === 'Alimentacion') {
      setAlimentacion(0)
      const amount = itemToDelete.amount
      setAlimentacion(alimentacion - amount)
    } else if (itemToDelete.category === 'Personal') {
      setPersonal(0)
      const amount = itemToDelete.amount
      setPersonal(personal - amount)
    } else if (itemToDelete.category === 'Ahorro') {
      setAhorro(0)
      const amount = itemToDelete.amount
      setAhorro(ahorro - amount)
    } else if (itemToDelete.category === 'Recreacion') {
      setRecreacion(0)
      const amount = itemToDelete.amount
      setRecreacion(recreacion - amount)
    } else if (itemToDelete.category === 'Otros') {
      setOtros(0)
      const amount = itemToDelete.amount
      setOtros(otros - amount)
    }

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
                    <option key={category.name} value={category.name}>{category.name}</option>
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
                _.orderBy(budgetItem, ['category', 'amount'], ['asc', 'desc'])
                  .map((item) => {
                    return (
                      <li key={item.id}>
                        <ListItem
                          onClick={() => handleDeleteClick(item)}
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
          <div className='pie-chart'>
            <Chart
              type='pie'
              data={reportData}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Budget
