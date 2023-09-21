import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Store, persistor } from './Redux/Store'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from "@material-tailwind/react";

import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeProvider>
    <ToastContainer/>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
        </ThemeProvider>
  </React.StrictMode>,
)
