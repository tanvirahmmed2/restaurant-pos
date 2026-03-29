'use client'
import BanUser from '@/components/buttons/BanUser'
import DeleteUser from '@/components/buttons/DeleteUser'
import UpdateUser from '@/components/buttons/UpdateUser'
import AddPeople from '@/components/forms/AddPeople'
import axios from 'axios'
import { useEffect, useState } from 'react'

const People = () => {
  const [staffs, setStaffs]= useState([])
 useEffect(()=>{
  const fetchStaffs=async()=>{
    try {
      const res= await axios.get('/api/staff/people',{withCredentials:true})
      setStaffs(res.data.payload)
    } catch (error) {
      setStaffs([])
    }
  }
  fetchStaffs()
 },[])


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
            staffs && staffs.map((staff)=>(
              <div key={staff._id} className='w-full grid grid-cols-4'>
                <h1>{staff.name}</h1>
                <p>{staff.email}</p>
                <p>{staff.role}</p>
                <div className='w-auto flex flex-row items-center gap-4 text-xl'>
                  <BanUser id={staff._id}/>
                  <UpdateUser id={staff._id}/>
                  <DeleteUser id={staff._id}/>                  
                </div>
              </div>
            ))
          }
        </div>
    </div>
  )
}

export default People
