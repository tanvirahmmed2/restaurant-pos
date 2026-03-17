import React from 'react'

export const metadata={
    title:'Category',
    description:'Category list page'
}

const CategoryLayout = ({children}) => {
  return (
    <div className='w-full p-1 sm:p-4 overflow-x-hidden'>
      {children}
    </div>
  )
}

export default CategoryLayout
