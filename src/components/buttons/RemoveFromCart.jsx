'use client'

import axios from 'axios'
import React, { useState, useTransition } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const RemoveFromCart = ({ productId }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const removeItem = async () => {
    if (loading) return

    setLoading(true)
    try {
      const response = await axios.delete('/api/user/cart', {
        data: { productId },
        withCredentials: true
      })

      toast.success(response.data.message)
      router.refresh()
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      className={`text-xl cursor-pointer ${loading ? 'opacity-50' : ''}`}
      onClick={removeItem}
      disabled={loading}
    >
      <MdDeleteOutline />
    </button>
  )
}

export default RemoveFromCart
