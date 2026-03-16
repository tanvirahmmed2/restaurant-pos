import DeleteProduct from '@/components/buttons/DeleteProduct'
import UpdateProduct from '@/components/buttons/UpdateProduct'
import AddProduct from '@/components/forms/AddProduct'
import { BASE_URL } from '@/lib/database/secret'
import Link from 'next/link'
import React from 'react'

const Products = async () => {
  const res = await fetch(`${BASE_URL}/api/product`, {
    method: 'GET',
    cache: 'no-store'
  })
  const data = await res.json()
  const products = data.payload
  return (
    <div className='w-full p-4 flex flex-col items-center gap-6'>
      <h1 className='text-2xl font-semibold w-full text-center border-b-2 border-black/10'>Products</h1>
      <AddProduct />
      <div className='w-full flex flex-col items-center justify-center gap-4'>
        <h1 className='text-xl font-semibold text-center'>Project List</h1>
        <div className='w-full grid grid-cols-4'>
          <p>Title</p>
          <p>Price</p>
          <p>Stock</p>
          <p>Action</p>
        </div>
        {
          products && products.map((product) => (
            <div key={product._id} className='w-full grid grid-cols-4'>
              <Link href={`/menu/${product.slug}`}>{product?.title}</Link>
              <p>{product.price}</p>
              <p>{product.isAvailable ? 'Available' : "Unavailable"}</p>
              <div className='w-full flex flex-row gap-4 items-center'>
                <UpdateProduct slug={product.slug} />
                <DeleteProduct id={product._id} />
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Products
