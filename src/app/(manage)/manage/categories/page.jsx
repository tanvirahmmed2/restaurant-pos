'use client'
import { Context } from '@/components/context/Context'
import axios from 'axios'
import Image from 'next/image'
import React, { useContext } from 'react'
import { MdDeleteOutline, MdEdit } from 'react-icons/md'
import { toast } from 'react-toastify'

const CategorListPage = () => {
  const { categories, fetchCategories } = useContext(Context)

  const handleDelete=async(id)=>{
    const confirm= window.confirm('Are you sure to delete this category?')
    if(!confirm) return
    try {
      const res= await axios.delete('/api/category',{data:{id},withCredentials:true})
      toast.success(res.data.message)
      fetchCategories()
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete category")
    }
  }
  return (
    <div className='w-full flex flex-col items-center gap-4 max-w-3xl mx-auto'>
      {
        categories && categories.length > 0 ? <div className='w-full flex flex-col items-center gap-4'>
          <h1>Category List</h1>
          {
            categories && <div className='w-full flex flex-col items-center gap-2  '>
              <div className='w-full grid grid-cols-5 gap-4 border-b-2 border-black/20 py-2'>
                <p className='col-span-1'>Image</p>
                <p className='col-span-3'>Name</p>
                <p className='col-span-1'>Action</p>
              </div>
              {
                categories.map((cat) => (
                  <div key={cat._id} className='w-full grid grid-cols-5 even:bg-gray-300 gap-4 py-1'>
                    <div className='col-span-1 aspect-square overflow-hidden'>
                      <Image src={cat?.image} alt='category image' width={70} height={70}  className='aspect-square overflow-hidden object-cover w-full'/>
                    </div>
                    <h1 className='col-span-3'>{cat?.name}</h1>
                    <div className='col-span-1 flex flex-row items-center gap-4 text-2xl'>
                      <button className='cursor-pointer'><MdEdit/></button>
                      <button className='cursor-pointer' onClick={()=>handleDelete(cat._id)}><MdDeleteOutline /></button>
                    </div>
                  </div>
                ))
              }
            </div>
          }
        </div> : <p>No category found!</p>
      }
    </div>
  )
}

export default CategorListPage
