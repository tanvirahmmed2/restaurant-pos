'use client'
import Link from 'next/link'
import React, { useContext } from 'react'
import { Context } from '../context/Context'

const Footer = () => {
  const {siteData}= useContext(Context)
  return (
    <div className='w-full p-4 bg-slate-700 text-white border-t-2 border-black/10 flex flex-col items-center justify-center gap-4'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'>
        <div className='w-full flex flex-col gap-1'>
          <h1 className='text-3xl font-black'>{siteData?.title || "Dine"}</h1>
          <p className='opacity-60' >{siteData?.address}</p>

        </div>
        <div className='w-full flex flex-col gap-1'>
          <h1>Privacy & Policy</h1>
          <Link className='opacity-60' href={'/'}>Privacy</Link>
          <Link className='opacity-60' href={'/'}>Payments</Link>
          <Link className='opacity-60' href={'/'}>Orders</Link>

        </div>
        <div className='w-full flex flex-col gap-1'>
          <h1>Quick Links</h1>
          <Link className='opacity-60' href={'/category'}>Categories</Link>
          <Link className='opacity-60' href={'/flashsale'}>Flash Sale</Link>
          <Link className='opacity-60' href={'/recovery'}>Recovery</Link>
          <Link className='opacity-60' href={'/support'}>Support</Link>

        </div>
        <div className='w-full flex flex-col gap-1'>
          <h1>My Dashboard</h1>
          <Link className='opacity-60' href={'/login'}>Login</Link>
          <Link className='opacity-60' href={'/manage'}>Access</Link>
          <Link className='opacity-60' href={'/help'}>Help</Link>

        </div>


      </div>

      <p>Developed by <Link href={'https://disibin.com/'} className='font-semibold '>Disibin</Link></p>

    </div>
  )
}

export default Footer
