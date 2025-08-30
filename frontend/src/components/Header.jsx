import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai'
import { Context } from '../index.js'

const Header = () => {
  const { isAuthenticated } = useContext(Context);
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    // Add scroll event listener when component mounts
    window.addEventListener('scroll', handleScroll);

    // Remove scroll event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`${isSticky ? 'bg-gray-800 fixed top-0 left-0 text-white' : 'bg-white'
      } text-black shadow-2xl p-4 h-20 w-full font-bold flex justify-between items-center`}>
      <div className='px-4 text-lg md:px-8 hover:underline'>
        <Link to={'/'}>TaskBuddy</Link>
      </div>
      <ul className='flex items-center p-2'>
        <li className='px-4 md:px-8 hover:underline'><Link to={'/about'}>About</Link></li>
        <li className='px-4 md:px-8 hover:underline'><Link to={'/tasks'}>Tasks</Link></li>
        <li className='px-4 md:px-8 hover:underline'>
          {
            isAuthenticated ? <Link to={'/profile'}><AiOutlineUser className={`${isSticky ? 'text-3xl block border-2 border-white cursor-pointer float-right mx-2 font-bold rounded-3xl' : 'text-3xl block border-2 border-black cursor-pointer float-right mx-2 font-bold rounded-3xl'
              }`} /></Link> : <Link to={'/login'}>Login</Link>
          }
        </li>
      </ul>
    </nav>
  )
}

export default Header