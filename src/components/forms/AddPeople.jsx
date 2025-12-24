'use client'
import axios from 'axios'
import React, { useState } from 'react'

const AddPeople = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const addNewPeople = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/user', formData, { withCredentials: true })
            console.log(response)
            alert(response.data.message)
        } catch (error) {
            console.log(error)
            alert(error?.response?.data?.error || 'Failed to add new access')
        }
    }
    return (
        <form onSubmit={addNewPeople} className='w-full flex flex-col items-center justify-center gap-4 border-b-2 border-black/10 p-4'>
            <h1 className='text-xl font-semibold'>Add New Access</h1>
            <div className='w-full flex flex-row items-center justify-center gap-4'>
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name' name='name' required value={formData.name} onChange={handleChange} className='w-full p-1 px-3 outline-none border-2 border-black/10 rounded-lg shadow-sm' />
                </div>
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="role">Role</label>
                    <select name="role" id="role" required value={formData.role} onChange={handleChange} className='w-full p-1 px-3 outline-none border-2 border-black/10 rounded-lg shadow-sm'>
                        <option value="">Select an option</option>
                        <option value="manager">Manager</option>
                        <option value="sales">Sales</option>
                    </select>
                </div>
            </div>
            <div className='w-full flex flex-row items-center justify-center gap-4'>
                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name='email' required value={formData.email} onChange={handleChange} className='w-full p-1 px-3 outline-none border-2 border-black/10 rounded-lg shadow-sm' />
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <label htmlFor="password">Password</label>
                    <input type="text" id='password' name='password' required value={formData.password} onChange={handleChange} className='w-full p-1 px-3 outline-none border-2 border-black/10 rounded-lg shadow-sm' />
                </div>
            </div>

            <button type='submit' className='bg-black text-white p-1 px-4 rounded-lg shadow-sm cursor-pointer'>Add New Role</button>
        </form>
    )
}

export default AddPeople
