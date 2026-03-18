'use client'
import { Context } from '@/components/context/Context'
import StaffLoginForm from '@/components/forms/StaffLoginForm'
import React, { useContext } from 'react'

const Login = () => {
  const {siteData}= useContext(Context)
  return (
    <div className='w-full flex min-h-screen items-center justify-center p-2'>
      <div className='w-full md:w-3/4 lg:w-1/2 flex flex-col md:flex-row items-center justify-center gap-2 border border-black/10 shadow-sm rounded-lg p-2'>
        <div className='flex-1 flex items-center justify-center flex-col text-center'>
          <h1>Welcome to</h1>
          <h1 className='text-3xl font-semibold'>{siteData?.title}</h1>
          <p>Please login & manage services</p>
        </div>
        <StaffLoginForm/>
      </div>
    </div>
  )
}

export default Login
