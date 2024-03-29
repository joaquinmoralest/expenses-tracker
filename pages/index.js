// import '../styles/App.css'
import { useState, useEffect } from 'react'
import Button from '../components/Button/Button'
import ListItem from '../components/ListItem/ListItem'
import { formatAmount } from '../utils/utils'
import Input from '../components/Input/Input'
import {
  addExpenseToFirestore,
  addIncomeToFirestore,
  deleteExpenseFromFirestore,
  getExpensesFromFirestore,
  getIncomeFromFirestore
} from '../utils/service'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo, updateExpenses, updateIncome } from '../redux/appSlice'
import { authStateChanged } from '../utils/auth'
import Spinner from '../components/Spinner/Spinner'
import _ from 'lodash'
import Layout from '../components/Layout'
import ProgressBar from '../components/ProgressBar'

function Home () {
  const [remaining, setRemaining] = useState(0)
  const [percentage, setPercentage] = useState(100)
  const [expenses, setExpenses] = useState([])
  const [income, setIncome] = useState(0)
  const [newIncome, setNewIncome] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')
  const [expenseConcept, setExpenseConcept] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [isExpensesLoaded, setIsExpensesLoaded] = useState(false)
  const [isIncomeLoaded, setIsIncomeLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const userInfo = useSelector(state => state?.app?.user)
  const userIncome = useSelector(state => state?.app?.income)
  const expensesArr = useSelector(state => state?.app?.expenses)
  const expensesArrRef = expensesArr[0]
  const dispatch = useDispatch()

  useEffect(() => {
    authStateChanged(user => dispatch(setUserInfo(user)))
  }, [])

  useEffect(() => {
    calculateRemaining()
  }, [expenses, income, expensesArr, isExpensesLoaded, isIncomeLoaded])

  useEffect(() => {
    if (userInfo?.uid) {
      fetchData()
    }
  }, [userInfo])

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (screen.width <= 420) {
      setIsMobile(true)
    }
  }, [])

  async function fetchData () {
    setIsLoading(true)
    await getArrFirestore()
    getIncomeFirestore()
      .then(calculateRemaining)
    setIsLoading(false)
  }

  async function getArrFirestore () {
    try {
      setIsExpensesLoaded(false)

      const expensesFirestore = await getExpensesFromFirestore(userInfo?.uid)

      dispatch(updateExpenses(expensesFirestore))
      setIsExpensesLoaded(true)
    } catch (e) {
      console.log(`getExpensesFromFirestore failed, ${e}`)
    }
  }

  async function getIncomeFirestore () {
    try {
      setIsIncomeLoaded(false)

      getIncomeFromFirestore(userInfo?.uid)
        .then(income => {
          dispatch(updateIncome(income))
          setIsIncomeLoaded(true)
        })
        .catch(error => {
          console.log('getIncomeFromFirestore error, ', error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  function calculateRemaining () {
    let totalExpenses = 0
    let newRemaining = 0
    let newPercentage = 0

    if (!userInfo?.uid) {
      expenses.forEach((expense) => {
        totalExpenses = totalExpenses + expense.amount
      })

      newRemaining = income - totalExpenses

      income !== 0 && (
        newPercentage = (newRemaining / income) * 100
      )
    } else {
      if (isExpensesLoaded && isIncomeLoaded) {
        expensesArrRef?.forEach((expense) => {
          totalExpenses = totalExpenses + expense.amount
        })

        newRemaining = userIncome?.amount - totalExpenses

        userIncome?.amount !== 0 && (
          newPercentage = (newRemaining / userIncome?.amount) * 100
        )
      }
    }

    setRemaining(newRemaining)
    setPercentage(newPercentage.toFixed(0))
  }

  async function addExpenses (e) {
    e.preventDefault()

    const newExpenseToAdd = {
      id: Date.now(),
      date: new Date().toISOString(),
      amount: Number(expenseAmount),
      concept: expenseConcept
    }

    if (userInfo?.uid) {
      await addExpenseToFirestore(userInfo?.uid, newExpenseToAdd)
      await getArrFirestore()
    } else {
      setExpenses([...expenses, newExpenseToAdd])
      calculateRemaining()
    }

    setExpenseAmount('')
    setExpenseConcept('')
  }

  async function addIncome (e) {
    e.preventDefault()

    const newIncomeToAdd = {
      date: new Date().toISOString().slice(0, 10),
      amount: Number(newIncome)
    }

    if (userInfo?.uid) {
      await addIncomeToFirestore(userInfo?.uid, newIncomeToAdd)
      await getIncomeFirestore()
    } else {
      setIncome(newIncome)
      calculateRemaining()
    }
    // setRemaining(newIncome)
    setNewIncome('')
  }

  function handleDeleteClick (id) {
    if (!userInfo?.uid) {
      const newExpenses = expenses.filter((expense) => expense.id !== id)

      setExpenses(newExpenses)
    } else {
      deleteExpenseFromFirestore(userInfo?.uid, id)
        .then(getArrFirestore)
    }
  }

  function handleExpenseAmount (e) {
    setExpenseAmount(e.target.value)
  }

  function handleExpenseConcept (e) {
    setExpenseConcept(e.target.value)
  }

  function handleIncome (e) {
    setNewIncome(e.target.value)
  }

  return (
    <Layout>

      <div className='container'>
        <div className='title'>
          {
            !isMobile
              ? (
                <>
                  <h1>Seguimiento de gastos</h1>
                  <h3>Ordena tus finanzas partiendo por conocer tus habitos</h3>
                </>
                )
              : (
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
              onSubmit={addExpenses}
            >
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
                type='text'
                value={expenseConcept}
                required
              />
              <Button
                type='add'
              />
            </form>

            <div className='resume-list'>
              <ul>
                {
                  !userInfo?.uid
                    ? (
                        _.orderBy(expenses, ['date', 'asc'])
                          .map((expense, index) => {
                            return (
                              <li key={index}>
                                <ListItem
                                  onClick={() => handleDeleteClick(expense.id)}
                                  amount={expense.amount}
                                  concept={expense.concept}
                                  date={expense.date.slice(0, 10)}
                                />
                              </li>
                            )
                          })
                      )
                    : (
                        isLoading
                          ? (
                            <Spinner />
                            )
                          : (
                              _.orderBy(expensesArrRef, ['date', 'asc'])
                                .map((expense, index) => {
                                  return (
                                    <li key={index}>
                                      <ListItem
                                        onClick={() => handleDeleteClick(expense.id)}
                                        amount={expense.amount}
                                        concept={expense.concept}
                                        date={expense.date.slice(0, 10)}
                                      />
                                    </li>
                                  )
                                })
                            )
                      )
                }
              </ul>
            </div>
          </section>

          <section className='budget'>
            <h4 className='txt-center'>Ingresos</h4>
            <form className='form' onSubmit={addIncome}>
              <Input
                onChange={handleIncome}
                name='incomeAmount'
                placeholder='Tu ingreso total para este mes...'
                type='number'
                value={newIncome}
              />
              <Button
                type='add'
              />
            </form>
            <h4 className='txt-center mt-3'>Presupuesto</h4>
            <ProgressBar remaining={percentage} />
            {
              !userInfo?.uid
                ? (
                  <h5 className='txt-center'>{formatAmount(remaining)} de {formatAmount(income)}</h5>
                  )
                : (
                  <h5 className='txt-center'>{formatAmount(remaining)} de {formatAmount(userIncome?.amount)}</h5>
                  )
            }
          </section>
        </main>
      </div>
    </Layout>
  )
}

export default Home
