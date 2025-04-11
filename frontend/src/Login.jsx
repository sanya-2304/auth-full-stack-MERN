import React from "react";
import { useState } from "react";
import { handleError, handleSuccess } from "./Utils";
import { ToastContainer } from "react-toastify";
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate();
    const [LoginInfo, setLoginInfo] = useState({
       email:'', password:''
    })
    const handleChange=(e)=>{
      const {name, value}=e.target
      const copyLoginInfo={...LoginInfo}
      copyLoginInfo[name]=value;
      setLoginInfo(copyLoginInfo)
    }

    const handleSubmit=async(e)=>{
      e.preventDefault();
      const { email, password}=LoginInfo
      if( !password || !email){
        return handleError('Enter all fields before submitting.')
      } 
      try{
        const url='http://localhost:5000/login'
        const response=await fetch(url,{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(LoginInfo)
        })
        const result=await response.json()
        const {success, message, error, name, jwToken}=result;
        if (!response.ok || !success) {
          const details = result?.error?.details?.[0]?.message;
          return handleError(details || result.message || "Something went wrong");
        }
        if(success){
          handleSuccess(message);
          localStorage.setItem('token', jwToken)
          localStorage.setItem('name', name)
          const formattedName = name.toLowerCase().replace(/\s+/g, '-');   
          setTimeout(()=>{
            navigate(`/${formattedName}`);  
          }, 2000)
        }
        console.log(message)
      }catch(err){
          handleError(err)
      }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-green-400 text-center mb-6">
        Login
        </h2>
        <form 
        onSubmit={handleSubmit}>
         
          <div className="mb-4">
            <label className="block text-green-300 text-lg mb-2" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email" 
              name="email" autoFocus
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={LoginInfo.email}
            />
          </div>
          <div className="mb-6">
            <label className="block text-green-300 text-lg mb-2" htmlFor="password">
              Password
            </label>
            <input
              onChange={handleChange}
              type="password" 
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={LoginInfo.password}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-gray-900 font-semibold py-2 rounded-lg hover:bg-green-400 transition"
          >
            Login
          </button>
        </form>
        <p className="text-gray-400 text-lg text-center mt-4">
          Don't have any account? <a className="text-green-300 cursor-pointer hover:underline" href="/signup">SignUp</a>
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;