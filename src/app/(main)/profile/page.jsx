'use client'
import Logout from '@/components/buttons/Logout'
import { Context } from '@/components/context/Context'
import UpdateUserForm from '@/components/forms/UpdateUserForm'
import React, { useContext } from 'react'
import { CiEdit, CiUser } from 'react-icons/ci'
import { MdCancel } from 'react-icons/md'

const Profile =  () => {
  const {userData,updateUserBox,setUpdateUserBox}= useContext(Context)
  
  return (
    <div className='w-full relative min-h-screen flex items-center justify-center p-4'>
      <div className='w-auto mx-auto border border-black/10 shadow-lg bg-gray-100 gap-6 rounded-lg flex flex-col items-center p-4 justify-between'>
        <div className='flex flex-col items-center justify-center gap-2 relative'>
          <button onClick={()=>setUpdateUserBox(true)} className='absolute top-4 right-4 text-2xl cursor-pointer border'><CiEdit/></button>
          <h1 className='text-6xl bg-black text-white rounded-full p-1 text-center '><CiUser/></h1>
          <h1 className='text-2xl font-semibold'>{userData?.name}</h1>
          <p>{userData?.phone}</p>
          <h1>{userData?.email}</h1>
        </div>
        <Logout />
      </div>
    {
      updateUserBox && <div className='fixed flex items-center justify-center backdrop-blur-2xl bg-black/20 inset-0'>
        <div className='p-3 bg-white rounded-2xl relative'>
          <button className='top-2 right-2 absolute text-xl cursor-pointer' onClick={()=>setUpdateUserBox(false)}><MdCancel/></button>
          <UpdateUserForm/>
        </div>
      </div>
    }
    </div>
  )
}

export default Profile
