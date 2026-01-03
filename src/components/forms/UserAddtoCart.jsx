'use client'
import React, { useState } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useCart } from '../context/Context';

const UserAddtoCart = ({ product}) => {
  const {fetchCart}= useCart()
  const [quantity, setQuantity] = useState(1)

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  const addtoCart = async () => {
    try {
      const response = await axios.post('/api/user/cart', {
        title: product.title,
        productId: product._id,
        quantity: quantity
      }, { withCredentials: true })
      toast.success(response.data.message)
      if (fetchCart) fetchCart()
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to add to cart')
    }
  }

  return (
    <div className='w-full flex flex-col items-center justify-center gap-2'>
      <div className='w-full flex flex-row items-center justify-between'>
        <div className='w-full'>
          <p>Price: <span className='text-[8px] italic'>BDT</span> <span className='text-xl font-semibold'>{product.price}</span></p>
        </div>
        <div className='w-full flex flex-row items-center justify-between'>
          <button className='text-xl font-semibold hover:bg-black/10 p-2 rounded-full cursor-pointer' onClick={decreaseQuantity}><IoIosArrowBack /></button>
          <p>{quantity}</p>
          <button className='text-xl font-semibold hover:bg-black/10 p-2 rounded-full cursor-pointer' onClick={increaseQuantity}><IoIosArrowForward /></button>
        </div>
      </div>
      <button onClick={addtoCart} className='w-full flex flex-row items-center justify-center gap-2 bg-sky-300 hover:bg-black/70 text-white rounded-lg cursor-pointer'>Cart <CiShoppingCart className='text-xl' /></button>
    </div>
  )
}

export default UserAddtoCart