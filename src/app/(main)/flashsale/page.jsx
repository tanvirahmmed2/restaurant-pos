'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Item from '@/components/card/Item'

const FlashSale =  () => {
  const [products, setProducts]= useState([])
  useEffect(()=>{
    const fetchProduct=async()=>{
      try {
        const res= await axios.get('/api/product/discount',{withCredentials:true})
        setProducts(res.data.payload)
      } catch (error) {
        setProducts([])
      }
    }
    fetchProduct()
  },[])
 
  return (
    <div className='w-full flex flex-col items-center p-4 gap-4 min-h-screen'>
      <h1 className='text-3xl text-center '>Flash Sale</h1>
      {
        (products && products.length!==0)? <div className='w-full grid grid-cols-2 h-full sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {
            products.map((item) => (
              <Item item={item} key={item._id}/>
            ))
          }
        </div>: <p>No offer available</p>
      }
    </div>
  )
}

export default FlashSale
