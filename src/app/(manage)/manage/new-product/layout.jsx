import React from 'react'

export const metadata={
    title:'New Product',
    description:"New Product Page"
}


const NewProductLayout = ({children}) => {
  return (
    <div className='w-full overflow-x-hidden px-1 sm:px-4'>
      {children}
    </div>
  )
}

export default NewProductLayout
