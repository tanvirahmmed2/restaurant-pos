'use client'

import { Context } from "@/components/context/Context"
import { useContext } from "react"

const Manage =  () => {
  const {staffData, siteData}= useContext(Context)
  return (
    <div className="w-full flex flex-col items-center justify-center gap-2">
      <p>Welcome, <span className="text-2xl font-semibold text-center">{staffData?.name}</span></p>
      <strong className="uppercase">{staffData?.role}</strong>
      <p className="text-4xl font-semibold">{siteData?.title}</p>
      <p>Have a great day!</p>
      
    </div>
  )
}

export default Manage
