import React from 'react'

export const metadata={
    title:'History Orders',
    description:'History Page'
}

const HistoryLayout = ({children}) => {
  return (
    <div className='w-full overflow-hidden px-1 sm:px-4'>
      {children}
    </div>
  )
}

export default HistoryLayout
