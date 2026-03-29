'use client'
import Link from 'next/link'
import React, { useContext } from 'react'
import { usePathname } from 'next/navigation'

import { AiOutlineUnorderedList } from "react-icons/ai";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { PiFinnTheHumanLight } from "react-icons/pi";
import { FaHistory, FaRegEdit } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { MdManageAccounts, MdOutlineLocalOffer, MdSell } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { FaRegMessage } from "react-icons/fa6";
import { RiGlobalLine } from "react-icons/ri";

import { toast } from 'react-toastify';
import axios from 'axios';
import { Context } from '../context/Context';

const ManageSidebar = () => {
  const pathname = usePathname()

  const {manageSidebar, setManageSidebar}= useContext(Context)

  const handleLogout = async () => {
    try {
      const res = await axios.get('/api/staff/login', { withCredentials: true })
      toast.success(res.data.message)
      window.location.replace('/staff-login')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to logout')
    }
  }

  const linkStyle = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 
     ${pathname === path 
       ? 'bg-black text-white shadow-md' 
       : 'text-gray-700 hover:bg-gray-100 hover:text-black'}`

  return (
    <aside className={`w-70 fixed top-14 ${!manageSidebar? '-translate-x-full':'translate-x-0'} transform duration-500 ease-in-out overflow-y-scroll pb-24 h-screen z-50 bg-white border-r shadow-sm flex flex-col justify-between p-4`}>

      <div className="flex flex-col gap-6">

        <h2 className="text-xl font-semibold text-gray-800 px-2">Dashboard</h2>

        <div className="flex flex-col gap-1">
          <Link href="/manage" className={linkStyle('/manage')}>
            <IoHomeOutline /> Home
          </Link>

          <Link href="/manage/sale" className={linkStyle('/manage/sale')}>
            <MdSell /> Sale
          </Link>
          <Link href="/manage/pending" className={linkStyle('/manage/pending')}>
            <AiOutlineUnorderedList /> Pending
          </Link>

          <Link href="/manage/delivery" className={linkStyle('/manage/delivery')}>
            <MdOutlineLocalOffer />Confirmed
          </Link>

          <Link href="/manage/orders" className={linkStyle('/manage/orders')}>
            <FaHistory /> Delivered
          </Link>
          <Link href="/manage/history" className={linkStyle('/manage/history')}>
            <FaHistory /> History
          </Link>
        </div>

        <div>
          <p className="text-xs text-gray-400 px-2 mb-2 uppercase">Products</p>
          <div className="flex flex-col gap-1">
            <Link href="/manage/new-product" className={linkStyle('/manage/new-products')}>
              <FaRegEdit /> New Product
            </Link>

            <Link href="/manage/products" className={linkStyle('/manage/products')}>
              <FaRegEdit /> Products
            </Link>

            <Link href="/manage/new-category" className={linkStyle('/manage/new-category')}>
              <FaRegEdit /> New Category
            </Link>

            <Link href="/manage/categories" className={linkStyle('/manage/categories')}>
              <FaRegEdit /> Category List
            </Link>
          </div>
        </div>
        
        
        <div>
          <p className="text-xs text-gray-400 px-2 mb-2 uppercase">Expenses</p>
          <div className="flex flex-col gap-1">
            <Link href="/manage/new-expense" className={linkStyle('/manage/new-expense')}>
              <FaRegEdit /> New Expenses
            </Link>

            <Link href="/manage/expenses" className={linkStyle('/manage/expenses')}>
              <FaRegEdit /> Expenses
            </Link>

          </div>
        </div>

        <div>
          <p className="text-xs text-gray-400 px-2 mb-2 uppercase">Management</p>
          <div className="flex flex-col gap-1">
            <Link href="/manage/people" className={linkStyle('/manage/people')}>
              <MdManageAccounts /> People
            </Link>

            <Link href="/manage/analytics" className={linkStyle('/manage/analytics')}>
              <SiGoogleanalytics /> Analytics
            </Link>

            <Link href="/manage/reservation" className={linkStyle('/manage/reservation')}>
              <FaRegMessage /> Reservation
            </Link>

            <Link href="/manage/support" className={linkStyle('/manage/support')}>
              <FaRegMessage /> Support
            </Link>
          </div>
        </div>

      </div>

      <div className="flex flex-col gap-2 border-t pt-4">

        <Link href="/" className={linkStyle('/')}>
          <RiGlobalLine /> Website
        </Link>

        <Link href="/manage/settings" className={linkStyle('/manage/settings')}>
          <IoSettingsOutline /> Settings
        </Link>

        

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-red-500 hover:bg-red-50 transition"
        >
          <CiLogout /> Logout
        </button>
      </div>

    </aside>
  )
}

export default ManageSidebar