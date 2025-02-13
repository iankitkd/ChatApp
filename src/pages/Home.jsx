import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-background-primary'>
        <h1 className="mt-8 text-4xl font-bold text-center">Welcome to Chat App</h1>
        <p className="mt-2 text-center">Connect with your friends anytime, anywhere.</p>
        <div className="mt-6 flex gap-4 justify-center">
          <button className="px-5 py-2 rounded-md text-lg font-semibold text-button-text bg-button hover:bg-button-hover hover:cursor-pointer" 
          onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>

          <button className="px-5 py-2 rounded-md text-lg font-semibold text-button-text bg-button hover:bg-button-hover hover:cursor-pointer" 
          onClick={() => navigate("/login")}
          >
            Login
        </button>
        </div>
    </div>
  )
}

export default Home
