'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Context } from '../context/Context'

const Intro = () => {
  const { siteData } = useContext(Context)
  const [products, setProducts] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/product/discount/latest', { withCredentials: true })
        setProducts(response.data.payload)
      } catch (error) {
        setProducts(null)
      }
    }
    fetchProducts()
  }, [])

  const product = useMemo(() => {
    if (!products || products.length === 0) return null
    return products[Math.floor(Math.random() * products.length)]
  }, [products])

  if (!product) return null

  return (
    <section className='relative w-full min-h-screen py-40 lg:py-0 flex items-center justify-center overflow-hidden bg-slate-500/40'>
      
      <div className="absolute inset-0 -z-10">
        <Image
          src={product.image}
          alt="bg"
          fill
          priority
          className='object-cover opacity-30 blur-3xl scale-110'
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/50 via-transparent to-slate-950" />
      </div>

      <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10'>
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className='text-center lg:text-left space-y-8 '
        >
          <div className="space-y-2">
            <h2 className='text-sky-400 uppercase tracking-[0.5em] text-xs font-bold'>
              Premium Dining Experience
            </h2>
            <h1 className='text-5xl md:text-8xl font-serif text-white leading-tight'>
              {siteData?.title || 'Grand Kitchen'}
            </h1>
          </div>

          <p className='text-slate-300 text-lg md:text-xl font-light max-w-xl leading-relaxed mx-auto lg:mx-0'>
            Savor perfection with our chef&apos;s special: 
            <span className="text-white font-semibold italic block md:inline ml-1 text-2xl md:text-xl">
               &ldquo;{product?.title}&rdquo;
            </span>
          </p>

          <div className='flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4'>
            <Link href='/menu' className='group relative px-10 py-4 bg-sky-600 text-white rounded-full font-bold overflow-hidden transition-all shadow-2xl shadow-sky-900/20'>
              <span className="relative z-10">EXPLORE MENU</span>
              <div className="absolute inset-0 bg-sky-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            
            <Link href='/reservation' className='px-10 py-4 border border-white/20 hover:border-white/60 text-white rounded-full font-bold backdrop-blur-md transition-all'>
              BOOK A TABLE
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className='relative flex justify-center items-center'
        >
          {/* Decorative Ring */}
          <div className="absolute inset-0 border border-sky-500/20 rounded-full animate-[spin_20s_linear_infinite] scale-110 hidden md:block" />
          
          <div className='relative w-full aspect-square max-w-125 group'>
             <Image 
              src={product.image} 
              alt={product.title} 
              width={600} 
              height={600} 
              className='w-full h-full object-cover rounded-full shadow-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-500'
            />
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl hidden md:block"
            >
              <p className="text-slate-500 text-xs font-bold uppercase tracking-tighter">Chef's Choice</p>
              <p className="text-2xl font-serif font-black text-slate-900">
                ${product.price}
              </p>
            </motion.div>
          </div>
        </motion.div>

      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <div className="w-px h-12 bg-linear-to-b from-white to-transparent mx-auto" />
      </motion.div>
    </section>
  )
}

export default Intro