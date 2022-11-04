import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../App";

export async function addExpenseToFirestore(userId, newExpense) {
  try {
    const docRef = await addDoc(collection(db, userId), newExpense);
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
