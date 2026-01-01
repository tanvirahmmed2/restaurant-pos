'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Profile from '../buttons/Profile'
import Sidebar from './Sidebar'

import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Logout from '../buttons/Logout'
import axios from 'axios'

const Navbar = () => {
  const [isSidebar, setIsSidebar] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [role, setRole] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user/islogin', { withCredentials: true })
        const data = response.data.payload.role
        setIsLogin(true)
        setRole(data)
      } catch (error) {
        console.log(error)
        setIsLogin(false)
        setRole('')
      }

    }

    fetchUser()
  }, [])

  return (
    <div className='w-full fixed top-0 z-50'>
      <div className='w-full flex flex-row items-center justify-between h-14 px-4 bg-sky-600 text-white'>
        <Link href={'/'} className='text-2xl '>Grand Kitchen</Link>
        <div>

        </div>
        <div className='w-auto h-full hidden md:flex flex-row items-center justify-center gap-2'>
          <Link href={'/'}>Home</Link>
          <Link href={'/menu'}>Menu</Link>
        <Link href={'/offers'}>Offers</Link>
          {role === 'manager' && <Link href={'/manage'}>Manage</Link>}
          {role === 'sales' && <Link href={'/sales'}>Sales</Link>}
          {
            isLogin ? <div className='w-auto h-full flex flex-row items-center justify-center gap-2'>
              <Link href={'/cart'}>Cart</Link>
              <Logout />
              <Profile />
            </div> : <Link href={'/login'}>Login</Link>
          }
        </div>
        <button onClick={() => setIsSidebar(!isSidebar)} className='text-xl block md:hidden'>
          {
            isSidebar ? <RxCross2 /> :
              <FaBars />
          }
        </button>
      </div>
      <Sidebar {...{ isSidebar, setIsSidebar, isLogin, role }} />

    </div>
  )
}

export default Navbar
