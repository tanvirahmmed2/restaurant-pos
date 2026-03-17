'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Item from '../card/Item'
import axios from 'axios'

const FlashSale =  () => {
  const [products, setProducts]= useState([])
  useEffect(()=>{
    const fetchProduct=async()=>{
      try {
        const res= await axios.get('/api/product/discount/latest',{withCredentials:true})
        setProducts(res.data.payload)
      } catch (error) {
        setProducts([])
      }
    }
    fetchProduct()
  },[])
 
  if(!products || products.length===0) return console.log('No product found')
  return (
    <div className='w-full flex flex-col items-center justify-center p-4 gap-4 '>
      <h1 className='text-3xl text-center '>Flash Sale!</h1>
      {
        products && <div className='w-full grid grid-cols-2 h-full  md:grid-cols-3 gap-4'>
          {
            products.map((item) => (
              <Link href={`/menu/${item.slug}`} key={item._id} className='w-full'>
                <Item item={item} />
              </Link>
            ))
          }
        </div>
      }
    </div>
  )
}

export default FlashSale
