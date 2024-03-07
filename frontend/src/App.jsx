import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import Home from './components/Home'
import Tasks from './components/Tasks'
import Header from './components/Header'
import About from './components/About'
import { Context } from './index.js'
import axios from 'axios'
import Footer from './components/Footer.jsx'
import NotFound from './components/NotFound.jsx'

export const server = `http://localhost:5500/api/v1`

const App = () => {
  const {setIsAuthenticated} = useContext(Context);

  useEffect(()=>{
    axios.get(`${server}/profile`, {withCredentials:true}).then(()=>{
      setIsAuthenticated(true)
    }).catch(()=>{
      setIsAuthenticated(false)
    })
  })
  return (
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
  )
}

export default App