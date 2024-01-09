import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { server } from '../App'
const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name:'',
    email:'',
  })
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const response = await axios.get(`${server}/profile`, {withCredentials:true})
        setUserInfo(response.data.user)
      } catch (error) {
        toast.error('Login to View Profile!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
        })
      }
    }
    fetchData();
  }, [])

  const handleLogout = async()=>{
    try {
      const {data} = await axios.post(`${server}/logout`, null, {withCredentials:true})
      setUserInfo({
        name:'',
        email:''
      })
      toast.success(data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      })
      navigate('/login');
    } catch (error) {
      console.log(`${error}`)
      toast.error(`Logout attempt failed!`, {
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
    <div className='profile shadow-2xl rounded-md px-2 py-4 my-10 m-auto w-3/4 h-[58vh] md:h-[60vh]'>
      <h1 className='text-2xl font-bold cursor-default underline text-center'>User Profile</h1>
      <div className="info flex flex-col items-center justify-center mt-5">
        <div className='p-2 border-2 my-2 rounded-lg w-full md:w-1/2'>{userInfo.name}</div>
        <div className='p-2 border-2 my-2 rounded-lg w-full md:w-1/2'>{userInfo.email}</div>
        <div className="tasks-pending px-4 py-2 my-2 w-full md:w-1/2">
          <p>{}</p>
          <p></p>
        </div>
        <button onClick={handleLogout} className="btn hoverEffect border-2 border-black mt-4 py-2 px-4 rounded-lg hover:underline">Log out</button>
      </div>
    </div>
  )
}

export default Profile