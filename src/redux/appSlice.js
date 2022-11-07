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
    income: 0
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
    clearExpenses: (state) => {
      state.expenses = []
    },
    clearIncome: (state) => {
      state.income = 0
    }
  }
})

export const { changeLoading, setUserInfo, updateExpenses, updateIncome, clearExpenses, clearIncome, clearUserInfo } = appSlice.actions
export default appSlice.reducer
