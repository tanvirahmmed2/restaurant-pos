'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Profile from '../buttons/Profile'
import Sidebar from './Sidebar'

import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Logout from '../buttons/Logout'

const Navbar = () => {
  const [isSidebar, setIsSidebar]= useState(false)
  return (
    <div className='w-full relative'>
      <div className='w-full flex flex-row items-center justify-between h-14 px-4 border-b-2 border-black/10 '>
        <Link href={'/'} className=''>Restaurant</Link>
        <div>

        </div>
        <div className='w-auto h-full flex flex-row items-center justify-center gap-2'>
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
          <Link href={'/cart'}>Cart</Link>
          <Link href={'/manage'}>Manage</Link>
          <Link href={'/sales'}>Sales</Link>
          <Logout/>
          <Profile/>
        </div>
        <button onClick={()=> setIsSidebar(!isSidebar)} className='text-xl'>
          {
            isSidebar? <RxCross2/>:
            <FaBars/>
          }
        </button>
      </div>
      <Sidebar sidebar={isSidebar}/>
      
    </div>
  )
}

export default Navbar
