import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="block mx-auto min-h-[68vh] sm:min-h-[73vh] px-4 sm:px-0">
      <div className="text-center my-12 sm:my-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Task Management App</h1>
        <p className="text-gray-600 text-base sm:text-lg mb-8">Organize your tasks with ease!</p>
        <Link to="/about" className="bg-black text-white px-4 sm:px-6 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm sm:text-base">
          Know More!
        </Link>
      </div>
    </div>
  );
}


export default Home