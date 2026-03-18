'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import { toast } from 'react-toastify'
import axios from 'axios'
import Image from 'next/image'
import { MdDeleteOutline } from 'react-icons/md'

const payment = [
    'bkash', 'card', 'nagad, rocket', 'cash'
]
const delivery = [
    'takeaway', 'takein'
]

const Orderform = () => {
    const { addToCart, removeFromCart, decreaseQuantity, clearCart, fetchCart, cart } = useContext(Context)

    const [subTotal, setSubTotal] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalDiscount, setTotalDiscount] = useState(0)
    const [formData, setFormData] = useState({
        phone: '',
        paymentMethod: 'cash',
        subTotal: subTotal,
        totalDiscount: totalDiscount,
        totalPrice: totalPrice,
        deliveryMethod: 'takein',
        items: cart?.items || [],
        paymentStatus: 'paid',
        transactionId: '',
        status:'confirmed',
        table:''

    })


    const [popUp, setPopUp] = useState(false)

    useEffect(() => {
        let tempSubTotal = 0
        let tempTotalPrice = 0

        cart?.items.forEach((item) => {
            tempSubTotal += item.price * item.quantity
            tempTotalPrice += item.salePrice
        })

        setSubTotal(tempSubTotal)
        setTotalPrice(tempTotalPrice)
        setTotalDiscount(tempSubTotal - tempTotalPrice)
    }, [cart])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalOrderData = {
            ...formData,
            phone: formData.phone.trim() || '01900000000',
            subTotal,
            totalDiscount,
            totalPrice,
            items: cart?.items || []
        };

        if (finalOrderData.items.length === 0) {
            return toast.error("Cart is empty");
        }

        try {
            const res = await axios.post('/api/order', finalOrderData, { withCredentials: true });
            toast.success(res.data.message);
            setPopUp(false);
            clearCart();
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to place order');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='w-full flex flex-col items-center gap-4 relative'>
            <div className='w-full flex flex-col gap-1'>
                <label htmlFor="phone">Phone</label>
                <input type="text" name='phone' id='phone' onChange={handleChange} value={formData.phone} className='w-full px-3 p-1 border border-black/20 outline-none placeholder:italic' placeholder='Customer contact number' />
            </div>
            <div className='w-full grid grid-cols-9 text-xs justify-items-center gap-1 border p-1 border-black/20'>
                <p className='col-span-1'>Image</p>
                <p className='col-span-3'>Title</p>
                <p className='col-span-1'>Quantity</p>
                <p className='col-span-1'>Price</p>
                <p className='col-span-1'>Discount</p>
                <p className='col-span-1'>Total Price</p>
                <p className='col-span-1'>Remove</p>
            </div>
            {
                cart?.items.length > 0 ? <div className='w-full flex flex-col items-center gap-4 '>

                    {
                        cart.items.map((item) => (
                            <div key={item._id} className='w-full grid grid-cols-9  justify-items-center gap-1 even:bg-slate-100'>
                                <div className='col-span-1 w-full aspect-square overflow-hidden'>
                                    <Image src={item.image} alt='item image' width={50} height={50} className='w-full aspect-square object-cover overflow-hidden' />
                                </div>
                                <p className='col-span-3 flex items-center justify-center'>{item.title}</p>
                                <div className='col-span-1  flex flex-row items-center justify-between w-full'>
                                    <button className='bg-green-500 px-2 rounded-full text-white cursor-pointer' type='button' onClick={() => addToCart(item)}>+</button>
                                    <p>{item.quantity}</p>
                                    <button className='bg-green-500 px-2 rounded-full text-white cursor-pointer' type='button' onClick={() => decreaseQuantity(item._id)}>-</button>
                                </div>
                                <p className='col-span-1 flex items-center justify-center'>{item.price}</p>
                                <p className='col-span-1 flex items-center justify-center'>{item.discount}</p>
                                <p className='col-span-1 flex items-center justify-center'>{item.salePrice}</p>
                                <button className='col-span-1 flex items-center justify-center text-xl cursor-pointer' onClick={() => removeFromCart(item._id)}><MdDeleteOutline /></button>
                            </div>
                        ))
                    }
                    <div className='bg-slate-700 text-white p-2 rounded-lg w-full flex flex-col gap-3 font-mono text-xs sm:text-base'>
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
                        <button className='w-full p-1 bg-white rounded-lg cursor-pointer text-black' type='button' onClick={() => setPopUp(true)}>Next</button>
                    </div>
                    <button type='button' className='px-5 p-1 bg-slate-700 cursor-pointer text-white rounded-2xl' onClick={() => clearCart()}>Clear</button>

                </div> : <p>Please add an item</p>
            }
            {
                popUp && <div className='flex items-center justify-center fixed inset-0 backdrop-blur-8 bg-black/40 z-50'>
                    <div className='w-auto mx-auto flex flex-col items-center justify-center p-4 gap-4 bg-white rounded-xl'>
                        <div className='w-full flex flex-row min-w-70 items-center justify-between text-xl font-semibold'>
                            <p>Total Price</p>
                            <p>{totalPrice}</p>
                        </div>
                        <div className='w-full flex flex-col gap-1'>
                            <label htmlFor="paymentMethod">Payment Method</label>
                            <select name="paymentMethod" id="paymentMethod" onChange={handleChange} required value={formData.paymentMethod} className='w-full px-3 p-1 border border-black/20 outline-none'>
                                <option value="">Select</option>
                                {
                                    payment.map((p) => (
                                        <option value={p} key={p}>{p}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='w-full flex flex-col gap-1'>
                            <label htmlFor="deliveryMethod">Delivery</label>
                            <select name="deliveryMethod" id="deliveryMethod" onChange={handleChange} required value={formData.deliveryMethod} className='w-full px-3 p-1 border border-black/20 outline-none'>
                                <option value="">Select</option>
                                {
                                    delivery.map((d) => (
                                        <option value={d} key={d}>{d}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='w-full flex flex-col gap-1'>
                            <label htmlFor="table">Table</label>
                            <input name="table" id="table" onChange={handleChange} value={formData.table} className='w-full px-3 p-1 border border-black/20 outline-none'/>
                        </div>
                        <div className='w-full flex flex-row items-center justify-center gap-2'>
                            <button className='w-full border border-slate-700/20 rounde-lg cursor-pointer p-1 ' type='button' onClick={() => setPopUp(false)}>Back</button>
                            <button className='w-full bg-slate-600 cursor-pointer rounde-lg p-1 text-white' type='submit'>Confirm</button>
                        </div>
                    </div>
                </div>
            }
        </form>
    )
}

export default Orderform
