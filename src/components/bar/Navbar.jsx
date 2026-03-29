'use client'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import Profile from '../buttons/Profile'
import Sidebar from './Sidebar'

import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Logout from '../buttons/Logout'
import axios from 'axios'
import { Context } from '../context/Context'

const Navbar = () => {
  const { siteData,cartBar, setCartBar, userData, staffData } = useContext(Context)
  const [isSidebar, setIsSidebar] = useState(false)


  return (
    <div className='w-full fixed top-0 z-50 right-0'>
      <div className='w-full flex flex-row items-center justify-around h-16 px-4 bg-slate-800 text-white'>
        <Link href={'/'} onClick={()=>setCartBar(false)} className='text-3xl '>{siteData?.title || 'Grand Kitchen'}</Link>
        <div>

        </div>
        <div className='w-auto h-full hidden md:flex flex-row items-center justify-center gap-6 text-xl'>
          <Link href={'/'} onClick={()=>setCartBar(false)}>Home</Link>
          <Link href={'/menu'} onClick={()=>setCartBar(false)}>Menu</Link>
          <Link href={'/reservation'} onClick={()=>setCartBar(false)}>Book</Link>
          <button className='hover:opacity-70 cursor-pointer' onClick={()=>setCartBar(!cartBar)} >Cart</button>
          {staffData?.role === 'manager' && <Link href={'/manage'}>Manage</Link>}
          {staffData?.role === 'sales' && <Link href={'/sales'}>Sales</Link>}
          {
            userData ? <div className='w-auto h-full flex flex-row items-center justify-center gap-2'>
              <Logout />
              <Profile />
            </div> : <Link href={'/login'} onClick={()=>setCartBar(false)} className='px-4 bg-white text-black p-1 rounded-2xl'>Login</Link>
          }
        </div>
        
        <button onClick={() => setIsSidebar(!isSidebar)} className='text-xl block md:hidden'>
          {
            isSidebar ? <RxCross2 /> :
              <FaBars />
          }
        </button>
      </div>
      <Sidebar {...{ isSidebar, setIsSidebar }} />

    </div>
  )
}

export default Navbar
