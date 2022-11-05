import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading: false,
    user: {
      uid: 'Z',
      signinMethod: 'anonimously',
      firstName: '',
      lastName: '',
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
        ...state.expenses, 
        action.payload
      ]
    },
    updateIncome: (state, action) => {
      state.income = action.payload
    },
  }
})

export const { changeLoading, setUserInfo, updateExpenses, updateIncome } = appSlice.actions
export default appSlice.reducer