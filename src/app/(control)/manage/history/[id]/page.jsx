import React from 'react'

const SingleOrderHistory = async({params}) => {
    const {id}= await params
  return (
    <div>
      <p>{id}</p>
    </div>
  )
}

export default SingleOrderHistory
