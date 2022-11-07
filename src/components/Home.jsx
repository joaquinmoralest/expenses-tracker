import '../styles/App.css'
import { useState, useEffect } from 'react'
import Button from './Button/Button'
import ListItem from './ListItem/ListItem'
import ProgressBar from './ProgressBar'
import { formatAmount } from '../utils/utils'
import Input from './Input/Input'
import { addExpenseToFirestore, addIncomeToFirestore, getExpensesFromFirestore } from '../utils/service'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo, updateExpenses } from '../redux/appSlice'
import { authStateChanged } from '../utils/auth'

function Home () {
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

  useEffect(() => {
    authStateChanged(user => dispatch(setUserInfo(user)))
  }, [])

  useEffect(() => calculateRemaining(), [])

  useEffect(() => {
    if (userInfo.signinMethod !== 'anonymous') {
      getArrFirestore()
    }
  }, [userInfo])

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (screen.width <= 420) {
      setIsMobile(true)
    }
  }, [])

  async function getArrFirestore () {
    try {
      const expensesFirestore = await getExpensesFromFirestore(userInfo?.uid)

      dispatch(updateExpenses(expensesFirestore))
      calculateRemaining()
    } catch (e) {
      console.log(`getExpensesFromFirestore failed, ${e}`)
    }
  }

  function calculateRemaining () {
    let totalExpenses = 0

    expenses.forEach((expense) => {
      totalExpenses = totalExpenses + expense.amount
    })

    const newRemaining = income - totalExpenses
    const newPercentage = (newRemaining / income) * 100

    setRemaining(newRemaining)
    setPercentage(newPercentage.toFixed(0))
  }

  function addExpenses (e) {
    e.preventDefault()

    const newExpenseToAdd = {
      date: new Date().toISOString().slice(0, 10),
      amount: Number(expenseAmount),
      concept: expenseConcept
    }

    userInfo.signinMethod !== 'anonymous'
      ? (
          addExpenseToFirestore(userInfo?.uid, newExpenseToAdd) &&
          getArrFirestore()
        )
      : (setExpenses([...expenses, newExpenseToAdd]))

    calculateRemaining()
    setExpenseAmount('')
    setExpenseConcept('')
  }

  function addIncome (e) {
    e.preventDefault()

    const newIncomeToAdd = {
      date: new Date().toISOString().slice(0, 10),
      amount: Number(newIncome)
    }

    userInfo.signinMethod !== 'anonymous'
      ? (addIncomeToFirestore(userInfo?.uid, newIncomeToAdd))
      : (setIncome(newIncome))

    setRemaining(newIncome)
    calculateRemaining()
    setNewIncome('')
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
                userInfo.signinMethod === 'anonymous'
                  ? (
                      expenses.map((expense, index) => {
                        return (
                          <li key={index}>
                            <ListItem
                              amount={expense.amount}
                              concept={expense.concept}
                              date={expense.date}
                            />
                          </li>
                        )
                      })
                    )
                  : (
                      expensesArr?.map((expense) => {
                        return (
                          expense?.map((exp, index) => {
                            return (
                              <li key={index}>
                                <ListItem
                                  amount={exp.amount}
                                  concept={exp.concept}
                                  date={exp.date}
                                />
                              </li>
                            )
                          })
                        )
                      })
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
          <ProgressBar
            remaining={percentage}
          />
          <h5 className='txt-center'>{formatAmount(remaining)} de {formatAmount(income)}</h5>
        </section>
      </main>
    </div>
  )
}

export default Home
