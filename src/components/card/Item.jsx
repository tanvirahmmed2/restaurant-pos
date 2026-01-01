import Image from 'next/image'
import React from 'react'

const Item = ({item}) => {
  return (
    <div>
      <Image src={item.image} alt={item.title} width={1000} height={1000}/>
    </div>
  )
}

export default Item
