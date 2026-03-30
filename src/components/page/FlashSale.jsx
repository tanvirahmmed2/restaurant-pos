'use client'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Context } from '../context/Context'
import { BiCartDownload } from 'react-icons/bi'

const FlashSale = () => {
  const { addToCart } = useContext(Context)
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get('/api/product/discount/latest', { withCredentials: true })
        setProducts(res.data.payload)
      } catch (error) {
        setProducts([])
      }
    }
    fetchProduct()
  }, [])

  if (!products || products.length === 0) return console.log('No product found')
  return (
    <div className='w-full flex flex-col items-center justify-center p-4 gap-4 '>
      <h1 className='text-3xl text-center '>Flash Sale!</h1>
      {
        products && <div className='w-full flex flex-col items-center justify-center gap-20'>
          {
            products.map((item) => (
              <div key={item._id} className='w-full max-w-4xl gap-4 md:gap6 flex flex-row items-center even:flex-row-reverse'>

                <motion.div initial={{opacity:0, x:-30}} whileInView={{opacity:1, x:0}} transition={{duration:0.9}} className='w-full flex items-center justify-center'>
                  <Link href={`/menu/${item.slug}`} className='w-full aspect-square overflow-hidden p-2 rounded-full shadow'>
                    <Image src={item.image} alt='image' width={500} height={500} className='w-full aspect-square overflow-hidden object-cover shadow rounded-full' />
                  </Link>
                </motion.div>
                <motion.div initial={{opacity:0, x:30}} whileInView={{opacity:1, x:0}} transition={{duration:0.9}} className='w-full flex flex-col gap-1'>
                  <p className='font-semibold text-xl'>{item.title}</p>
                  <p className='text-xs'>{item.categoryId.name}</p>
                  <p>{item.description}</p>
                  {
                    item.discount !== 0 && item.discount !== null ? <div>
                      <p className='line-through text-sm text-red-500'>৳{item.price}</p>
                      <p className='font-semibold'>৳{item.price - item.discount}</p>
                    </div> : <p className='font-semibold'>৳{item.price}</p>
                  }
                  <button onClick={() => addToCart(item)} className='bg-slate-700 hover:bg-slate-500 shadow shadow-black text-white p-1 px-5 w-full flex items-center justify-center rounded-2xl cursor-pointer'><BiCartDownload/></button>
                </motion.div>
              </div>
            ))
          }
        </div>
      }
      <Link href={'/flashsale'} className='border border-black/20 rounded-2xl px-5 p-1 shadow cursor-pointer'>Load More</Link>
    </div>
  )
}

export default FlashSale
