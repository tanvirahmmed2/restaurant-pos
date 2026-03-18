import { BASE_URL } from '@/lib/database/secret'
import React from 'react'

const Orders = async() => {
  const res= await fetch(`${BASE_URL}/api/order/confirmed`, {method:'GET', cache:'no-store'})
  const data= await res.json()
  if(!data.success) return <p className='w-full text-center p-4'>No running order found</p>
  const orders= data.payload

  return (
    <div className='w-full flex p-4 flex-col items-center justify-center gap-4'>
      <h1 className='text-2xl' >Orders</h1>
      {
        orders.map((order)=>(
          <div key={order._id} className='w-full p-2 border border-black/10 rounded-lg flex flex-col items-center justify-center text-sm gap-4'>
            <div className='w-full flex flex-row items-center justify-between gap-4'>
              <p className='font-semibold'>Name: {order.name}</p>
              <p>Phone: {order.phone}</p>
              <p className={`${order.status==='confirmed' && 'bg-amber-400'} ${order.status==='cancelled' && 'bg-red-400'} ${order.status==='delivered' && 'bg-green-400'} text-white px-3 p-1 rounded-lg`}>{order.status}</p>
            </div>

            <div className='w-full flex flex-row items-center justify-between'>
              <div>
                {
                  order.items.map((item)=>(
                    <div key={item._id}>
                      <p>{item?.title}</p>
                      <div>
                        <p>{item.quantity}</p>
                        <p>{item.price}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div>
                <p>Subtotal: {order.subTotal}</p>
                <p>Discount: {order.discount}</p>
                <p>Tax: {order.tax}</p>
                <p>Total: {order.totalPrice}</p>
                <p>Paid by: {order.paymentMethod}</p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Orders
