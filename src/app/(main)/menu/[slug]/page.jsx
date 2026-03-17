
import SameCategoryProducts from '@/components/page/SameCategoryProducts'
import { BASE_URL } from '@/lib/database/secret'
import Image from 'next/image'
import React from 'react'

const SingleProduct = async ({ params }) => {
  const { slug } = await params

  const res = await fetch(`${BASE_URL}/api/product/${slug}`, { method: "GET", cache: 'no-store' })
  const data = await res.json()
  const product = data.payload
  if (!product) return <p>No data found</p>
  return (
    <div className='w-full min-h-screen flex flex-col gap-20 items-center justify-center  rounded-2xl'>
      <div className='w-full md:w-5/6 lg:w-3/4 mx-auto flex flex-col md:flex-row gap-8 bg-white m-6 p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100'>

        <div className='flex-1 group'>
          <div className='relative aspect-square overflow-hidden rounded-xl bg-slate-50 border border-slate-100'>
            <div className='absolute right-3 top-3 z-10'>
              {product.isAvailable ? (
                <span className='text-[12px] font-bold uppercase tracking-wider text-white py-1.5 px-3 rounded-full bg-emerald-500'>
                  Available
                </span>
              ) : (
                <span className='text-[12px] font-bold uppercase tracking-wider text-white py-1.5 px-3 rounded-full bg-rose-500 '>
                  Out of Stock
                </span>
              )}
            </div>
            <Image
              src={product.image}
              alt={product.title}
              width={1000}
              height={1000}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        <div className='flex-1 flex flex-col justify-center py-2'>
          <div className="space-y-4">
            <h1 className='text-3xl md:text-4xl font-bold text-slate-900 leading-tight'>
              {product.title}
            </h1>
            <p className='text-slate-600 leading-relaxed text-lg'>
              {product.description}
            </p>

            
          </div>
        </div>
      </div>
      <SameCategoryProducts id={product.categoryId}/>
    </div>
  )
}

export default SingleProduct
