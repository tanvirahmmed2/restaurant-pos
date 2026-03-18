'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DeliveryOrder = () => {
  const [orders, setOrders]= useState([])

  const fethcOrders=async()=>{
    try {
      const res= await axios.get('/api/order/confirmed', {withCredentials:true})
      setOrders(res.data.payload)
    } catch (error) {
     setOrders([])
    }
  }


  useEffect(()=>{ fethcOrders()},[])
  return (
    <div className='w-full flex flex-col items-center gap-4'>
      {
        orders.length===0? <p>No order to deliver</p>: <div className='w-full flex flex-col items-center gap-4'>
          <h1 className='w-full text-center text-base md:text-xl font-semibold'>Waiting orders to be served</h1>
          <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
            {

            }
          </div>
        </div>
      }

    </div>
  )
}

export default DeliveryOrder
