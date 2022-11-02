import { collection, addDoc, getDocs } from "firebase/firestore"

import { db } from "./App";

export function formatAmount(amount) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount)
}

export async function addExpense(amount, concept, date) {
  try {
    const docRef = await addDoc(collection(db, "expenses"), {
      amount,
      concept,
      date,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getExpenses() {
  const expenses = await getDocs(collection(db, "expenses"));

  expenses.forEach((expense) => {
    console.log(`${expense.id} => ${doc.data()}`);
  });
}