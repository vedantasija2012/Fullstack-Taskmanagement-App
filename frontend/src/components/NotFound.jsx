import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()
  return (
    <div className='w-full md:w-2/3 block mx-auto my-10 rounded-md shadow-2xl border-2 border-red-500 transform transition duration-1000 ease-in-out hover:scale-105'>
        <div className='px-6 py-4 flex flex-col items-center justify-center font-bold text-red-500'>
            <h1 className='text-3xl my-2'>404! Error!!</h1>
            <p className='text-xl my-2'>Page Not Found</p>
            <button onClick={()=>navigate('/')} className='px-4 py-2 my-2 rounded-md border-2 border-red-500 text-red-500 transform transition duration-300 ease-in-out hover:scale-105 hover:underline'>Go Back</button>
        </div>
    </div>
  )
}

export default NotFound