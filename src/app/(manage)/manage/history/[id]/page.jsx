import { BASE_URL } from '@/lib/database/secret'
import React from 'react'

const SingleOrderHistory = async ({ params }) => {
    const tempId = await params
    const id = tempId.id
    const res = await fetch(`${BASE_URL}/api/order/${id}`, { method: 'GET', cache: 'no-store' })
    const data = await res.json()
    if (!data.success) return <p>No data found</p>
    const order = data.payload
    return (
        <div className='w-full flex flex-row  gap-4 justify-between items-start p-4'>
            <div className=' flex-3 flex flex-col gap-4'>
                <div className='w-full flex flex-col items-center justify-center gap-2 border p-4 rounded-lg'>
                    <div className='w-auto flex flex-row items-start justify-center gap-4'>
                        <div>
                            <h1 className=''>Name: {order.name}</h1>
                            <p>Phone: {order.phone}</p>
                        </div>
                        <p className='px-3 text-white bg-green-500 rounded-lg'>{order.paymentMethod}</p>
                    </div>
                    <p>Order id: <strong>{id}</strong></p>
                </div>
                <div className='w-full flex flex-col items-center justify-center gap-2 border p-4 rounded-lg'>
                    {
                        order.items.map(item => (
                            <div key={item.title} className='w-full flex flex-row items-center justify-center'>
                                <p className='flex-4'>{item?.title}</p>
                                <p className='flex-1'>{item?.quantity}</p>
                                <p className='flex-1'>{item?.price}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div  className='flex-1 flex flex-col items-center justify-center gap-2 border p-4 rounded-lg'>
                <p>SubTotal: {order.subTotal}</p>
                <p>Discount: {order.discount}</p>
                <p>Tax: {order.tax}</p>
                <p>Total: {order.totalPrice}</p>
            </div>

        </div>
    )
}

export default SingleOrderHistory
