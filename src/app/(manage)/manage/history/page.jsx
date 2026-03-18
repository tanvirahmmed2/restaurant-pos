'use client'
import { generateReceipt } from '@/lib/database/print'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const DeliveredOrder = () => {
  const [orders, setOrders] = useState([])

  const fethcOrders = async () => {
    try {
      const res = await axios.get('/api/order', { withCredentials: true })
      setOrders(res.data.payload)
    } catch (error) {
      setOrders([])
    }
  }


  useEffect(() => { fethcOrders() }, [])

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are your sure?')
    if (!confirm) return
    try {
      const res = await axios.delete('/api/order',  {data:{ id }, withCredentials: true })
      toast.success(res.data.message)
      fethcOrders()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to cancel order")
    }
  }
  
  return (
    <div className='w-full flex flex-col items-center gap-4 min-h-screen'>
      {
        orders.length === 0 ? <p>No delivered order found</p> : <div className='w-full flex flex-col items-center gap-4'>
          <h1 className='w-full text-center text-base md:text-xl font-semibold'>Delivered orders</h1>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
            {
              orders.map((order) => (
                <div key={order._id} className='w-full flex flex-col items-center justify-center gap-2 shadow p-2 rounded-xl border border-black/20'>
                  <div className='w-full flex md:flex-row md:items-start items-center justify-center gap-4'>
                    <div className='w-full flex flex-col items-center gap-1'>
                      <p className='font-semibold uppercase'>Order Id: #{order._id.slice(-5)}</p>
                      <p>{order?.name}</p>
                      <p>{order?.phone}</p>
                      <p className='text-xs'>Date: {order.createdAt.slice(0, 10)}</p>
                      <p>{order.paymentStatus}</p>
                    </div>


                    <div className='w-full flex flex-col items-center gap-1'>
                      {
                        order.items.map((item) => (
                          <div key={item._id} className='w-full grid grid-cols-5'>
                            <p className='col-span-3'>{item.title}</p>
                            <p className='col-span-1'>{item.quantity}</p>
                            <p className='col-span-1'>{item.price - item.discount}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div className='w-full flex flex-row items-center justify-between gap-2'>
                    <button className='w-full text-center shadow border border-black/20 rounded-xl cursor-pointer' onClick={() => handleDelete(order._id)}>Delete</button>
                    <Link href={`/manage/order/${order._id}`} className='w-full text-center shadow border border-black/20 rounded-xl cursor-pointer'>Preview</Link>
                    <button className='w-full text-center shadow border border-black/20 rounded-xl cursor-pointer' onClick={() => generateReceipt(order)}>Print</button>
                    
                  </div>

                </div>
              ))
            }
          </div>
        </div>
      }

    </div>
  )
}

export default DeliveredOrder
