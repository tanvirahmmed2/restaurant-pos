'use client'
import Link from 'next/link'
import React from 'react'
import { PiFinnTheHumanLight } from "react-icons/pi";



const Profile = () => {
  return (
    <Link href={'/profile'} className='px-4 bg-white text-black p-1 rounded-2xl cursor-pointer border-2 border-black/10 rounded-full text-2xl'><PiFinnTheHumanLight/></Link>
  )
}

export default Profile
