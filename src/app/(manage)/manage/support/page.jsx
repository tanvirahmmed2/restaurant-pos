import DeleteSupport from '@/components/buttons/DeleteSupport'
import { BASE_URL } from '@/lib/database/secret'
import Link from 'next/link'
import React from 'react'

const Support = async () => {
  const res = await fetch(`${BASE_URL}/api/support`, { method: 'GET', cache: 'no-store' })
  const data = await res.json()

  if (!data.success || data.payload.length === 0) return (
    <div className='w-full h-64 flex flex-col items-center justify-center text-slate-400'>
      <p className="text-xl font-medium">No support tickets found</p>
      <p className="text-sm">New messages will appear here.</p>
    </div>
  )

  const supports = data.payload

  return (
    <div className='w-full mx-auto p-4 space-y-4'>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Support Inbox</h2>
        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">
          {supports.length} Messages
        </span>
      </div>

      <div className="grid gap-4">
        {supports.map((info) => (
          <div key={info._id} className='w-full flex flex-row justify-between p-2 border rounded-lg'>


            <div className='flex-1 flex flex-col gap-3'>
              <h1 className='text-xl font-semibold'>{info.name}</h1>
              <p className='italic'>Email: {info.email}</p>
            </div>

            <div className='flex-3 flex flex-col gap-3'>
              <p>Subject: {info.subject}</p>
              <p className='font-semibold'>{info.message}</p>
            </div>

            <div className='flex-1 flex flex-col gap-3 items-center justify-center h-full'>
              <Link href={`mailto:${info.email}`} className='w-full bg-black p-1 rounded-lg text-white text-center'  > Reply</Link>

              <DeleteSupport id={info._id} />

            </div>


          </div>
        ))}
      </div>
    </div>
  )
}

export default Support