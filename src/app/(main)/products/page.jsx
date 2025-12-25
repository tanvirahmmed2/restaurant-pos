import { BASE_URL } from '@/lib/database/secret'
import React from 'react'

const Products = async() => {
    const res= await fetch(`${BASE_URL}/api/product`,{
        method: 'GET',
        cache: 'no-store'
      })
      const data=await res.json()
      const products= data.payload
  return (
    <div>
      
    </div>
  )
}

export default Products
