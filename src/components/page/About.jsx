import { BASE_URL } from '@/lib/database/secret'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const About = async () => {
  const res = await fetch(`${BASE_URL}/api/product/latest`, { method: 'GET', cache: 'no-store' })
  const data = await res.json()
  if (!data.success) return console.log('no data found')
  const product = data.payload[1]
  return (
    <div className='w-full flex flex-col md:flex-row items-center justify-center gap-2 min-h-150 p-4 bg-white'>
      <div className='w-full flex-col items-center justify-center gap-4 flex '>
        <h1 className='text-5xl'>About Us</h1>
        <p className='font-semibold text-xl'>Every great meal begins with a story.</p>
        <p>Ours started with a simple dream — to create a place where food feels like home, flavors carry memories, and every guest is treated like family. What began as a small kitchen filled with passion has grown into a restaurant built on love, dedication, and respect for good food.</p>
        <p>We believe that great taste comes from honesty. That’s why we carefully select fresh ingredients, balance tradition with creativity, and cook every dish with attention and care. Each recipe reflects our roots, inspired by classic flavors and refined for today’s table.</p>
        <p>Our restaurant is more than just a place to eat — it’s a place to gather, celebrate, and slow down. From quiet dinners to joyful moments shared with friends and family, we’re honored to be part of your everyday memories.</p>
      </div>
      <Link href={`/menu/${product.slug}`} className='w-full'>
        <Image src={product.image} alt={product.title} width={1000} height={1000} className='h-100 w-full object-cover p-1 rounded-lg shadow-sm hover:scale-[1.02] transform ease-in-out duration-500 cursor-pointer' />
      </Link>

    </div>
  )
}

export default About
