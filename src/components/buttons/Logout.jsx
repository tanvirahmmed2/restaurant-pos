'use client'
import React from 'react'

import { CiLogout } from "react-icons/ci";

const Logout = () => {
  return (
    <button className='w-auto flex flex-row items-center gap-3 cursor-pointer'><CiLogout/> Logout</button>
  )
}

export default Logout
