
import React from 'react'
import Profile from '../buttons/Profile'
import Notification from '../buttons/Notification'

const ManageNavbar = () => {
  return (
    <div className='w-full border-b-2 h-14 border-black/10 flex flex-row items-center justify-between px-4'>
        <h1 className='text-xl font-bold'>Management</h1>
        <div className='flex flex-row items-center justify-center gap-4 h-14'>
            <h1>Tanvir Ahmmed</h1>
            <Profile/>
            <Notification/>
        </div>
    </div>
  )
}

export default ManageNavbar
