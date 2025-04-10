import React from 'react'
import { useState, useEffect } from 'react'
import Signup from './Signup'
import Login from './Login'
import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './Home'
const App = () => {
  
  // const [user, setuser] = useState('');
  // useEffect(() => {
  //   const token=localStorage.getItem('token')
  //   const name=localStorage.getItem('name');
  //   if (!token) {
  //     navigate('/login')
  //   }else{
  //     setuser(name);
  //   }
  // }, [])
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to ="/login"/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/:name' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
