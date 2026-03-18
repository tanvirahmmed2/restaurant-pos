'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const NewExpenseForm = () => {
    const [formData, setFormData]= useState({
        title:'',
        note:'',
        amount:''
    })
    const handleChange=(e)=>{
        const {name, value}=e.target
        setFormData((prev)=>({...prev,[name]:value}))
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const res= await axios.post('/api/expense', formData, {withCredentials:true})
            toast.success(res.data.message)
            e.target.reset()
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to create expense record")
            
        }
    }
  return (
    <form onSubmit={handleSubmit} className='w-full flex flex-col items-center gap-4'>
        <div className='w-full flex flex-col gap-1'>
            <label htmlFor="title">Title</label>
            <input type="text" name='title' id='title' required onChange={handleChange} value={formData.title} className='w-full px-3 p-1 border border-black/2- rounded-xl outline-none' />
        </div>
        <div className='w-full flex flex-col gap-1'>
            <label htmlFor="note">Note</label>
            <textarea name="note" id="note" onChange={handleChange} required value={formData.note} className='w-full px-3 p-1 border border-black/2- rounded-xl outline-none'></textarea>
        </div>
        <div className='w-full flex flex-col gap-1'>
            <label htmlFor="amount">Amount</label>
            <input type="number" onChange={handleChange} required value={formData.amount} name='amount' id='amount' className='w-full px-3 p-1 border border-black/2- rounded-xl outline-none' />
        </div>
      <button type='submit' className='w-full bg-slate-700 text-white p-1 rounded-xl cursor-pointer'>Submit</button>
    </form>
  )
}

export default NewExpenseForm
