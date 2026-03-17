'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Context } from '../context/Context'

const Intro = () => {
  const { siteData } = useContext(Context)
  const [products, setProducts] = useState()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/product', { withCredentials: true })
        setProducts(response.data.payload)
      } catch (error) {
        console.log(error)
        setProducts(null)
      }
    }
    fetchProducts()
  }, [])


  if (!products || products.length === 0) return null

  const randomIndex = Math.floor(Math.random() * products.length)
  const product = products[randomIndex]

  return (
    <section className='relative w-full min-h-screen flex flex-col  items-center justify-center overflow-hidden '>

      <div className="absolute inset-0 -z-20">
        <Image
          src={product.image}
          alt={product?.title}
          fill
          priority
          className='object-cover opacity-60 transition-opacity min-h-200 duration-700 blur-xl'
        />
      </div>

      <div className='z-10 text-center px-6 flex flex-col md:flex-row items-center justify-center gap-8'>
        <div className='w-full flex flex-col items-center justify-center md:items-start'>
          <h2 className='text-sky-400 uppercase tracking-[0.3em] text-sm mb-4 font-sans font-bold'>
            Welcome to
          </h2>
          <h1 className='text-6xl md:text-8xl font-serif text-white mb-6 drop-shadow-2xl'>
            {siteData?.title || 'Grand Kitchen'}
          </h1>
          <p className='text-white/80 text-lg md:text-2xl font-light max-w-2xl mb-10'>
            Featuring today: <span className="text-sky-300 font-medium">{product?.title}</span>.
            Experience authentic flavors crafted with passion.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Link href='/menu' className='w-48 py-4 bg-sky-600 hover:bg-sky-500 text-white transition-all duration-300 rounded-full font-semibold tracking-wide shadow-lg'>
              VIEW MENU
            </Link>
            <Link href='/reservation' className='w-48 py-4 border border-white/30 hover:bg-white bg-white/40 hover:text-black text-white transition-all duration-300 rounded-full font-semibold tracking-wide backdrop-blur-sm'>
              BOOK A TABLE
            </Link>
          </div>

        </div>
        <motion.div initial={{opacity:0, scale:0.8}} whileInView={{opacity:1, scale:1}} transition={{duration:0.5}} className='w-1/2 hidden md:flex p-2 overflow-hidden aspect-square'>
          <Image src={product.image} alt='product image' width={1000} height={1000} className='w-full object-cover aspect-square overflow-hidden rounded-2xl shadow border border-black/20'/>
        </motion.div>
      </div>

    </section>
  )
}

export default Intro