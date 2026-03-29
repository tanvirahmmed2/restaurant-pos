'use client'
import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'

const Logout = () => {
  const handleLogout = async () => {
    try {
      const response = await axios.get('/api/user/logout', { withCredentials: true })
      toast.success(response.data.message)
      window.location.replace('/login')
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.error || "Failed to Logout")

    }
  }
  return (
    <button className='w-auto flex items-center justify-between gap-3 cursor-pointer' onClick={handleLogout}>Logout</button>
  )
}

export default Logout
