import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Context = createContext({isAuthenticated:false})

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <Context.Provider value={{isAuthenticated, setIsAuthenticated}}>
      <App />
      <ToastContainer />
    </Context.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);