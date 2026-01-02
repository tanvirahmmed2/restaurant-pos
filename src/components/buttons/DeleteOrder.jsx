'use client'
import axios from 'axios'
import React from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { toast } from 'react-toastify'

const DeleteOrder = ({id}) => {
  const deleteOrder=async()=>{
    try {
      const response= await axios.delete('/api/order', {data:{id}, withCredentials:true})
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Failed to delete order")
      
    }
  }
  return (
    <button onClick={deleteOrder} className='w-full px-2 rounded-lg hover:bg-black/10 p-1 cursor-pointer flex flex-row items-center justify-center gap-4'><MdDeleteOutline/></button>
  )
}

export default DeleteOrder
