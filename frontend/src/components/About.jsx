import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const About = () => {
    return (
        <div className='home shadow-xl p-2 w-1/3 my-4 mx-auto flex flex-col items-center justify-center'>
            <div className="upper my-2 p-4">
                <h1 className='text-xl text-center font-bold'>TaskBuddy</h1>
                <img src={logo} className='h-[35vh]' alt="Error" />
            </div>
            <div className="lower my-2 p-4">
                <p className='font-bold'>
                    TaskBuddy is a minimalist note-taking and Task management app designed to inspire your imagination in a grayscale world. Step into a captivating real where shades of gray awaken your creativity and enable your ideas to take center stage
                </p>
            </div>
            <button className='bg-black my-2 p-4 rounded-lg w-full font-bold'><Link to={'/login'} className='text-white ' >Get Started</Link></button>
        </div>
    )
}

export default About