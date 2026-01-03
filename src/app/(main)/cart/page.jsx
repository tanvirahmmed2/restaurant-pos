'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import RemoveFromCart from '@/components/buttons/RemoveFromCart'
import { useCart } from '@/components/context/Context'

const Cart = () => {
    const { fetchCart, cartItems, userData  } = useCart()
    const [data, setData] = useState({
        name: userData?.name,
        phone: userData?.number || userData?.email,
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

    if(!userData) return <div className="p-10 text-center text-gray-400">No data found</div>

    return (
        <div className='w-full p-4 flex items-center justify-center'>
          <form onSubmit={handleSubmit} className='w-full max-w-lg mx-auto flex flex-col gap-6 p-4 bg-white rounded-2xl shadow-sm border border-gray-100'>
           
            <div className='w-full flex flex-col gap-4'>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <p 
                        onClick={() => handleMethodChange('dinein')} 
                        className={`flex-1 text-center py-2 rounded-lg cursor-pointer transition-all font-medium ${data.delivery === 'dinein' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
                    > Dine In </p>
                    <p 
                        onClick={() => handleMethodChange('takeout')} 
                        className={`flex-1 text-center py-2 rounded-lg cursor-pointer transition-all font-medium ${data.delivery === 'takeout' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
                    > Take Out </p>
                </div>

                <div className="grid gap-3">
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="name" className="text-xs font-semibold text-gray-500 ml-1">NAME</label>
                        <input type="text" id='name' name='name' value={data.name} onChange={handleChange} className='w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all' />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="phone" className="text-xs font-semibold text-gray-500 ml-1">PHONE</label>
                        <input type="text" id='phone' name='phone' value={data.phone} onChange={handleChange} className='w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all' />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {data.delivery === 'dinein' &&
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="table" className="text-xs font-semibold text-gray-500 ml-1">TABLE</label>
                                <input type="number" id='table' name='table' value={data.table} min={1} onChange={handleChange} className='w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all' />
                            </div>
                        }
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="payment" className="text-xs font-semibold text-gray-500 ml-1">PAYMENT</label>
                            <select name="payment" id="payment" value={data.payment} onChange={handleChange} className='w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none appearance-none cursor-pointer'>
                                <option value="cash">Cash</option>
                                <option value="card">Card</option>
                                <option value="online">Online</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <p className="font-bold text-gray-800 ml-1">Order Items</p>
                {cartItems.length > 0 && cartItems.map(item => (
                    <div key={item.productId} className='w-full flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100'>
                        <div className="flex flex-col">
                            <p className='font-medium text-gray-700'>{item.title}</p>
                            <p className='text-[10px] text-gray-400 uppercase'>Qty: {item.quantity}</p>
                        </div>
                        <div className='flex items-center gap-4'>
                            <p className="font-semibold text-gray-900">${item.price}</p>
                            <RemoveFromCart
                                productId={item.productId}
                                onRemove={fetchCart} 
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className='w-full bg-gray-50 rounded-2xl p-4 flex flex-col gap-2 border border-gray-100'>
                <div className='flex justify-between text-gray-600'>
                    <p>Sub Total</p>
                    <p className="font-medium">${totals.subTotal.toFixed(2)}</p>
                </div>
                <div className='flex justify-between text-gray-600'>
                    <p>Discount</p>
                    <p className="font-medium">-${totals.discount.toFixed(2)}</p>
                </div>
                <div className='flex justify-between text-gray-600'>
                    <p>Tax</p>
                    <p className="font-medium">${totals.tax.toFixed(2)}</p>
                </div>
                <div className='flex justify-between items-center mt-2 pt-2 border-t border-gray-200'>
                    <p className="font-bold text-lg">Total</p>
                    <p className="font-bold text-lg text-black">${totals.totlePrice.toFixed(2)}</p>
                </div>
            </div>

            <button className='w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-zinc-800 transition-colors active:scale-[0.98]' type='submit'>
                Place Order
            </button>
        </form>
        </div>
    )
}

export default Cart