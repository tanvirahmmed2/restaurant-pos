import React from 'react'

export const metadata={
    title:'Pending Orders',
    description:'Pending Page'
}

const PendingLayout = ({children}) => {
  return (
    <div className='w-full overflow-hidden px-1 sm:px-4'>
      {children}
    </div>
  )
}

export default PendingLayout
