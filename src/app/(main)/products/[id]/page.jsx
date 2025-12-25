import { BASE_URL } from '@/lib/database/secret'
import Image from 'next/image'
import React from 'react'

const SingleProduct = async ({ params }) => {
        const {id} = await params

  const res = await fetch(`${BASE_URL}/api/product/${id}`, { method: "GET", cache: 'no-store' })
  const data = await res.json()
  const product = data.payload
  console.log(product)
  return (
    <div>
<h1>{product.title}</h1>
<Image src={product.image} alt={product.title} width={1000} height={1000}/>
    </div>
  )
}

export default SingleProduct
