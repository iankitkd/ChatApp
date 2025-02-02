import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import { IoMdEye, IoMdEyeOff, IoMdLock, IoMdMail  } from "react-icons/io";

import { logInService } from '../services/authService';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {loading} = useSelector(state => state.auth);

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  const handleLogin = async (formData) => {
    const {email, password} = formData;
    const response = dispatch(logInService(email, password, navigate));
    // console.log(response);
  }

  return (
    <div className='bg-background-primary w-full min-h-screen flex justify-center'>

    <div className='w-[350px] h-fit flex flex-col my-2 p-4 pb-8 bg-background-secondary rounded-2xl'>
      <h2 className='text-2xl text-center font-bold text-button p-1'>Welcome Back</h2>
      <p className='text-center p-1'>Sign in To Continue</p>

      {/* form */}
      <form onSubmit={handleSubmit(handleLogin)}>
        
        <label htmlFor='email' className='relative flex flex-col'>
          <IoMdMail  className='absolute top-[30px] left-1 text-xl'/>
          <input 
          type="text" 
          id='email'
          placeholder='Email'
          autoComplete='on'
          className='bg-background-fill h-12 mt-4 pl-7 rounded-xl placeholder-text-muted outline-0 focus:outline-1 focus:outline-button'
          {...register("email", {
            required: "Email is required", 
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format"
            }
          })}
          />
          {errors.email && (<span className='text-red-500 text-xs px-2'>{errors.email.message}</span>)}
        </label>

        <label htmlFor='password' className='flex flex-col relative'>
          <IoMdLock className='absolute top-[30px] left-1 text-xl'/>
          <div className='absolute top-[30px] right-1'
          onClick={() => setIsPasswordVisible(prev => !prev)}
          >
            { isPasswordVisible
              ? <IoMdEyeOff className=' text-xl' />
              : <IoMdEye className='text-xl'/>
            }
          </div>
          <input 
          type={isPasswordVisible ? "text" : "password"}
          id='password'
          placeholder='Password'
          autoComplete='on'
          className='bg-background-fill h-12 mt-4 pl-7 rounded-xl placeholder-text-muted outline-0 focus:outline-1 focus:outline-button'
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters"
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#(){}.,])[A-Za-z\d@$!%*?&#(){}.,]+$/,
              message: "Password must contain at least one letter, one number, and one special character"
            }
          })}
          />
          {errors.password && (<span className='text-red-500 text-xs px-2'>{errors.password.message}</span>)}
        </label>

        <button 
        className='w-full font-semibold text-button-text bg-button hover:bg-button-hover disabled:bg-button-muted hover:cursor-pointer h-10 mt-4 px-2 rounded-xl' 
        type='submit'
        disabled={loading}
        >
          Sign in
        </button>

      </form>

      <div className='flex gap-2 justify-center py-2'>
        <p>Don't have a account?</p>
        <button 
        className='text-button font-semibold hover:cursor-pointer hover:underline'
        onClick={() => navigate("/signup")}>
          Sign up
        </button>
      </div>

    </div>
    </div>
  )
}

export default Login
