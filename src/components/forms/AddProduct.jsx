'use client'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { Context } from '../context/Context'

const AddProduct = () => {
    const { categories } = useContext(Context)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        discount: '0',
        categoryId: '',
        image: null,
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (files) {
            setFormData({ ...formData, image: files[0] })
        } else {
            setFormData({ ...formData, [name]: value })
        }
    }

    const addNewProduct = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const newData = new FormData()
            newData.append('title', formData.title)
            newData.append('description', formData.description)
            newData.append('price', formData.price)
            newData.append('discount', formData.discount)
            newData.append('categoryId', formData.categoryId)
            newData.append('image', formData.image)

            const response = await axios.post('/api/product', newData, { withCredentials: true })
            toast.success(response.data.message)
            
            setFormData({
                title: '',
                description: '',
                price: '',
                discount: '0',
                categoryId: '',
                image: null,
            })
            e.target.reset()
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to add product')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={addNewProduct} className='w-full flex flex-col items-center justify-center gap-4 border-b border-slate-200 p-6 bg-white rounded-xl shadow-sm'>
            <h1 className='text-2xl font-bold text-slate-800 self-start'>Add New Product</h1>
            
            <div className='w-full flex flex-col gap-1.5'>
                <label htmlFor="title" className='text-sm font-medium text-slate-700'>Title</label>
                <input type="text" name='title' id='title' required value={formData.title} onChange={handleChange} 
                    className='w-full p-2 px-3 outline-none border border-slate-300 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black transition-all' />
            </div>

            <div className='w-full flex flex-col gap-1.5'>
                <label htmlFor="description" className='text-sm font-medium text-slate-700'>Description</label>
                <textarea name='description' id='description' required value={formData.description} onChange={handleChange} 
                    className='w-full p-2 px-3 outline-none border border-slate-300 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black transition-all resize-none' />
            </div>

            <div className='w-full flex flex-col gap-1.5'>
                <label htmlFor="categoryId" className='text-sm font-medium text-slate-700'>Category</label>
                <select name="categoryId" id="categoryId" required value={formData.categoryId} onChange={handleChange} 
                    className='w-full p-2 px-3 outline-none border border-slate-300 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black transition-all bg-white'>
                    <option value="">--Select--</option>
                    {categories && categories.map((cat) => (
                        <option value={cat._id} key={cat._id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div className='flex w-full gap-4'>
                <div className='w-1/2 flex flex-col gap-1.5'>
                    <label htmlFor="price" className='text-sm font-medium text-slate-700'>Price</label>
                    <input type="number" name='price' id='price' min={0} step="0.01" required value={formData.price} onChange={handleChange} 
                        className='w-full p-2 px-3 outline-none border border-slate-300 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black transition-all' />
                </div>
                <div className='w-1/2 flex flex-col gap-1.5'>
                    <label htmlFor="discount" className='text-sm font-medium text-slate-700'>Discount </label>
                    <input type="number" name='discount' id='discount' min={0} max={100} value={formData.discount} onChange={handleChange} 
                        className='w-full p-2 px-3 outline-none border border-slate-300 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black transition-all' />
                </div>
            </div>

            <div className='w-full flex flex-col gap-1.5'>
                <label htmlFor="image" className='text-sm font-medium text-slate-700'>Image</label>
                <input type="file" accept='image/*' required name='image' onChange={handleChange} id='image' 
                    className='w-full p-1.5 px-3 outline-none border border-slate-300 rounded-lg file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200' />
            </div>

            <button 
                type='submit' 
                disabled={loading}
                className={`w-full md:w-auto mt-2 bg-black text-white p-2 px-10 rounded-lg font-semibold shadow-md active:scale-95 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-slate-800 cursor-pointer'}`}>
                {loading ? 'Processing...' : 'Submit Product'}
            </button>
        </form>
    )
}

export default AddProduct