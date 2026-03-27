'use client'
import React, { useContext } from 'react'
import { CiShoppingCart } from "react-icons/ci";
import { Context } from '../context/Context';

const AddtoCart = ({product}) => {
  const {addToCart}=useContext(Context)
  return (
    <button onClick={()=>addToCart(product)} className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-slate-800 transition-colors flex flex-row gap-2 cursor-pointer">Cart <CiShoppingCart className='text-xl'/></button>
  )
}

export default AddtoCart
