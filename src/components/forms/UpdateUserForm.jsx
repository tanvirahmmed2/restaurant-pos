'use client'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { Context } from '../context/Context'

const UpdateUserForm = () => {
    const {userData}= useContext(Context)
  const [formData, setFormData]= useState({
        name: userData?.name ||'',
        email: userData?.email ||'',
        password:''
    })
    const handleChange=(e)=>{
        const {name, value}= e.target
        setFormData((prev)=>({...prev, [name]:value}))
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const res= await axios.patch('/api/user', formData, {withCredentials:true})
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to register")
            
        }
    }
  return (
    <motion.form initial={{opacity:0, x:20}} whileInView={{opacity:1, x:0}} transition={{duration:0.6}} onSubmit={handleSubmit} className='w-full flex flex-col items-center gap-4'>
        <div className='w-full flex flex-col gap-1'>
            <label htmlFor="name">Name</label>
            <input type="text" name='name' id='name' required onChange={handleChange} value={formData.name}  className='w-full px-3 p-1 border border-black/40 rounded-lg outline-none'/>
        </div>
        <div className='w-full flex flex-col gap-1'>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' id='email' onChange={handleChange} required value={formData.email}  className='w-full px-3 p-1 border border-black/40 rounded-lg outline-none'/>
        </div>
        <div className='w-full flex flex-col gap-1'>
            <label htmlFor="password">Password</label>
            <input type="text" name='password' onChange={handleChange} id='password' value={formData.password} className='w-full px-3 p-1 border border-black/40 rounded-lg outline-none'/>
        </div>
        <button className='w-full bg-slate-700 text-white p-1 rounded-xl'>Update</button>
      
    </motion.form>
  )
}

export default UpdateUserForm
