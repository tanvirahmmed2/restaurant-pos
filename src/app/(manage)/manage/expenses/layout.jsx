import React from 'react'

export const metadata={
    title:' Expense',
    description:" Expense Page"
}


const ExpenseLayout = ({children}) => {
  return (
    <div className='w-full overflow-x-hidden px-1 sm:px-4'>
      {children}
    </div>
  )
}

export default ExpenseLayout
