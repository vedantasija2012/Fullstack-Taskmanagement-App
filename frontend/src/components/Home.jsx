import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="block mx-auto h-[68vh] md:h-[73vh] overflow-y-hidden">
      <div className="text-center my-20 ">
        <h1 className="text-3xl font-bold mb-4">Task Management App</h1>
        <p className="text-gray-600 text-lg mb-8">Organize your tasks with ease!</p>
        <Link to="/about" className="bg-black text-white px-6 py-2 rounded-md">
          Know More!
        </Link>
      </div>
    </div>
  );
}


export default Home