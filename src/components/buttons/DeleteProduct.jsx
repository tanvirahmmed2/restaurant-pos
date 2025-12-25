'use client'
import React from 'react'

import { MdDeleteOutline } from "react-icons/md";

const DeleteProduct = ({id}) => {
    const deleteProduct=async()=>{

    }
  return (
    <button onClick={deleteProduct}><MdDeleteOutline/></button>
  )
}

export default DeleteProduct
