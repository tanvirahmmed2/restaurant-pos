'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const LoginForm = () => {
  
    const [formData, setFormData]= useState({
        email:"",
        password:''
    })
    
    const handleChange=(e)=>{
        const {name, value}= e.target
        setFormData((prev)=>({...prev, [name]:value}))
    }

    const loginHandle=async (e) => {
        e.preventDefault()
        try {
            const response= await axios.post('/api/user/login', formData, {withCredentials:true})
            toast.success(response.data.message)
            window.location.replace('/profile')
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
            
        }
        
    }
  return (
    <motion.form initial={{opacity:0, x:20}} whileInView={{opacity:1, x:0}} transition={{duration:0.6}} onSubmit={loginHandle} className='flex-1 flex flex-col  gap-4'>
          <div className='w-full flex flex-col'>
            <label htmlFor="email">Email</label>
            <input type="email" id='email' name='email' required value={formData.email} onChange={handleChange} className='w-full px-3 p-1 rounded-lg outline-none border border-black/10'/>
          </div>
          <div className='w-full flex flex-col'>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' name='password' required value={formData.password} onChange={handleChange} className='w-full px-3 p-1 rounded-lg outline-none border border-black/10'/>
          </div>
          <Link href={'/register'} className='w-full text-right'>new user?</Link>
          <button type='submit' className='bg-black/80 hover:bg-black text-white rounded-lg cursor-pointer '>Next</button>
        </motion.form>
  )
}

export default LoginForm
