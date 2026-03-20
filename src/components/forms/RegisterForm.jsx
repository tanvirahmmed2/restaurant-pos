'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const RegisterForm = () => {
    const [formData, setFormData]= useState({
        name:'',
        phone:'',
        email:'',
        password:''
    })
    const handleChange=(e)=>{
        const {name, value}= e.target
        setFormData((prev)=>({...prev, [name]:value}))
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const res= await axios.post('/api/user', formData, {withCredentials:true})
            toast.success(res.data.message)
            e.target.reset()
            window.location.replace('/login')
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to register")
            
        }
    }
  return (
    <form onSubmit={handleSubmit} className='w-full flex flex-col items-center gap-4'>
        <div>
            <label htmlFor="name">Name</label>
            <input type="text" name='name' id='name' required onChange={handleChange} value={formData.name} />
        </div>
        <div>
            
        </div>
      
    </form>
  )
}

export default RegisterForm
