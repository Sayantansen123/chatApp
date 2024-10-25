import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {

  const navigate = useNavigate();
  const [userInput,setUserInput] = useState({});
  const [loading,setLoading] = useState(false);
  const {setAuthUser} = useAuth();

  const handelInput = (e) =>{
       setUserInput({
        ...userInput,[e.target.id]:e.target.value
       })
  }
  console.log(userInput)

  const handelSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true)
    try {
      const login = await axios.post("/api/auth/login",userInput);
      const data = login.data;
      if(data.success === false){
        setLoading(false);
        console.log(data.message);
      }
      toast.success(data.message);
      localStorage.setItem("chatApp",JSON.stringify(data))
      setAuthUser(data)
      setLoading(false)
      navigate('/')


    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message)
      
    }
  }






  return (
    <div
      style={{ animation: 'slideInFromLeft 1s ease-out' }}
      className="max-w-md w-full bg-gradient-to-r from-blue-800 to-purple-600 rounded-xl shadow-2xl overflow-hidden p-8 space-y-8"
    >
      <h2
        style={{ animation: 'appear 2s ease-out' }}
        className="text-center text-4xl font-extrabold text-white"
      >
        Welcome
      </h2>
      <p style={{ animation: 'appear 3s ease-out' }} className="text-center text-gray-200">
        Sign in to your account
      </p>
      <form className="space-y-6" onSubmit={handelSubmit}>
        <div className="relative">
          <input
            placeholder="john@example.com"
            className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
            required
            id="email"
            name="email"
            type="email"
            onChange={handelInput}
            autoComplete='off'
            
            
          />
          <label
            className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
            htmlFor="email"
          >
            Email address
          </label>
        </div>
        <div className="relative">
          <input
            placeholder="Password"
            className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
            required
            id="password"
            name="password"
            type="password"
            onChange={handelInput}
            
          />
          <label
            className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
            htmlFor="password"
          >
            Password
          </label>
        </div>
        <div className="flex items-center justify-between w-2">
          
        </div>
        <button
          className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
          type="submit"
        >
          {loading ? "Loading..." :"Login"}
        </button>
      </form>
      <div className="text-center text-gray-300">
        Don't have an account?
        <Link to={'/register'}>
        <span className="text-purple-300 hover:underline" href="#">
          Sign up
        </span>
        </Link>
      </div>
    </div>
  )
}

export default Login
