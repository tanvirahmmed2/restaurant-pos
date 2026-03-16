import UpdateProductForm from '@/components/forms/UpdateProductForm'
import { BASE_URL } from '@/lib/database/secret'
import React from 'react'

const UpdateProduct = async ({ params }) => {
  const { slug } = await params
  const res = await fetch(`${BASE_URL}/api/product/${slug}`, {
    method: 'GET',
    cache: 'no-store'
  })
  const data = await res.json()
  const product= data.payload
  if(!product) {
    return <p>No data found</p>
  }

  return (
    <div className='w-full flex flex-col items-center p-4 gap-6'>
      <h1 className='text-xl text-center border-b-2 border-black/10 w-full py-2'>Update Product Information</h1>
      <UpdateProductForm product={product}/>
    </div>
  )
}

export default UpdateProduct
