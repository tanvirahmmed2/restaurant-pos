import React from 'react'

export const metadata={
    title:' Category',
    description:" Category Page"
}


const CategoryLayout = ({children}) => {
  return (
    <div className='w-full overflow-x-hidden px-1 sm:px-4'>
      {children}
    </div>
  )
}

export default CategoryLayout
