import BanUser from '@/components/buttons/BanUser'
import DeleteUser from '@/components/buttons/DeleteUser'
import UpdateUser from '@/components/buttons/UpdateUser'
import AddPeople from '@/components/forms/AddPeople'
import { BASE_URL } from '@/lib/database/secret'
import React from 'react'

const People = async() => {
  const res= await fetch(`${BASE_URL}/api/user`, {
    method: 'GET',
    cache: 'no-store'
  })
  const data= await res.json()
  const users= data.payload
  return (
    <div className='w-full p-4 flex flex-col items-center gap-6'>
        <h1 className='text-2xl font-semibold w-full text-center border-b-2 border-black/10'>People & Access</h1>
        <AddPeople/>
        <div className='w-full flex flex-col items-center justify-center gap-4'>
          <h1 className='text-xl font-semibold text-center'>Sales and Managers</h1>
          <div className='w-full grid grid-cols-4'>
            <p>Name</p>
            <p>Email</p>
            <p>Role</p>
            <p>Action</p>
          </div>
          {
            users && users.map((user)=>(
              <div key={user._id} className='w-full grid grid-cols-4'>
                <h1>{user.name}</h1>
                <p>{user.email}</p>
                <p>{user.role}</p>
                <div className='w-auto flex flex-row items-center gap-4 text-xl'>
                  <BanUser id={user._id}/>
                  <UpdateUser id={user._id}/>
                  <DeleteUser id={user._id}/>                  
                </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default People
