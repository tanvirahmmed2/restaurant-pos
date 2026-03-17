import Item from '@/components/card/Item'
import { BASE_URL } from '@/lib/database/secret'
import Link from 'next/link'
import React from 'react'

const CategorySlugPage = async({params}) => {
    const {slug}= await params
    const res= await fetch(`${BASE_URL}/api/category/${slug}`,{
        method:'GET',
        cache:'no-store'
    })

    const data=await res.json()
    if(!data.success) return <p>No data found</p>
    const products= data.payload
    if(!products || products.length ===0) return <p>No product found</p>
  return (
    <div className='w-full min-h-screen flex flex-col items-center'>
      <h1 className='text-2xl font-semibold text-center'>Pick your favourites</h1>
      {
        products && <div className='w-full grid grid-cols-2 h-full sm:grid-cols-3 md:grid-cols-4 gap-4'>
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

export default CategorySlugPage
