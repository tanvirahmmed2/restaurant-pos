'use client'
import { Context } from '@/components/context/Context'
import RegisterForm from '@/components/forms/RegisterForm'
import { motion } from 'framer-motion'
import React, { useContext } from 'react'

const RegistrationPage = () => {
    const {siteData}= useContext(Context)
  return (
    <div className='w-full flex min-h-screen items-center justify-center p-2'>
      <div className='w-full md:w-3/4 lg:w-1/2 flex flex-col md:flex-row items-center justify-center gap-2 border border-black/30 shadow-sm rounded-lg p-2'>
        <motion.div initial={{opacity:0, x:-20}} whileInView={{opacity:1, x:0}} transition={{duration:0.6}} className='w-full flex items-center justify-center flex-col text-center'>
          <h1>Welcome to</h1>
          <h1 className='text-3xl font-semibold'>{siteData?.title}</h1>
          <p>Please register & access our services</p>
        </motion.div>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegistrationPage
