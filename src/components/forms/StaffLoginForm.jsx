'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const StaffLoginForm = () => {
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
            const response= await axios.post('/api/staff/login', formData, {withCredentials:true})
            toast.success(response.data.message)
            window.location.replace('/manage')
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message)
            
        }
        
    }
  return (
    <form onSubmit={loginHandle} className='flex-1 flex flex-col  gap-4'>
          <div className='w-full flex flex-col'>
            <label htmlFor="email">Email</label>
            <input type="email" id='email' name='email' required value={formData.email} onChange={handleChange} className='w-full px-3 p-1 rounded-lg outline-none border border-black/10'/>
          </div>
          <div className='w-full flex flex-col'>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' name='password' required value={formData.password} onChange={handleChange} className='w-full px-3 p-1 rounded-lg outline-none border border-black/10'/>
          </div>
          <button type='submit' className='bg-black/80 hover:bg-black text-white rounded-lg cursor-pointer '>Next</button>
        </form>
  )
}

export default StaffLoginForm
