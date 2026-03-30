'use client'
import Image from 'next/image'
import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Context } from '../context/Context'
import { BiCartDownload } from "react-icons/bi";

const Item = ({ item }) => {
  const { addToCart } = useContext(Context)

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className='w-full flex flex-col items-center justify-between gap-1 bg-white shadow overflow-hidden p-1 sm:p-2 rounded-lg group'>
      <div className='w-full overflow-hidden'>
        <Image src={item.image} alt={item.title} width={1000} height={1000} className='w-full aspect-square object-cover overflow-hidden rounded-lg hover:scale-110 transform ease-in-out duration-500' />
      </div>
      <p className='text-xs'>{item.categoryId.name}</p>
      <Link href={`/menu/${item.slug}`} className='w-full text-lg'>{item.title}</Link>

      <div className='w-full flex flex-row items-center justify-between px-2'>
        {
          item.discount !== 0 && item.discount !== null ? <div>
            <p className='line-through text-sm text-red-500'>৳{item.price}</p>
            <p className='font-semibold'>৳{item.price - item.discount}</p>
          </div> : <p className='font-semibold'>৳{item.price}</p>
        }
        <button onClick={()=>addToCart(item)} className='bg-slate-700 text-white hover:bg-slate-500 text-xl p-2 rounded-full cursor-pointer shadow shadow-black'><BiCartDownload /></button>
      </div>

    </motion.div>
  )
}

export default Item
