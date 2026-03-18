'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    member: '',
    table: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/reservation', formData, { withCredentials: true })
      toast.success(response.data.message || 'Reservation submitted successfully!')
      
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        date: '',
        member: '',
        table: '',
        message: ''
      })
    } catch (error) {
      console.error(error)
      toast.error(error?.response?.data?.message || 'Failed to submit data')
    }
  }

  return (
    <div className='w-full min-h-screen p-4  flex flex-col md:flex-row items-center justify-center gap-10 max-w-5xl mx-auto'>

      <div className='w-full flex flex-col gap-4 text-center items-center md:text-left'>
        <h1 className='text-3xl md:text-4xl font-bold'>Join Us at Our Table</h1>
        <p className='text-gray-600 leading-relaxed text-center'>
          Whether you are planning a romantic evening, a family celebration, or a private event, 
          we are here to make it unforgettable.
        </p>
      </div>
      
      <div className='w-full bg-white shadow-xl rounded-lg p-6 flex flex-col gap-4 border border-black/20'>
        <h1 className='text-2xl font-semibold border-b-2 border-slate-600 w-fit pb-1 mx-auto'>Book Your Table</h1>
        
        <form onSubmit={handleSubmit} className='flex w-full flex-col gap-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col gap-1'>
              <label htmlFor="name" className='font-medium'>Name</label>
              <input type="text" id='name' name='name' required onChange={handleChange} value={formData.name} className='border border-black/30 outline-none px-2 p-1 focus:border-slate-600' />
            </div>
            
            <div className='flex flex-col gap-1'>
              <label htmlFor="email" className='font-medium'>Email</label>
              <input type="email" id='email' name='email' required onChange={handleChange} value={formData.email} className='border border-black/30 outline-none px-2 p-1 focus:border-slate-600' />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='flex flex-col gap-1'>
              <label htmlFor="date" className='font-medium'>Date</label>
              <input type="date" id='date' name='date' required onChange={handleChange} value={formData.date} className='border border-black/30 outline-none px-2 p-1 w-full focus:border-slate-600' />
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor="member" className='font-medium'>Guests</label>
              <input type="number" id='member' name='member' min="1" required onChange={handleChange} value={formData.member} className='border border-black/30 outline-none px-2 p-1 w-full focus:border-slate-600' />
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor="table" className='font-medium'>Table No.</label>
              <input type="number" id='table' name='table' required onChange={handleChange} value={formData.table} className='border border-black/30 outline-none px-2 p-1 w-full focus:border-slate-600' />
            </div>
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="message" className='font-medium'>Special Requests</label>
            <textarea name="message" id="message" rows="3" required onChange={handleChange} value={formData.message} className='border border-black/30 outline-none px-2 p-1 focus:border-slate-600' />
          </div>

          <button type='submit' className='bg-slate-600 w-full md:w-max px-8 py-2 cursor-pointer text-white font-semibold rounded shadow-md hover:bg-slate-700 hover:scale-[1.02] transition-all duration-300'>
            Submit Reservation
          </button>
        </form>
      </div>
    </div>
  )
}

export default Reservation