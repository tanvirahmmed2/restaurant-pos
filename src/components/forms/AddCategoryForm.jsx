'use client'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { Context } from '../context/Context'

const AddCategoryForm = () => {
    const {fetchCategories}= useContext(Context)
    const [formData, setFormData]=useState({
        name:'',
        image:null
    })
    const handleChange=(e)=>{
        const { name, value, files } = e.target
        if (files) {
            setFormData({ ...formData, image: files[0] })
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const data= new FormData()
            data.append('name', formData.name)
            data.append('image', formData.image)
            const res= await axios.post('/api/category', data, {withCredentials:true})
            toast.success(res.data.message)
            fetchCategories()
            e.target.reset()
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add category')
            
        }
    }
  return (
    <form onSubmit={handleSubmit} className='w-full flex flex-col items-center justify-center gap-4'>
        <h1 className='text-3xl font-semibold text-center'>New Category</h1>
        <div className='w-full flex flex-col gap-1'>
            <label htmlFor="name">Name</label>
            <input type="text" name='name' id='name' onChange={handleChange} value={formData.name} required className='w-full px-3 p-1 border border-black/20 outline-none rounded-lg' />
        </div>
        <div className='w-full flex flex-col gap-1'>
            <label htmlFor="image">Image</label>
            <input type="file" name='image' id='image' required onChange={handleChange}  className='w-full px-3 p-1 border border-black/20 outline-none rounded-lg'/>
        </div>
        <button className='bg-gray-700 text-white p-1 hover:bg-gray-800 cursor-pointer px-7 rounded-xl'>Submit</button>
      
    </form>
  )
}

export default AddCategoryForm
