'use client'
import React from 'react'

const Orderform = () => {
  return (
    <form>
        <div>
            <label htmlFor="name">Name</label>
            <input type="text" />
        </div>
        <div>
    <label htmlFor="number">Number</label>
    <input type="number" />
        </div>

        <button className='bg-black text-white p-1 px-4 rounded-2xl'>Place order</button>
      
    </form>
  )
}

export default Orderform
