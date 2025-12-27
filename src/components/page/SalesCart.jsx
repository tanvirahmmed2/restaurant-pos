import React from 'react'
import Orderform from '../forms/Orderform'

const SalesCart = async () => {


  return (
    <div className='w-1/3 border-l-2 border-black/10 p-4 flex flex-col items-center gap-6'>
      <h1 className='text-xl font-semibold'>Order details</h1>
      <Orderform />
    </div>
  )
}

export default SalesCart
