import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai'
import { Context } from '../index.js'

const Header = () => {
  const { isAuthenticated } = useContext(Context);
  return (
    <nav className='text-black shadow-2xl p-4 h-20 w-full font-bold'>
      <ul className='flex items-center p-2'>
        <li className='px-4 hover:underline'><Link to={'/'}>Home</Link></li>
        <li className='px-4 hover:underline'><Link to={'/about'}>About</Link></li>
        <li className='px-4 hover:underline'><Link to={'/tasks'}>My Tasks</Link></li>
        <li className='px-4 hover:underline'>
          {
            isAuthenticated ? <Link to={'/profile'}><AiOutlineUser className='text-3xl block border-2 border-black cursor-pointer float-right mx-2 font-bold rounded-3xl' /></Link> :<Link to={'/login'}>Login</Link>
          }
        </li>
      </ul>
    </nav>
  )
}

export default Header