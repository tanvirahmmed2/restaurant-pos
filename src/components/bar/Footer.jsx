import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='w-full p-4 bg-blue-50 border-t-2 border-black/10 flex flex-col items-center justify-center gap-4'>
      <div className='w-full flex flex-row items-center justify-center gap-4'>
        <Link href={'/support'}>Support</Link>
        <Link href={'/reservation'}>Reservation</Link>

      </div>

      <p>Developed by <Link href={'https://tanvirahmmed.vercel.app/'} className='font-semibold'>Tanvir Ahmmed</Link></p>

    </div>
  )
}

export default Footer
