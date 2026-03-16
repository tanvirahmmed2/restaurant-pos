import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='w-full p-4 bg-blue-950/70 text-white border-t-2 border-black/10 flex flex-col items-center justify-center gap-4'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2'>
        <div className='w-full flex flex-col gap-1'>
          <h1>Sara's Dine</h1>
          <Link className='opacity-60' href={'/'}>Visit Branch</Link>

        </div>
        <div className='w-full flex flex-col gap-1'>
          <h1>Privacy & Policy</h1>
          <Link className='opacity-60' href={'/'}>Privacy</Link>
          <Link className='opacity-60' href={'/'}>Payments</Link>
          <Link className='opacity-60' href={'/'}>Orders</Link>

        </div>
        <div className='w-full flex flex-col gap-1'>
          <h1>My Dashboard</h1>
          <Link className='opacity-60' href={'/login'}>Access</Link>
          <Link className='opacity-60' href={'/profile'}>Profile</Link>
          <Link className='opacity-60' href={'/recovery'}>Recovery</Link>

        </div>
        <div className='w-full flex flex-col gap-1'>
          <h1>Management</h1>
          <Link className='opacity-60' href={'/staff-login'}>Login</Link>
          <Link className='opacity-60' href={'/manage'}>Access</Link>
          <Link className='opacity-60' href={'/help'}>Help</Link>

        </div>


      </div>

      <p>Developed by <Link href={'https://tanvirahmmed.vercel.app/'} className='font-semibold py-6'>Tanvir Ahmmed</Link></p>

    </div>
  )
}

export default Footer
