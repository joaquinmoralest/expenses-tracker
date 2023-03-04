import { configureStore } from '@reduxjs/toolkit'
import appSlice from './appSlice'

const store = configureStore({
  reducer: {
    app: appSlice
  }
})

store.subscribe(() => console.log(store.getState()))

export default store
