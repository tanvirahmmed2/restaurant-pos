'use client'
import React, { useContext } from 'react'
import Profile from '../buttons/Profile'
import { Context } from '../context/Context'
import { AiOutlineBars } from 'react-icons/ai'

const ManageNavbar = () => {
  const {manageSidebar, setManageSidebar, staffData}= useContext(Context)
  return (
    <nav className='w-full border-b-2 fixed top-0 right-0 h-14 border-black/10 backdrop-blur-2xl z-50 flex flex-row items-center justify-between px-4'>
        <div className='w-auto flex flex-row items-center justify-center gap-5'>
          <button className='text-xl cursor-pointer ' onClick={()=>setManageSidebar(!manageSidebar)}><AiOutlineBars/></button>

          <h1 className='text-xl font-bold'>Management</h1>
        </div>
        <div className='flex flex-row items-center justify-center gap-4 h-14'>
            <h1>{staffData?.name}</h1>
        </div>
    </nav>
  )
}

export default ManageNavbar
