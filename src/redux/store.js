import { configureStore } from "@reduxjs/toolkit"

const store = configureStore({
  reducer: appSlice.reducer
})

store.subscribe(() => console.log(store.getState()))

export default store