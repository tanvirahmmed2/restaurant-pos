'use client'
import React from 'react'

import Orderform from '../forms/Orderform'

const SalesCart = () => {
  return (
    <div className='w-full flex flex-col items-center gap-6'>
      <h1 className='text-xl font-semibold'>Order details</h1>
      <Orderform/>
    </div>
  )
}

export default SalesCart
