import { BASE_URL } from '@/lib/database/secret'
import Link from 'next/link'
import React from 'react'

const History = async () => {
  const res = await fetch(`${BASE_URL}/api/order`, { method: 'GET', cache: 'no-store' })
  const data = await res.json()
  if (!data.success) return <p className='w-full text-center p-4'>No order found</p>
  const orders = data.payload
  return (
    <div className='w-full flex p-4 flex-col items-center justify-center gap-4'>
      <h1 className='text-2xl'>History</h1>
      <div className='w-full grid grid-cols-3 gap-4'>
        {orders.map((order) => (
          <Link
            href={`/sales/history/${order._id}`}
            key={order._id}
            className='w-full p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex flex-col gap-3'
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-bold text-gray-900'>{order.name}</p>
                <p className='text-xs text-gray-500'>{order.phone}</p>
              </div>
              <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${order.status === 'confirmed' ? 'bg-amber-100 text-amber-700' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-green-100 text-green-700'
                }`}>
                {order.status}
              </span>
            </div>

            <div className='grid grid-cols-2 text-xs text-gray-600 border-t border-gray-100 pt-3'>
              <div className='flex flex-col gap-1'>
                <p>Subtotal: <span className='text-black'>৳{order.subTotal}</span></p>
                <p>Discount: <span className='text-red-500'>-৳{order.discount}</span></p>
              </div>
              <div className='flex flex-col gap-1 text-right'>
                <p>Tax: <span className='text-black'>৳{order.tax}</span></p>
                <p>Pay: <span className='font-medium text-black uppercase'>{order.paymentMethod}</span></p>
              </div>
            </div>

            <div className='flex justify-between items-center bg-gray-50 p-2 rounded-lg'>
              <span className='text-[10px] font-bold text-gray-400 uppercase tracking-tight'>Grand Total</span>
              <span className='text-lg font-black text-black'>৳{order.totalPrice}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default History
