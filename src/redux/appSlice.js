import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading: false,
    user: {
      uid: '',
      signinMethod: 'anonymous',
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

export const { changeLoading, setUserInfo, updateExpenses, updateIncome, clearExpenses, clearIncome } = appSlice.actions
export default appSlice.reducer
