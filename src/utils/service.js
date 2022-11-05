import { addDoc, collection, doc, getDocs, query, setDoc } from "firebase/firestore";
import { db } from "../App";

export async function addExpenseToFirestore(userId, newExpense) {
  try {
    const docRef = await addDoc(collection(db, userId, 'data', 'expenses'), newExpense);
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}

export async function addIncomeToFirestore(userId, newIncome) {
  try {
    let docToOverwrite
    const q = query(collection(db, userId, 'data', 'incomes'))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      docToOverwrite = doc.id
    });

    const cityRef = doc(db, userId, 'data', 'incomes', docToOverwrite);
    setDoc(cityRef, newIncome, { merge: true });

    // const docRef = await addDoc(collection(db, userId, 'data', 'incomes'), newIncome);
  } catch (e) {
    console.error("Error adding document: ", e)
  }
}

export async function getExpensesFromFirestore(userId) {
  try {
    let expenses = []
    const docRef = collection(db, userId)
    let resp = await getDocs(docRef)

    resp.forEach(doc => {
      let data = doc.data()
      
      expenses = [...expenses, data]
    })

    return expenses
  } catch(e) {
    console.log(e)
  }
}
