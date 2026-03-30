'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { toast } from 'react-toastify'

const Expenses = () => {
    const [expenses, setExpenses]= useState([])

    const fetchExpenses=async()=>{
        try {
            const res= await axios.get('/api/expense', {withCredentials:true})
            setExpenses(res.data.payload)
        } catch (error) {
            setExpenses([])
            
        }
    }

    const handleDelete=async(id)=>{
        const confirm=window.confirm('This action can not be undone')
        if(!confirm) return 
        try {
            const res= await axios.delete('/api/expense', {data:{id},withCredentials:true})
            toast.success(res.data.message)
            fetchExpenses()
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to delete record')
            
        }
    }

    useEffect(()=>{fetchExpenses()},[])
    if(expenses.length===0) return <p>No record found</p>
  return (
    <div className='w-full flex flex-col items-center gap-4'>
      <h1 className='text-center text-2xl font-semibold'>All Expenses Record</h1>
      <div className='w-full flex flex-col gap-1'>
        <div className='w-full grid grid-cols-8'>
            <p className='col-span-1'>ID</p>
            <p className='col-span-1'>Date</p>
            <p className='col-span-1'>Billed By</p>
            <p className='col-span-1'>Title</p>
            <p className='col-span-2'>Note</p>
            <p className='col-span-1'>Amount</p>
            <p className='col-span-1'>Action</p>
        </div>
        {
            expenses.map((e)=>(
                <div key={e._id} className='w-full grid grid-cols-8 even:bg-slate-300 p-1'>
                    <p className='col-span-1 uppercase'>#{e._id.slice(-5)}</p>
                    <p className='col-span-1'>{e.createdAt.slice(0, 10)}</p>
                    <p className='col-span-1'>{e.madeBy}</p>
                    <p className='font-semibold text-xl col-span-1'>{e.title}</p>
                    <p className='col-span-2'>{e.note}</p>
                    <p className=' col-span-1'>{e.amount}</p>
                    <button onClick={()=>handleDelete(e._id)} className='bg-slate-700 col-span-1 text-white rounded-xl p-1 text-center flex items-center w-full cursor-pointer text-xl justify-center'><MdDeleteOutline/></button>
                    
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default Expenses
