import React from 'react'

export const metadata={
    title:'Delivery Orders',
    description:'Delivery Page'
}

const DeliveryLayout = ({children}) => {
  return (
    <div className='w-full overflow-hidden px-1 sm:px-4'>
      {children}
    </div>
  )
}

export default DeliveryLayout
