'use client'
import Link from 'next/link'
import React from 'react'

import { AiOutlineUnorderedList } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { PiFinnTheHumanLight } from "react-icons/pi";
import { FaHistory } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import Logout from '../buttons/Logout';
import { RiGlobalLine } from "react-icons/ri";

const SalesSidebar = () => {
  return (
    <div className='w-auto min-h-[calc(100vh-64px)] p-4 flex flex-col justify-between border-r-2 border-black/10'>
      <div className='w-auto flex flex-col gap-2'>
        <Link href={'/sales'} className='w-auto flex flex-row items-center gap-3 cursor-pointer'><IoHomeOutline/> Home</Link>
        <Link href={'/sales/orders'} className='w-auto flex flex-row items-center gap-3 cursor-pointer'><AiOutlineUnorderedList/> Orders</Link>
        <Link href={'/sales/history'} className='w-auto flex flex-row items-center gap-3 cursor-pointer'><FaHistory/> History</Link>
      </div>

      <div className='w-auto flex flex-col gap-2'>
        <Link href={'/'} className='w-auto flex flex-row items-center gap-3 cursor-pointer'><RiGlobalLine/>Website</Link>
        <Link href={'/profile'} className='w-auto flex flex-row items-center gap-3 cursor-pointer'><PiFinnTheHumanLight/> Profile</Link>
        <Logout/>

      </div>
    </div>
  )
}

export default SalesSidebar
