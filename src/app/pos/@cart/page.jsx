import Orderform from '@/components/forms/Orderform'
import React from 'react'

const Cart = () => {
  return (
    <div className='w-1/4 border-l-2 border-black/10 p-4 flex flex-col items-center'>
      <h1 className='text-xl font-semibold'>Order details</h1>
      <Orderform/>
    </div>
  )
}

export default Cart
