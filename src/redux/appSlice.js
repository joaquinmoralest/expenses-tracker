import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: app,
  initialState: {
    loading: false,
    user: {
      uid: '',
      signinMethod: 'anonimously',
      firstName: '',
      lastName: '',
    },
    expenses: [],
    income: 0
  },
  reducers: {
    SET_LOADING: (state, action) => state.loading = action.payload,
    SET_USER_INFO: (state, action) => state.user = action.payload,
    ADD_EXPENSE: (state, action) => state.expenses = [...expenses, action.payload],
    ADD_INCOME: (state, action) => state.income = action.payload,
  }
})

export default appSlice