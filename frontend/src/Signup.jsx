import React from "react";
import { useState } from "react";
import { handleError, handleSuccess } from "./Utils";
import { ToastContainer } from "react-toastify";
import {useNavigate} from 'react-router-dom'
const SignupForm = () => {
  const navigate = useNavigate();
    const [SignUpInfo, setSignUpInfo] = useState({
      name:'', email:'', password:''
    })
    const handleChange=(e)=>{
      const {name, value}=e.target
      const copySignUpInfo={...SignUpInfo}
      copySignUpInfo[name]=value;
      setSignUpInfo(copySignUpInfo)
    }

    const handleSubmit=async(e)=>{
      e.preventDefault();
      const {name, email, password}=SignUpInfo
      if(!name || !password || !email){
        return handleError('Enter all fields before submitting.')
      } 
      try{
        const url='http://localhost:5000/signup'
        const response=await fetch(url,{
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(SignUpInfo)
        })
        const result=await response.json()
        const {success, message, error}=result;
        if (!response.ok || !success) {
          const details = result?.error?.details?.[0]?.message;
          return handleError(details || result.message || "Something went wrong");
        }
        if(success){
          handleSuccess(message);
          setTimeout(()=>{
            navigate('/login')
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
          Sign Up
        </h2>
        <form 
        onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-green-300 text-lg mb-2" htmlFor="name">
              Name
            </label>
            <input
                onChange={handleChange}
              type="text" 
              name="name" autoFocus
              placeholder="Enter your name"
              className="w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={SignUpInfo.name}
            />
          </div>
          <div className="mb-4">
            <label className="block text-green-300 text-lg mb-2" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleChange}
              type="email" 
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={SignUpInfo.email}
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
              value={SignUpInfo.password}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-gray-900 font-semibold py-2 rounded-lg hover:bg-green-400 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-gray-400 text-lg text-center mt-4">
          Already have an account? <a className="text-green-300 cursor-pointer hover:underline" href="/login">Login</a>
        </p>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default SignupForm;