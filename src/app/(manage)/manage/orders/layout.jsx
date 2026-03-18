import React from 'react'

export const metadata={
    title:'Orders Orders',
    description:'Orders Page'
}

const OrdersLayout = ({children}) => {
  return (
    <div className='w-full overflow-hidden px-1 sm:px-4'>
      {children}
    </div>
  )
}

export default OrdersLayout
