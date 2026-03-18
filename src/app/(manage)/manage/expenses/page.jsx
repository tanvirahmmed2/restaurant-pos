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
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {
            expenses.map((e)=>(
                <div key={e._id} className='w-full flex flex-col gap-4 shadow border border-black/20 rounded-xl p-2'>
                    <p className='font-semibold text-xl'>{e.title}</p>
                    <p className='text-2xl font-black border-b border-red-600'>{e.amount}</p>
                    <p>{e.note}</p>
                    <p className='text-xs italic'>Recored by: {e.madeBy}</p>
                    <button onClick={()=>handleDelete(e._id)} className='bg-slate-700 text-white rounded-xl p-1 text-center flex items-center w-full cursor-pointer text-xl justify-center'><MdDeleteOutline/></button>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default Expenses
