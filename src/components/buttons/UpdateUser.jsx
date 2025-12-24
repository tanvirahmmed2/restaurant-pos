'use client'
import Link from 'next/link'
import React from 'react'
import { FaUserEdit } from "react-icons/fa";

const UpdateUser = ({id}) => {
  return (
    <Link href={`/manage/people/${id}`}><FaUserEdit/></Link>
  )
}

export default UpdateUser
