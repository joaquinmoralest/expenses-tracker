import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore'
import { db } from '../App'

export async function addExpenseToFirestore (userId, newExpense) {
  try {
    await addDoc(collection(db, userId, 'data', 'expenses'), newExpense)
  } catch (e) {
    console.error('Error adding document', e)
  }
}

export async function deleteExpenseFromFirestore (userId, expenseId) {
  try {
    const q = query(collection(db, userId, 'data', 'expenses'), where('id', '==', expenseId))
    const querySnapshot = await getDocs(q)

    let dataId

    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        dataId = doc.id

        return dataId
      })
    }
    await deleteDoc(doc(db, userId, 'data', 'expenses', dataId))
  } catch (e) {
    console.error('Error deleting expense: ', e)
  }
}

export async function addIncomeToFirestore (userId, newIncome) {
  try {
    let docToOverwrite
    const q = query(collection(db, userId, 'data', 'incomes'))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        docToOverwrite = doc.id
      })

      const cityRef = doc(db, userId, 'data', 'incomes', docToOverwrite)
      setDoc(cityRef, newIncome, { merge: true })
    } else {
      await addDoc(collection(db, userId, 'data', 'incomes'), newIncome)
    }
  } catch (e) {
    console.error('Error adding income: ', e)
  }
}

export async function getExpensesFromFirestore (userId) {
  try {
    let expenses = []
    const docRef = collection(db, userId, 'data', 'expenses')
    const resp = await getDocs(docRef)

    resp.forEach(doc => {
      const data = doc.data()

      expenses = [...expenses, data]
    })

    return expenses
  } catch (e) {
    console.log(e)
  }
}

export async function getIncomeFromFirestore (userId) {
  try {
    let income
    const docRef = collection(db, userId, 'data', 'incomes')
    const resp = await getDocs(docRef)

    resp.forEach(doc => {
      const data = doc.data()

      income = data
    })

    return income
  } catch (e) {
    console.log(e)
  }
}

export async function addUserInfoToFirestore (user, userId) {
  try {
    let docToOverwrite
    const q = query(collection(db, userId, 'data', 'userInfo'))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        docToOverwrite = doc.id
      })

      const docRef = doc(db, userId, 'data', 'userInfo', docToOverwrite)
      setDoc(docRef, user, { merge: true })
    } else {
      await addDoc(collection(db, userId, 'data', 'userInfo'), user)
    }
  } catch (e) {
    console.error('Error adding document', e)
  }
}

export async function addBudgetCategoriesToFirestore (userId, newBudget) {
  try {
    let docToOverwrite
    const q = query(collection(db, userId, 'data', 'budget', 'data', 'totalByCategory'))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.docs.length > 0) {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        docToOverwrite = doc.id
      })

      const docRef = doc(db, userId, 'data', 'budget', 'data', 'totalByCategory', docToOverwrite)
      setDoc(docRef, newBudget, { merge: true })
    } else {
      await addDoc(collection(db, userId, 'data', 'budget', 'data', 'totalByCategory'), newBudget)
    }
  } catch (e) {
    console.error('Error adding budget: ', e)
  }
}

export async function addBudgetItemsToFirestore (userId, newBudget) {
  try {
    await addDoc(collection(db, userId, 'data', 'budget', 'data', 'budgetItems'), newBudget)
  } catch (e) {
    console.error('Error adding document', e)
  }
}

export async function deleteBudgetItemFromFirestore (userId, budgetItemId) {
  try {
    const q = query(collection(db, userId, 'data', 'budget', 'data', 'budgetItems'), where('id', '==', budgetItemId))
    const querySnapshot = await getDocs(q)

    let dataId

    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        dataId = doc.id

        return dataId
      })
    }
    await deleteDoc(doc(db, userId, 'data', 'budget', 'data', 'budgetItems', dataId))
  } catch (e) {
    console.error('Error deleting expense: ', e)
  }
}

export async function getBudgetItemsFromFirestore (userId) {
  try {
    let budgetItems = []
    const docRef = collection(db, userId, 'data', 'budget', 'data', 'budgetItems')
    const resp = await getDocs(docRef)

    resp.forEach(doc => {
      const data = doc.data()

      budgetItems = [...budgetItems, data]
    })

    return budgetItems
  } catch (e) {
    console.log(e)
  }
}

export async function getBudgetCategoriesFromFirestore (userId) {
  try {
    let categories
    const docRef = collection(db, userId, 'data', 'budget', 'data', 'totalByCategory')
    const resp = await getDocs(docRef)

    resp.forEach(doc => {
      const data = doc.data()

      categories = data
    })

    return categories
  } catch (e) {
    console.log(e)
  }
}
