import React from 'react'

export const metadata={
    title:'New Expense',
    description:"New Expense Page"
}


const NewExpenseLayout = ({children}) => {
  return (
    <div className='w-full overflow-x-hidden px-1 sm:px-4'>
      {children}
    </div>
  )
}

export default NewExpenseLayout
