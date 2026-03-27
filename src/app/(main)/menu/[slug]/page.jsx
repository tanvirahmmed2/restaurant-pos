import AddtoCart from '@/components/buttons/AddtoCart'
import SameCategoryProducts from '@/components/page/SameCategoryProducts'
import { BASE_URL } from '@/lib/database/secret'
import Image from 'next/image'
import React from 'react'

const SingleProduct = async ({ params }) => {
  const { slug } = await params

  const res = await fetch(`${BASE_URL}/api/product/${slug}`, { method: "GET", cache: 'no-store' })
  const data = await res.json()
  const product = data.payload

  if (!product) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-xl font-medium text-slate-700">No data found</p>
    </div>
  )

  return (
    <div className='w-full min-h-screen bg-slate-50 pb-20'>
      <div className='w-full bg-slate-700 h-64 relative' />

      <div className='max-w-5xl mx-auto px-4 -mt-32 relative z-10'>
        <div className='bg-white rounded-3xl shadow-xl overflow-hidden'>
          
          <div className='flex flex-col w-full relative aspect-square'>
            <div className='w-full aspect-square overflow-hidden relative'>
              <div className='absolute right-4 top-4 z-20'>
                {product.isAvailable ? (
                  <span className='text-[11px] font-bold uppercase tracking-widest text-white py-1.5 px-4 rounded-full bg-emerald-500 shadow-lg'>
                    Available
                  </span>
                ) : (
                  <span className='text-[11px] font-bold uppercase tracking-widest text-white py-1.5 px-4 rounded-full bg-rose-500 shadow-lg'>
                    Out of Stock
                  </span>
                )}
              </div>
              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                className="object-cover aspect-square overflow-hidden w-full"
              />
            </div>

            <div className='w-full p-2 sm:p-4 md:p-12 bg-white flex flex-col justify-center gap-1'>
              <div>
                <h1 className='text-xl md:text-5xl font-extrabold text-slate-900 mb-4'>
                  {product.title}
                </h1>
                <p className='text-slate-600 leading-relaxed md:text-lg'>
                  {product.description}
                </p>
              </div>

              <div className=" border-t border-slate-100 flex items-center justify-between">
                <span className=" text-lg md:text-4xl font-light text-slate-900">
                  ${product.price}
                </span>
                <AddtoCart product={product}/>
              </div>
            </div>
          </div>
        </div>

        <SameCategoryProducts id={product.categoryId} />
      </div>
    </div>
  )
}

export default SingleProduct