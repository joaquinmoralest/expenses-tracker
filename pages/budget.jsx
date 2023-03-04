import Button from '../components/Button/Button'
import Input from '../components/Input/Input'
import { CATEGORIES as categories, CATEGORIES_COLORS as categoriesColors } from '../utils/constants'
import { useState, useEffect } from 'react'
import ListItem from '../components/ListItem/ListItem'
import _ from 'lodash'
import 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { addBudgetItemsToFirestore, deleteBudgetItemFromFirestore, getBudgetItemsFromFirestore } from '../utils/service'
import { setUserInfo, updateBudgetItems } from '../redux/appSlice'
import { authStateChanged } from '../utils/auth'
import Layout from '../components/Layout'

function Budget () {
  const [budgetItem, setBudgetItem] = useState([])
  const [amount, setAmount] = useState('')
  const [concept, setConcept] = useState('')
  const [category, setCategory] = useState('')
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
  const userInfo = useSelector(state => state?.app?.user)
  const budgetItemArr = useSelector(state => state?.app?.budget?.budgetItems)
  const budgetItemArrRef = budgetItemArr[0]
  const dispatch = useDispatch()
  const reportDataAnonymous = {
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

  useEffect(() => {
    authStateChanged(user => dispatch(setUserInfo(user)))
  }, [])

  useEffect(() => {
    if (userInfo?.uid) {
      fetchData()
    } else {
      setVivienda(0)
      setServicios(0)
      setEducacion(0)
      setHigiene(0)
      setTransporte(0)
      setAlimentacion(0)
      setPersonal(0)
      setAhorro(0)
      setRecreacion(0)
      setOtros(0)
    }
  }, [userInfo])

  function getTotalByCategory () {
    budgetItemArrRef.forEach(item => {
      if (item.category === 'Vivienda') {
        setVivienda(() => vivienda + item.amount)
      } else if (item.category === 'Servicios') {
        setServicios(servicios + item.amount)
      } else if (item.category === 'Educacion') {
        setEducacion(educacion + item.amount)
      } else if (item.category === 'Higiene') {
        setHigiene(higiene + item.amount)
      } else if (item.category === 'Transporte') {
        setTransporte(transporte + item.amount)
      } else if (item.category === 'Alimentacion') {
        setAlimentacion(alimentacion + item.amount)
      } else if (item.category === 'Personal') {
        setPersonal(personal + item.amount)
      } else if (item.category === 'Ahorro') {
        setAhorro(ahorro + item.amount)
      } else if (item.category === 'Recreacion') {
        setRecreacion(recreacion + item.amount)
      } else if (item.category === 'Otros') {
        setOtros(otros + item.amount)
      }
    })
  }
  console.log(vivienda)

  async function fetchData () {
    await getBudgetItems(userInfo?.uid)
    await getTotalByCategory()
  }

  async function getBudgetItems (userId) {
    const data = await getBudgetItemsFromFirestore(userId)

    dispatch(updateBudgetItems(data))
  }

  async function handleSubmit (e) {
    e.preventDefault()

    const newBudgetItenToAdd = {
      id: Date.now(),
      amount: Number(amount),
      concept,
      category
    }

    setBudgetItem([...budgetItem, newBudgetItenToAdd])

    if (userInfo?.uid) {
      await addBudgetItemsToFirestore(userInfo?.uid, newBudgetItenToAdd)
      await getBudgetItems(userInfo?.uid)
    }

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

  async function handleDeleteClick (itemToDelete) {
    const newBudgetItem = budgetItem.filter((item) => item.id !== itemToDelete.id)

    setBudgetItem(newBudgetItem)

    if (userInfo?.uid) {
      await deleteBudgetItemFromFirestore(userInfo?.uid, itemToDelete.id)
    }

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

    getBudgetItems(userInfo?.uid)
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
    <Layout>
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
                  !userInfo?.uid
                    ? (
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
                      )
                    : (
                        _.orderBy(budgetItemArrRef, ['category', 'amount'], ['asc', 'desc'])
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
                      )
                }
              </ul>
            </div>
          </div>
          <div className='budget-report txt-center'>
            <h3>Reporte</h3>
            <div className='pie-chart'>
              <Chart
                type='pie'
                data={reportDataAnonymous}
              />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Budget
