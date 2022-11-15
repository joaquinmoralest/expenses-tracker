import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading: false,
    user: {
      uid: null,
      email: '',
      name: ''
    },
    expenses: [],
    income: 0,
    categories: {
      home: 0,
      services: 0,
      education: 0,
      hygiene: 0,
      transport: 0,
      food: 0,
      personal: 0,
      savings: 0,
      recreation: 0,
      others: 0
    }
  },
  reducers: {
    changeLoading: (state, action) => {
      state.loading = action.payload
    },
    setUserInfo: (state, action) => {
      state.user = action.payload
    },
    clearUserInfo: (state) => {
      state.user = {
        uid: null,
        name: '',
        email: ''
      }
    },
    updateExpenses: (state, action) => {
      state.expenses = [
        action.payload
      ]
    },
    updateIncome: (state, action) => {
      state.income = action.payload
    },
    updateCategories: (state, action) => {
      state.income = action.payload
    },
    clearExpenses: (state) => {
      state.expenses = []
    },
    clearIncome: (state) => {
      state.income = 0
    }
  }
})

export const { changeLoading, setUserInfo, updateExpenses, updateIncome, clearExpenses, clearIncome, clearUserInfo, updateCategories } = appSlice.actions
export default appSlice.reducer
