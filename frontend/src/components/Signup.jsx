import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { server } from '../App';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(`${server}/new/user`, { name, email, password }, { withCredentials: true })

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
      navigate('/tasks')
    } catch (error) {
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
    <div className='signup rounded-sm shadow-xl h-auto min-h-[75vh] w-[90%] sm:w-[70%] md:w-[60%] lg:w-[40%] xl:w-1/3 block m-auto my-8 sm:my-[6rem] p-4'>
      <h2 className='text-center font-bold text-xl sm:text-2xl mb-6'>Signup to your Account!</h2>
      <form className='form my-6 sm:my-10 px-2 py-4 flex flex-col justify-center'>
        <input onChange={(e) => setName(e.target.value)} type="name" className='px-4 py-2 my-2 w-full rounded-md border-2 border-black text-base' placeholder='Name:' />
        <input onChange={(e) => setEmail(e.target.value)} type="email" className='px-4 py-2 my-2 w-full rounded-md border-2 border-black text-base' placeholder='Email:' />
        {/* <Link to={'/forgot/password'}>Forgot password?</Link> */}
        <input onChange={(e) => setPassword(e.target.value)} type="password" className='px-4 py-2 my-2 w-full rounded-md border-2 border-black text-base' placeholder='Password:' />
        <button onClick={handleRegister} className="btn bg-black text-white rounded-lg p-2 mt-6 sm:mt-[2rem] font-bold w-full hover:bg-gray-800 transition-colors">Signup</button>
      </form>
      <div className="signup-container float-right mx-4">
        <p className='inline font-bold text-md mx-2'>Already a User!</p><Link to={'/login'} className='hover:underline font-bold'>Login</Link>
      </div>
    </div>
  )
}

export default Signup