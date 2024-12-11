import ReactDOM from 'react-dom/client'
import './index.css'
import React from 'react'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"

import Send from "./components/Send.jsx"
import Store from "./components/Store.jsx"
import View from "./components/View.jsx"
import Verify from "./components/Verify.jsx"

const router = createBrowserRouter([
  {
    path : "/",
    element: <App/>
  },
  {
    path : "/send",
    element : <Send/>
  },
  {
    path : "/store",
    element : <Store/>
  },
  {
    path : "/view",
    element : <View/>
  },
  {
    path : "/verify",
    element : <Verify/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
