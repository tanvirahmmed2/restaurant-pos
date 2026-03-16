'use client'
import Link from 'next/link'
import React from 'react'

import { AiOutlineUnorderedList } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { PiFinnTheHumanLight } from "react-icons/pi";
import { FaHistory } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { MdManageAccounts } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { FaRegMessage } from "react-icons/fa6";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RiGlobalLine } from "react-icons/ri";
import { toast } from 'react-toastify';
import axios from 'axios';

const ManageSidebar = () => {

  const handleLogout=async()=>{
    try {
      const res= await axios.get('/api/staff/login',{withCredentials:true})
      toast(res.data.message)
      window.location.replace('/staff-login')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to logout')
      
    }
  }
  return (
    <div className='w-auto min-h-[calc(100vh-64px)] p-4 flex flex-col justify-between border-r-2 border-black/10'>
      <div className='w-auto flex flex-col gap-2'>
        <Link href={'/manage'} className='w-auto flex flex-row items-center gap-3 cursor-pointer'><IoHomeOutline/> Home</Link>
        <Link href={'/manage/orders'} className='w-auto flex flex-row items-center gap-3 cursor-pointer'><AiOutlineUnorderedList/> Orders</Link>
        <Link href={'/manage/offers'} className='w-auto flex flex-row items-center gap-3 cursor-pointer'><MdOutlineLocalOffer/> Offers</Link>
        <Link href={'/manage/history'} className='w-auto flex flex-row items-center gap-3 cursor-pointer'><FaHistory/> History</Link>
        <Link href={'/manage/products'} className='w-auto flex flex-row items-center gap-3 cursor-pointer'><FaRegEdit/> Products</Link>
        <Link href={'/manage/people'} className='w-auto flex flex-row items-center gap-3 cursor-pointer'><MdManageAccounts/> People</Link>
        <Link href={'/manage/analytics'} className='w-auto flex flex-row items-center gap-3 cursor-pointer'><SiGoogleanalytics/> Analytics</Link>
        <Link href={'/manage/reservation'} className='w-auto flex flex-row items-center gap-3 cursor-pointer'><FaRegMessage/>Reservation</Link>
        <Link href={'/manage/support'} className='w-auto flex flex-row items-center gap-3 cursor-pointer'><FaRegMessage/> Support</Link>
      </div>

      <div className='w-auto flex flex-col gap-2'>
        <Link href={'/'} className='w-auto flex flex-row items-center gap-3 cursor-pointer'><RiGlobalLine/>Website</Link>
        <Link href={'/manage/settings'} className='w-auto flex flex-row items-center gap-3 cursor-pointer'><IoSettingsOutline/>Setting</Link>
        <Link href={'/profile'} className='w-auto flex flex-row items-center gap-3 cursor-pointer'><PiFinnTheHumanLight/> Profile</Link>
        <button className='w-auto flex flex-row items-center gap-3 cursor-pointer' onClick={handleLogout}><CiLogout/> Logout</button>

      </div>
    </div>
  )
}

export default ManageSidebar
