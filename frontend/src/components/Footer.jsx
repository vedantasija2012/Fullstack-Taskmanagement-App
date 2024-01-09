import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-black text-white p-4 py-6'>
      <ul className='flex items-center justify-center space-x-4'>
        <li className='px-4 text-2xl'><a target="_blank" rel="noreferrer" href='mailto:vedant.asija@gmail.com'><i className="far fa-envelope text-2xl"></i></a></li>
        <li className='px-4 text-2xl'><a target="_blank" rel="noreferrer" href='https://www.instagram.com/__vedantasija__'><i className="fab fa-instagram text-2xl"></i></a></li>
        <li className='px-4 text-2xl'><a target="_blank" rel="noreferrer" href='https://www.linkedin.com/in/vedant-asija-b8b05a1b8'><i className="fab fa-linkedin text-2xl"></i></a></li>
        <li className='px-4 text-2xl'><a target="_blank" rel="noreferrer" href='https://github.com/vedantasija2012'><i className="fab fa-github text-2xl"></i></a></li>
      </ul>
    </footer>

  )
}

export default Footer