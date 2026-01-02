'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RemoveFromCart from '../buttons/RemoveFromCart'
import { useCart } from '../context/CartContext'
import { toast } from 'react-toastify'

const Orderform = ({ cartItems }) => {
    const { fetchCart } = useCart()
    const [data, setData] = useState({
        name: 'Guest',
        phone: '+880-1',
        delivery: 'dinein',
        table: 1,
        discount: 0,
        tax: 0,
        totlePrice: 0,
        payment: 'cash'
    })

    const [totals, setTotals] = useState({
        subTotal: 0,
        discount: 0,
        tax: 0,
        totlePrice: 0
    })

    useEffect(() => {
        let subTotal = 0
        for (let i = 0; i < cartItems.length; i++) {
            subTotal += cartItems[i].price
        }
        const discountRate = 0 
        const discount = subTotal * discountRate
        const taxRate = 0.02
        const tax = (subTotal - discount) * taxRate
        const totlePrice = subTotal - discount + tax

        setTotals({ subTotal, discount, tax, totlePrice })
    }, [cartItems])

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const handleMethodChange = (method) => {
        setData(prev => ({ ...prev, delivery: method }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const orderData = {
        ...data,
        items: cartItems, 
        subTotal: totals.subTotal,
        tax: totals.tax,
        discount: totals.discount,
        totalPrice: totals.totlePrice, 
        paymentMethod: data.payment
    };

    try {
        const response = await axios.post('/api/order', orderData, { withCredentials: true });
        toast.success(response.data.message);
        fetchCart()
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong");
    }
    }

    return (
        <form onSubmit={handleSubmit} className='w-full flex flex-col items-center justify-between gap-6 text-sm'>
           
            <div className='w-full flex flex-col items-center justify-center gap-2'>
                <div className="flex flex-row items-center justify-between w-full">
                    <p onClick={() => handleMethodChange('dinein')} className={`cursor-pointer px-4 py-1 rounded-full border ${data.delivery === 'dinein' ? 'bg-black text-white' : 'border-gray-300'}`} > Dine In </p>
                    <p onClick={() => handleMethodChange('takeout')} className={`cursor-pointer px-4 py-1 rounded-full border ${data.delivery === 'takeout' ? 'bg-black text-white' : 'border-gray-300'}`} > Take Out </p>
                </div>
                <div className='w-full flex flex-row items-center justify-between'>
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name' name='name' value={data.name} onChange={handleChange} className='px-3 border-2 border-black/10 rounded-lg outline-none' />
                </div>
                <div className='w-full flex flex-row items-center justify-between'>
                    <label htmlFor="phone">Phone</label>
                    <input type="text" id='phone' name='phone' value={data.phone} onChange={handleChange}  className='px-3 border-2 border-black/10 rounded-lg outline-none' />
                </div>
                {data.delivery === 'dinein' &&
                    <div className='w-full flex flex-row items-center justify-between'>
                        <label htmlFor="table">Table</label>
                        <input type="number" id='table' name='table' value={data.table} min={1} onChange={handleChange} className='px-3 border-2 border-black/10 rounded-lg outline-none' />
                    </div>
                }
                <div className='w-full flex flex-row items-center justify-between'>
                    <label htmlFor="payment">Payment</label>
                    <select name="payment" id="payment" value={data.payment} onChange={handleChange}  className='px-3 border-2 border-black/10 rounded-lg outline-none'>
                        <option value="cash">cash</option>
                        <option value="card">Card</option>
                        <option value="online">Online</option>
                    </select>
                </div>
            </div>


            {cartItems.length > 0 && cartItems.map(item => (
                <div key={item.productId} className='w-full grid-cols-2 grid border border-black/10 p-1 rounded-lg gap-2'>
                    <p className='text-xs'>{item.title}</p>
                    <div className='w-full flex flex-row items-center justify-between px-2'>
                        <p>{item.quantity}</p>
                        <p>{item.price}</p>
                        <RemoveFromCart
                            productId={item.productId}
                            onRemove={fetchCart} 
                        />
                    </div>
                </div>
            ))}

           
            <div className='w-full flex flex-col gap-6 items-center justify-center'>
                <div className='w-full flex flex-col gap-2 border-b-2 border-black/10 items-center justify-center'>
                    <div className='w-full flex flex-row items-center justify-between'>
                        <p>Sub Total</p>
                        <p>{totals.subTotal.toFixed(2)}</p>
                    </div>
                    <div className='w-full flex flex-row items-center justify-between'>
                        <p>Discount</p>
                        <p>{totals.discount.toFixed(2)}</p>
                    </div>
                    <div className='w-full flex flex-row items-center justify-between'>
                        <p>Tax</p>
                        <p>{totals.tax.toFixed(2)}</p>
                    </div>
                </div>
                <div className='w-full flex flex-row items-center justify-between'>
                    <p>Total</p>
                    <p>{totals.totlePrice.toFixed(2)}</p>
                </div>
            </div>

            <button className='bg-black text-white p-1 px-4 rounded-2xl cursor-pointer' type='submit'>Place order</button>
        </form>
    )
}

export default Orderform
