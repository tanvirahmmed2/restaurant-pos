'use client'
import Link from 'next/link';
import React from 'react'

import { FaEdit } from "react-icons/fa";

const UpdateProduct = ({id}) => {
    
  return (
    <Link href={`/manage/products/${id}`}><FaEdit/></Link>
  )
}

export default UpdateProduct
