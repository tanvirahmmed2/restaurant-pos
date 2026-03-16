import React from 'react'

export const metadata={
    title:'Reservation | Restaurant',
    description:'Reservation page of restaurant'

}

const Reservation = ({children}) => {
  return (
    <div className='w-full bg-gray-100'>
      {children}
    </div>
  )
}

export default Reservation
