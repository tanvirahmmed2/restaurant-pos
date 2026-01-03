import Logout from '@/components/buttons/Logout'
import { isLogin } from '@/lib/middleware'
import { redirect } from 'next/navigation'
import React from 'react'

const Profile = async () => {
  const auth = await isLogin()
  if(!auth.success) return redirect('/login')
  const data = auth.payload

  
  return (
    <div className='w-full min-h-screen flex items-center justify-center p-4'>
      <div className='w-full md:w-3/4 border border-black/10 min-h-[60vh] bg-indigo-300 text-white rounded-lg flex flex-col items-center p-4 justify-between'>
        <div className='flex flex-col items-center justify-center gap-2'>
          <h1 className='text-2xl text-center'>Profile</h1>
          <h1 className='text-2xl font-semibold'>{data.name}</h1>
          <p>Role: {data.role}</p>
          <h1>{data.email}</h1>
        </div>
        <Logout />
      </div>

    </div>
  )
}

export default Profile
