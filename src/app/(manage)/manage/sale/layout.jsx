import React from 'react'

export const metadata={
    title:'Sale',
    description:"Sale Page"
}


const SaleLayout = ({children}) => {
  return (
    <div className='w-full overflow-x-hidden px-1 sm:px-4'>
      {children}
    </div>
  )
}

export default SaleLayout
