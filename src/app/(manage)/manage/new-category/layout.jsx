import React from 'react'

export const metadata={
    title:'New Category',
    description:"New Category Page"
}


const NewCategoryLayout = ({children}) => {
  return (
    <div className='w-full overflow-x-hidden px-1 sm:px-4'>
      {children}
    </div>
  )
}

export default NewCategoryLayout
