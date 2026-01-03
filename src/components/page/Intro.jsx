'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useCart } from '../context/Context'
import axios from 'axios'

const Intro = () => {
  const { siteData } = useCart()
  const [products, setProducts] = useState()

  useEffect(() => {
    const fetchProducts = async() => {
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
    <section className='relative w-full h-200 flex flex-col items-center justify-center overflow-hidden '>

      <div className="absolute inset-0 -z-20">
        <Image
          src={product.image}
          alt={product?.title}
          fill
          priority
          className='object-cover opacity-60 transition-opacity min-h-200 duration-700 blur-xl'
        />
      </div>

      <div className='z-10 text-center px-6'>
        <h2 className='text-sky-400 uppercase tracking-[0.3em] text-sm mb-4 font-sans font-bold'>
          Welcome to
        </h2>
        <h1 className='text-6xl md:text-8xl font-serif text-white mb-6 drop-shadow-2xl'>
          {siteData?.title || 'Grand Kitchen'}
        </h1>
        <p className='text-white/80 text-lg md:text-2xl font-light max-w-2xl mx-auto mb-10 leading-relaxed'>
          Featuring today: <span className="text-sky-300 font-medium">{product?.title}</span>.
          Experience authentic flavors crafted with passion.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
          <Link href='/menu' className='w-48 py-4 bg-sky-600 hover:bg-sky-500 text-white transition-all duration-300 rounded-full font-semibold tracking-wide shadow-lg'>
            VIEW MENU
          </Link>
          <Link href='/reservation' className='w-48 py-4 border border-white/30 hover:bg-white hover:text-black text-white transition-all duration-300 rounded-full font-semibold tracking-wide backdrop-blur-sm'>
            BOOK A TABLE
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Intro