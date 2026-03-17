'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const Item = ({item}) => {
  return (
    <motion.div initial={{opacity:0, scale:0.8}} whileInView={{opacity:1, scale:1}} transition={{duration:0.5}} className='w-full flex flex-col items-center justify-center gap-1 bg-white rounded-tl-[100px] shadow overflow-hidden p-1 rounded-lg'>
      <div className='w-full overflow-hidden'>
        <Image src={item.image} alt={item.title} width={1000} height={1000} className='w-full aspect-square object-cover overflow-hidden rounded-lg hover:scale-[1.01] transform ease-in-out duration-500'/>
      </div>
      <h1 className='w-full text-center'>{item.title}</h1>
      {
        item.discount !==0 && item.discount !==null? <div>
          <p className='line-through text-sm text-red-500'>৳{item.price}</p>
          <p className='font-semibold'>৳{item.price-item.discount}</p>
        </div>:<p className='font-semibold'>৳{item.price}</p>
      }
    </motion.div>
  )
}

export default Item
