'use client'
import React, { useContext, useState } from 'react'
import { Context } from '../context/Context'
import Link from 'next/link'
import { toast } from 'react-toastify'
import axios from 'axios'

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

        const handleChange=(e)=>{
            const {name,value}=e.target
            setFormData((prev)=>({...prev,[name]:value}))
        }
        const handleOrder=async(e)=>{
            try {
                const res= await axios.post('/api/order', formData,{withCredentials:true})
                toast.success(res.data.message)
                clearCart()
                
            } catch (error) {
                toast.error(error?.response?.data?.message || "Failed to place order")
                
            }
        }
  return (
    <div className='w-full flex items-center justify-center'>
        {
            cart.items.length===0? <Link href={'/menu'}>Please select from menu</Link>:
            <form className='w-auto flex flex-col items-center '>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name' name='name' />
                </div>

            </form>
        }
      
    </div>
  )
}

export default UserOrderForm
