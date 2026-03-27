'use client'
import React, { useContext, useState } from 'react'
import { Context } from '../context/Context'
import Link from 'next/link'

const UserOrderForm = () => {
    const { subTotal,  totalPrice,  totalDiscount, cartBar, clearCart, userData, cart } = useContext(Context)
       
    

    const [formData, setFormData] = useState({
            name: userData?.name || '',
            phone: userData?.phone || '',
            items: cart.items,
            subTotal: subTotal || 0,
            totalDiscount: totalDiscount || 0,
            totalPrice: totalPrice || 0,
            deliveryMethod: 'takein',
            paymentMethod: 'bkash',
            transactionId: '',
            status: 'pending'
        })
  return (
    <div className='w-full flex items-center justify-center'>
        {
            cart.items.length===0? <Link href={'/menu'}>Please select from menu</Link>:
            <div className='w-auto flex flex-col items-center '>

            </div>
        }
      
    </div>
  )
}

export default UserOrderForm
