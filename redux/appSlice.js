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
    budget: {
      budgetItems: [],
      totalByCategory: {
        vivienda: 0,
        servicios: 0,
        educacion: 0,
        higiene: 0,
        transporte: 0,
        alimentacion: 0,
        personal: 0,
        ahorro: 0,
        recreacion: 0,
        otros: 0
      }
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
    updateBudgetItems: (state, action) => {
      state.budget.budgetItems = [
        action.payload
      ]
    },
    updateCategories: (state, action) => {
      state.budget.totalByCategory = action.payload
    },
    updateVivienda: (state, action) => {
      state.budget.totalByCategory = {
        ...state.budget.totalByCategory,
        vivienda: action.payload
      }
    },
    updateServicios: (state, action) => {
      state.budget.totalByCategory = {
        ...state.budget.totalByCategory,
        servicios: action.payload
      }
    },
    updateEducacion: (state, action) => {
      state.budget.totalByCategory = {
        ...state.budget.totalByCategory,
        educacion: action.payload
      }
    },
    updateHigiene: (state, action) => {
      state.budget.totalByCategory = {
        ...state.budget.totalByCategory,
        higiene: action.payload
      }
    },
    updateTransporte: (state, action) => {
      state.budget.totalByCategory = {
        ...state.budget.totalByCategory,
        transporte: action.payload
      }
    },
    updateAlimentacion: (state, action) => {
      state.budget.totalByCategory = {
        ...state.budget.totalByCategory,
        alimentacion: action.payload
      }
    },
    updatePersonal: (state, action) => {
      state.budget.totalByCategory = {
        ...state.budget.totalByCategory,
        personal: action.payload
      }
    },
    updateAhorro: (state, action) => {
      state.budget.totalByCategory = {
        ...state.budget.totalByCategory,
        ahorro: action.payload
      }
    },
    updateRecreacion: (state, action) => {
      state.budget.totalByCategory = {
        ...state.budget.totalByCategory,
        recreacion: action.payload
      }
    },
    updateOtros: (state, action) => {
      state.budget.totalByCategory = {
        ...state.budget.totalByCategory,
        otros: action.payload
      }
    },
    clearExpenses: (state) => {
      state.expenses = []
    },
    clearIncome: (state) => {
      state.income = 0
    }
  }
})

export const {
  changeLoading,
  setUserInfo,
  updateExpenses,
  updateIncome,
  clearExpenses,
  clearIncome,
  clearUserInfo,
  updateBudgetItems,
  updateCategories,
  updateVivienda,
  updateServicios,
  updateEducacion,
  updateHigiene,
  updateTransporte,
  updateAlimentacion,
  updatePersonal,
  updateAhorro,
  updateRecreacion,
  updateOtros
} = appSlice.actions
export default appSlice.reducer
