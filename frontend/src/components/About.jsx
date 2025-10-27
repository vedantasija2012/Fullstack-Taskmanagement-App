import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div className='home shadow-xl p-4 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-1/3 my-8 mx-auto flex flex-col items-center justify-center rounded-lg'>
            <div className="upper my-4 p-2 sm:p-4">
                <h1 className='text-2xl sm:text-3xl text-center font-bold mb-6'>TaskBuddy</h1>
                <img src={logo} className='h-[25vh] sm:h-[35vh] w-auto max-w-full mx-auto' alt="TaskBuddy Logo" />
            </div>
            <div className="lower my-4 p-2 sm:p-4">
                <p className='font-medium sm:font-bold text-sm sm:text-base text-center leading-relaxed'>
                    TaskBuddy is a minimalist note-taking and Task management app designed to inspire your imagination in a grayscale world. Step into a captivating real where shades of gray awaken your creativity and enable your ideas to take center stage
                </p>
            </div>
            <button className='bg-black hover:bg-gray-800 transition-colors my-2 p-3 sm:p-4 rounded-lg w-full font-bold'>
                <Link to={'/login'} className='text-white block text-center'>Get Started</Link>
            </button>
        </div>
    )
}

export default About