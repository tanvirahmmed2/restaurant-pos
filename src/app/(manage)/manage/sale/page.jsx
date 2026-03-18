import MenuPage from '@/components/page/MenuPage'
import SalesCart from '@/components/page/SalesCart'
import React from 'react'

const page = () => {
  return (
    <div className='w-full flex flex-col md:flex-row items-center md:items-start justify-center'>
        <SalesCart/>
        <MenuPage/>
      
    </div>
  )
}

export default page
