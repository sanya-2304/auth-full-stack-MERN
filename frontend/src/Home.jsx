import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { handleError } from './Utils'
import { ToastContainer } from 'react-toastify'

const Home = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({ name: '...?..', email: '...?..' })
    
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token ) {
      navigate('/login')
    } else {
      fetchData(token)
    }
  }, [])

  const fetchData = async (token) => {
    try {
      const res = await fetch('http://localhost:5000/home', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      })
      const data = await res.json()
      if (data.success) {
        setUser(data.user)
      } else {
        handleError(data.message)
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      }
    } catch (err) {
      handleError(err.message)
      navigate('/login')
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold text-green-400 mb-6">Welcome Home</h2>
        <p className="text-lg text-green-300 mb-2">Hi, <span className="font-semibold text-white">{user.name}</span> 👋</p>
        <p className="text-lg text-gray-300 mb-6">Your email ID is: <span className="text-white">{user.email}</span></p>
        <button
          onClick={handleLogout}
          className="w-full bg-green-400 text-gray-900 font-semibold py-2 rounded-lg hover:bg-blue-400 transition"
        >
          Logout
        </button>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home
