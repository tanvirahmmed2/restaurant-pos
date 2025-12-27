'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import RemoveFromCart from '../buttons/RemoveFromCart'

const Orderform = ({ cartItems }) => {

    const [data, setData] = useState({
        name: '',
        phone: '',
        delivery: 'dinein',
        table: '',
        items: cartItems || [],
        subTotal: '',
        discount: '',
        tax: '',
        totlePrice: '',
        payment: ''
    })

    
    useEffect(() => {
        setData(prev => ({
            ...prev,
            items: cartItems || []
        }))
    }, [cartItems])

    const handleChange = (e) => {
        const { name, value } = e.target
        setData((prev) => ({ ...prev, [name]: value }))
    }

    const handleMethodChange = (method) => {
        setData((prev) => ({ ...prev, delivery: method }))
    }

    const handleRemoveItem = (removedProductId) => {
        setData(prev => ({
            ...prev,
            items: prev.items.filter(item => item.productId !== removedProductId)
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit} className='w-full flex flex-col items-center justify-between gap-6 text-sm'>
            <div className='w-full flex flex-col items-center justify-center gap-2'>
                <div className="flex flex-row items-center justify-between w-full">
                    <p
                        onClick={() => handleMethodChange('dinein')}
                        className={`cursor-pointer px-4 py-1 rounded-full border ${data.delivery === 'dinein' ? 'bg-black text-white' : 'border-gray-300'}`}
                    > Dine In </p>
                    <p
                        onClick={() => handleMethodChange('takeout')}
                        className={`cursor-pointer px-4 py-1 rounded-full border ${data.delivery === 'takeout' ? 'bg-black text-white' : 'border-gray-300'}`}
                    > Take Out </p>
                </div>
                <div className='w-full flex flex-row items-center justify-between'>
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name' name='name' value={data.name} onChange={handleChange} className='px-3 border-2 border-black/10 rounded-lg outline-none' />
                </div>
                <div className='w-full flex flex-row items-center justify-between'>
                    <label htmlFor="phone">Phone</label>
                    <input type="number" id='phone' name='phone' value={data.phone} onChange={handleChange} min={1} className='px-3 border-2 border-black/10 rounded-lg outline-none' />
                </div>

                {data.delivery === 'dinein' &&
                    <div className='w-full flex flex-row items-center justify-between'>
                        <label htmlFor="table">Table</label>
                        <input type="number" id='table' name='table' value={data.table} min={1} onChange={handleChange} className='px-3 border-2 border-black/10 rounded-lg outline-none' />
                    </div>
                }
            </div>

            {data.items && data.items.length > 0 && data.items.map((item) => (
                <div key={item.productId} className='w-full grid-cols-2 grid border border-black/10 p-1 rounded-lg gap-2'>
                    <p className='text-xs'>{item.title}</p>
                    <div className='w-full flex flex-row items-center justify-between'>
                        <p>{item.quantity}</p>
                        <p>{item.price}</p>
                        <RemoveFromCart
                            productId={item.productId}
                            onRemove={() => handleRemoveItem(item.productId)} // ✅ update UI
                        />
                    </div>
                </div>
            ))}

            {/* Summary */}
            <div className='w-full flex flex-col gap-6 items-center justify-center'>
                <div className='w-full flex flex-col gap-2 border-b-2 border-black/10 items-center justify-center'>
                    <div className='w-full flex flex-row items-center justify-between'>
                        <p>Sub Total</p>
                        <p>123</p>
                    </div>
                    <div className='w-full flex flex-row items-center justify-between'>
                        <p>Discount</p>
                        <p>123</p>
                    </div>
                    <div className='w-full flex flex-row items-center justify-between'>
                        <p>Tax</p>
                        <p>123</p>
                    </div>
                </div>
                <div className='w-full flex flex-row items-center justify-between'>
                    <p>Total</p>
                    <p>123</p>
                </div>
            </div>

            <button className='bg-black text-white p-1 px-4 rounded-2xl' type='submit'>Place order</button>
        </form>
    )
}

export default Orderform
