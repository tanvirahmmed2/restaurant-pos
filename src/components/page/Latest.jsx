'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Item from '../card/Item'
import axios from 'axios'

const Latest =  () => {
  const [products, setProducts]= useState([])
  useEffect(()=>{
    const fetchProduct=async()=>{
      try {
        const res= await axios.get('/api/product/latest',{withCredentials:true})
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
      <h1 className='text-3xl text-center '>Top Picks</h1>
      {
        products && <div className='w-full grid grid-cols-2 h-full sm:grid-cols-3 md:grid-cols-4 gap-4'>
          {
            products.map((item) => (
              <Item item={item} key={item._id} />
            ))
          }
        </div>
      }
    </div>
  )
}

export default Latest
