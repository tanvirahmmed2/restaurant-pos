'use client'
import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../context/Context'
import Link from 'next/link'
import Image from 'next/image'
import { MdDeleteOutline } from 'react-icons/md'
import axios from 'axios'
import { toast } from 'react-toastify'

const del = ['takeaway', 'takein']
const pay = ['bkash', 'card', 'nagad', 'rocket', 'cash']

const UserOrderForm = () => {
    const { subTotal, totalPrice, totalDiscount, addToCart, removeFromCart, decreaseQuantity, clearCart, userData, cart } = useContext(Context)

    const [formData, setFormData] = useState({
        name: userData?.name || '',
        phone: userData?.phone || '',
        deliveryMethod: 'takein',
        paymentMethod: 'bkash',
        transactionId: '',
    })

    useEffect(() => {
        if (userData) {
            setFormData(prev => ({
                ...prev,
                name: userData.name || '',
                phone: userData.phone || ''
            }))
        }
    }, [userData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleOrder = async (e) => {
        e.preventDefault()
        try {
            const orderPayload = {
                ...formData,
                items: cart.items,
                subTotal,
                totalDiscount,
                totalPrice,
                status: 'pending'
            }
            const res = await axios.post('/api/order', orderPayload, { withCredentials: true })
            toast.success(res.data.message)
            clearCart()
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to place order")
        }
    }

    return (
        <div className={` w-full min-h-screen  flex flex-col items-center p-4`}>
            {
                cart?.items.length === 0 ? <div className='w-full flex flex-col items-center gap-7 '>
                    <p>No Item Found</p>
                    <Link href={'/menu'} className='px-6 p-1 border border-black/20 rounded-2xl'>Menu</Link>
                </div> :
                    <div className='w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-4 max-w-4xl mx-auto'>
                        <div className='w-full flex flex-col items-center justify-center gap-4'>
                            <div className='w-full flex flex-col items-center justify-center gap-4'>
                                <h1 className='text-2xl font-semibold'>Items</h1>
                                <div className='w-full flex flex-col items-center justify-between gap-4'>
                                    <div className='w-full flex flex-col items-center gap-2'>
                                        {
                                            cart?.items.length > 0 && cart?.items.map((item) => (
                                                <div key={item._id} className='w-full grid grid-cols-5 border border-black/20 p-1 rounded-lg gap-2'>
                                                    <div className='w-full col-span-1'>
                                                        <Image src={item?.image} alt='item image' width={50} height={50} className='w-full aspect-square rounded-lg object-cover overflow-hidden' />
                                                    </div>
                                                    <div className='w-full col-span-4 flex flex-col gap-2'>
                                                        <div className='w-full flex flex-row items-center justify-between'>
                                                            <p className='font-semibold'>{item.title}</p>
                                                            <p>{item.salePrice}</p>
                                                        </div>
                                                        <div className='w-full grid grid-cols-4 justify-items-center'>
                                                            <button className='bg-green-500 rounded-full text-white px-6 cursor-pointer' onClick={() => addToCart(item)}>+</button>
                                                            <p>{item.quantity}</p>
                                                            <button className='bg-green-500 rounded-full text-white px-6 cursor-pointer' onClick={() => decreaseQuantity(item._id)}>-</button>
                                                            <button className='text-xl cursor-pointer' onClick={() => removeFromCart(item._id)}><MdDeleteOutline /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <button className='px-6 p-1 border border-black/20 rounded-2xl cursor-pointer' onClick={() => clearCart()}>Clear cart</button>
                        </div>

                        <form onSubmit={handleOrder} className='bg-slate-700 text-white w-full flex flex-col items-center justify-center gap-4 p-2 rounded-2xl'>
                            <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="name">Name</label>
                                <input type="text" name='name' id='name' required onChange={handleChange} value={formData.name} className='w-full px-3 p-1 outline-none border bg-white text-black rounded-lg' />
                            </div>
                            <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="phone">Phone</label>
                                <input type="number" name='phone' id='phone' onChange={handleChange} required value={formData.phone} className='w-full px-3 p-1 outline-none border bg-white text-black rounded-lg' />
                            </div>
                            <div className='w-full flex flex-row items-center justify-between '>
                                <p>SubTotal</p>
                                <p>{subTotal}</p>
                            </div>
                            <div className='w-full flex flex-row items-center justify-between '>
                                <p>Discount</p>
                                <p>{totalDiscount}</p>
                            </div>
                            <div className='w-full flex flex-row items-center justify-between text-2xl font-semibold'>
                                <p>Total Price</p>
                                <p>{totalPrice}</p>
                            </div>
                            <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="deliveryMethod">Delivery Method</label>
                                <select name="deliveryMethod" id="deliveryMethod" onChange={handleChange} value={formData.deliveryMethod} required className='w-full px-3 p-1 outline-none border uppercase bg-white text-black rounded-lg'>
                                  
                                    {
                                        del.map((p) => (
                                            <option value={p} key={p} className='uppercase'>{p}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='w-full flex flex-col gap-1'>
                                <label htmlFor="paymentMethod">Payment Method</label>
                                <select name="paymentMethod" id="paymentMethod" onChange={handleChange} value={formData.paymentMethod} required className='w-full px-3 p-1 outline-none border bg-white text-black rounded-lg'>
                                    
                                    {
                                        pay.map((p) => (
                                            <option value={p} key={p}>{p}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            {
                                formData.paymentMethod !== 'cash' &&
                                <div className='w-full flex flex-col gap-1'>
                                    <label htmlFor="transactionId">Transaction ID</label>
                                    <input type="text" name='transactionId' id='transactionId' onChange={handleChange} value={formData.transactionId} className='w-full px-3 p-1 outline-none border bg-white text-black rounded-lg' />
                                </div>
                            }
                            <button type='submit' className='w-full p-1 bg-white rounded-lg cursor-pointer text-black text-center'>Place Order</button>
                        </form>
                    </div>
            }
        </div>
    )
}

export default UserOrderForm