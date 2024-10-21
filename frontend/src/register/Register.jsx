import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
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
            <form className="space-y-6" >
                <div className="relative">
                    <input
                        placeholder="Enter your name"
                        className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                        required
                        id="fullname"
                        name="fullname"
                        type="text"
                        autoComplete='off'
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        htmlFor="text"
                    >
                        Full Name
                    </label>
                </div>

                <div className="relative">
                    <input
                        placeholder="john@example.com"
                        className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                        required
                        id="username"
                        name="username"
                        type="text"
                        autoComplete='off'
                    />
                    <label
                        className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        htmlFor="text"
                    >
                        Username
                    </label>

                </div>



                <div className="relative">
                    <input
                        placeholder="john@example.com"
                        className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                        required
                        id="email"
                        name="email"
                        type="email"
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

                    />
                    <label
                        className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        htmlFor="password"
                    >
                        Password
                    </label>
                </div>


                <div className="relative">
                    <input
                        placeholder="Password"
                        className="peer h-10 w-full border-b-2 border-gray-300 text-white bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500"
                        required
                        id="confirmpassword"
                        name="confirmpassword"
                        type="password"

                    />
                    <label
                        className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm"
                        htmlFor="password"
                    >
                        Confirm Password
                    </label>
                </div>

                <div
                    id='gender' className="flex gap-2">
                    <label className="cursor-pointer label flex gap-2">
                        <span className="label-text font-semibold text-white">Male</span>
                        <input
                            
                            type='checkbox'
                            className="checkbox checkbox-info" />
                    </label>
                    <label className="cursor-pointer label flex gap-2">
                        <span className="label-text font-semibold text-white">Female</span>
                        <input
                            type='checkbox'
                            className="checkbox checkbox-info" />
                    </label>
                </div>


                <button
                    className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-700 rounded-md shadow-lg text-white font-semibold transition duration-200"
                    type="submit"
                >
                    Submit
                </button>
            </form>
            <div className="text-center text-gray-300">
                Do you have an account?
                <Link to={'/login'}><span className="text-purple-300 hover:underline">
                    Login
                </span>
                </Link>
            </div>
        </div>
    )
}

export default Register
