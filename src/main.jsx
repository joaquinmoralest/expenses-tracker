import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import {
  RouterProvider,
  Route,
} from "react-router-dom"
import { Provider } from 'react-redux'
import store from './redux/store'
import router from './router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
