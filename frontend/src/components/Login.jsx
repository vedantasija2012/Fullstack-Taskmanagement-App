import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import { server } from '../App.jsx';
import { Context } from '../index.js';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(Context);

  const handleLogin = async (e) => {
    try {
      e.preventDefault()
      // e.stopPropagation();
      const { data } = await axios.post(`${server}/login`, { email, password }, { withCredentials: true })
      setIsAuthenticated(true)
      navigate('/tasks')
      toast.success(`${data.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })
    } catch (error) {
      setIsAuthenticated(false)
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })
    }
  }
  return (
    <div className='login rounded-sm shadow-xl h-auto min-h-[75vh] w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%] xl:w-1/3 block m-auto my-8 sm:my-[6rem] p-4'>
      <h2 className='text-center font-bold text-xl sm:text-2xl mb-6'>Login to your Account!</h2>
      <form className='form my-6 sm:my-10 px-2 py-4 flex flex-col justify-center'>
        <input type="email" onChange={(e) => setEmail(e.target.value)} className='px-4 py-2 my-2 w-full rounded-md border-2 border-black text-base' required placeholder='Email:' />
        {/* <Link to={'/forgot/password'}>Forgot password?</Link> */}
        <input type="password" onChange={(e) => setPassword(e.target.value)} className='px-4 py-2 my-2 w-full rounded-md border-2 border-black text-base' required placeholder='Password:' />
        <button onClick={handleLogin} className="btn bg-black text-white rounded-lg p-2 mt-6 sm:mt-[2rem] font-bold w-full hover:bg-gray-800 transition-colors">Login</button>
      </form>
      <div className="signup-container float-right mx-4">
        <p className='inline font-bold text-md mx-2'>New User!</p><Link to={'/signup'} className='hover:underline font-bold'>Signup</Link>
      </div>
    </div>
  )
}

export default Login