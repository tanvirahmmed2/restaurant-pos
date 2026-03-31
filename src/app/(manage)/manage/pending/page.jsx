'use client'
import { generateReceipt } from '@/lib/database/print'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const PendingOrder = () => {
  const [orders, setOrders] = useState([])

  const fethcOrders = async () => {
    try {
      const res = await axios.get('/api/order/pending', { withCredentials: true })
      setOrders(res.data.payload)
    } catch (error) {
      setOrders([])
    }
  }


  useEffect(() => { fethcOrders() }, [])

  const handleCancel = async (id) => {
    const confirm = window.confirm('Are your sure?')
    if (!confirm) return
    try {
      const res = await axios.post('/api/order/cancel', { id }, { withCredentials: true })
      toast.success(res.data.message)
      fethcOrders()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to cancel order")
    }
  }
  const handleConfirm = async (id) => {
    const confirm = window.confirm('Are your sure?')
    if (!confirm) return
    try {
      const res = await axios.post('/api/order/confirmed', { id }, { withCredentials: true })
      toast.success(res.data.message)
      fethcOrders()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to deliver order")
    }
  }
  return (
    <div className='w-full flex flex-col items-center gap-4 min-h-screen'>
      {
        orders.length === 0 ? <p>No order to confirm</p> : <div className='w-full flex flex-col items-center gap-4'>
          <h1 className='w-full text-center text-base md:text-xl font-semibold'>Waiting orders to be confirmed</h1>
          <div className='w-full grid grid-cols-10'>
            <p className='col-span-1'>Order ID</p>
            <p className='col-span-1'>Date</p>
            <p className='col-span-1'>Phone</p>
            <p className='col-span-2'>Items</p>
            <p className='col-span-1'>Price</p>
            <p className='col-span-1'>Discount</p>
            <p className='col-span-1'>Payment</p>
            <p className='col-span-1'>Status</p>
            <p className='col-span-1'>Action</p>
          </div>
          <div className='w-full flex flex-col gap-2 '>
            {
              orders.map((order) => (
                <div key={order._id} className='w-full grid grid-cols-10 shadow p-2 even:bg-slate-200 rounded-xl'>

                  <p className='col-span-1'>{order._id.slice(-5)}</p>
                  <p className='col-span-1'>{order.createdAt.slice(0, 10)}</p>
                  <p className='col-span-1'>{order?.phone}</p>
                  <div className='w-full flex flex-col items-center gap-1 col-span-2'>
                    {
                      order.items.map((item) => (
                        <p key={item._id} className='w-full'>
                          {item.title}
                        </p>
                      ))
                    }
                  </div>
                  <p className='col-span-1'>{order.totalPrice}</p>
                  <p className='col-span-1'>{order.totalDiscount}</p>
                  <p className='col-span-1'>{order.paymentStatus}</p>
                  <p className='col-span-1'>{order.status}</p>
                  <div className='w-full flex flex-col items-center justify-between gap-2 col-span-1'>
                    <button className='w-full text-center shadow border border-black/20 rounded-xl cursor-pointer' onClick={() => handleCancel(order._id)}>Cancel</button>
                    <Link href={`/manage/orders/${order._id}`} className='w-full text-center shadow border border-black/20 rounded-xl cursor-pointer'>Preview</Link>
                    <button className='w-full text-center shadow border border-black/20 rounded-xl cursor-pointer' onClick={() => generateReceipt(order)}>Print</button>
                    <button className='w-full text-center shadow border border-black/20 rounded-xl cursor-pointer' onClick={() => handleConfirm(order._id)}>Confirm</button>
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

export default PendingOrder
