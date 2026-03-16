'use client'
import { useCart } from '@/components/context/Context'
import WebsiteDetails from '@/components/forms/WebsiteDetails'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Setting = () => {
  const { siteData } = useCart()

  const [formData, setFormData] = useState({
    id: siteData?._id || null,
    title: siteData?.title || '',
    address: siteData?.address || '',
    tagline: siteData?.tagline || '',
    socialLink: siteData?.socialLink || '',
    tax: siteData?.tax || '',
    openFrom: siteData?.openFrom || '',
    openTo: siteData?.openTo || '',
    bio: siteData?.bio || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const changeTitle = async (e) => {
    e.preventDefault()
    try {
      const response= await axios.post('/api/website/title', {id:formData.id, title:formData.title}, {withCredentials:true})
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Failed to perform action')
    }
  }
  const changeAddress = async (e) => {
    e.preventDefault()
    try {
      const response= await axios.post('/api/website/address', {id:formData.id, address:formData.address}, {withCredentials:true})
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Failed to perform action')
    }
  }
  const changeTax = async (e) => {
    e.preventDefault()
    try {
      const response= await axios.post('/api/website/tax', {id:formData.id, tax:formData.tax}, {withCredentials:true})
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Failed to perform action')
    }
  }

  const changeBio = async (e) => {
    e.preventDefault()
    try {
      const response= await axios.post('/api/website/bio', {id:formData.id, bio:formData.bio}, {withCredentials:true})
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Failed to perform action')
    }
  }
  const changeSocialLink = async (e) => {
    e.preventDefault()
    try {
      const response= await axios.post('/api/website/sociallink', {id:formData.id, socialLink:formData.socialLink}, {withCredentials:true})
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Failed to perform action')
    }
  }
  const changeOpenFrom = async (e) => {
    e.preventDefault()
    try {
      const response= await axios.post('/api/website/openfrom', {id:formData.id, openFrom:formData.openFrom}, {withCredentials:true})
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Failed to perform action')
    }
  }
  const changeOpenTo = async (e) => {
    e.preventDefault()
    try {
      const response= await axios.post('/api/website/opento', {id:formData.id, openTo:formData.openTo}, {withCredentials:true})
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Failed to perform action')
    }
  }

  const changeTagline = async (e) => {
    e.preventDefault()
    try {
      const response= await axios.post('/api/website/tagline', {id:formData.id, tagline:formData.tagline}, {withCredentials:true})
      toast.success(response.data.message)
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || 'Failed to perform action')
    }
  }

  if (siteData === null) return <WebsiteDetails />

  return (
    <div className='w-full p-4 flex flex-col items-center justify-center gap-8'>
      <h1 className='text-2xl'>Update Business Information</h1>

      <form onSubmit={changeTitle} className='w-full flex flex-col gap-2'>
        <label htmlFor="title">Title</label>
        <div className='w-full flex flex-row items-center justify-between gap-4'>
          <input type="text" required value={formData.title} id='title' name='title' onChange={handleChange} className='w-full p-1 px-3 border outline-none rounded-lg' />
          <button type='submit' className='px-4 p-1 bg-black text-center rounded-lg hover:scale-[1.02] transform ease-in-out duration-500 cursor-pointer text-white'>Change</button>
        </div>
      </form>

      <form onSubmit={changeBio} className='w-full flex flex-col gap-2'>
        <label htmlFor="bio">Bio</label>
        <div className='w-full flex flex-row items-center justify-between gap-4'>
          <input type="text" required value={formData.bio} id='bio' name='bio' onChange={handleChange} className='w-full p-1 px-3 border outline-none rounded-lg' />
          <button type='submit' className='px-4 p-1 bg-black text-center rounded-lg hover:scale-[1.02] transform ease-in-out duration-500 cursor-pointer text-white'>Change</button>
        </div>
      </form>
      <form onSubmit={changeTagline} className='w-full flex flex-col gap-2'>
        <label htmlFor="tagline">Tagline</label>
        <div className='w-full flex flex-row items-center justify-between gap-4'>
          <input type="text" required value={formData.tagline} id='tagline' name='tagline' onChange={handleChange} className='w-full p-1 px-3 border outline-none rounded-lg' />
          <button type='submit' className='px-4 p-1 bg-black text-center rounded-lg hover:scale-[1.02] transform ease-in-out duration-500 cursor-pointer text-white'>Change</button>
        </div>
      </form>
      <form onSubmit={changeAddress} className='w-full flex flex-col gap-2'>
        <label htmlFor="address">Address</label>
        <div className='w-full flex flex-row items-center justify-between gap-4'>
          <input type="text" required value={formData.address} id='address' name='address' onChange={handleChange} className='w-full p-1 px-3 border outline-none rounded-lg' />
          <button type='submit' className='px-4 p-1 bg-black text-center rounded-lg hover:scale-[1.02] transform ease-in-out duration-500 cursor-pointer text-white'>Change</button>
        </div>
      </form>
      <form onSubmit={changeTax} className='w-full flex flex-col gap-2'>
        <label htmlFor="tax">Tax</label>
        <div className='w-full flex flex-row items-center justify-between gap-4'>
          <input type="number" required value={formData.tax} id='tax' name='tax' onChange={handleChange} className='w-full p-1 px-3 border outline-none rounded-lg' />
          <button type='submit' className='px-4 p-1 bg-black text-center rounded-lg hover:scale-[1.02] transform ease-in-out duration-500 cursor-pointer text-white'>Change</button>
        </div>
      </form>
      <form onSubmit={changeOpenFrom} className='w-full flex flex-col gap-2'>
        <label htmlFor="openFrom">Open Time</label>
        <div className='w-full flex flex-row items-center justify-between gap-4'>
          <input type="text" required value={formData.openFrom} id='openFrom' name='openFrom' onChange={handleChange} className='w-full p-1 px-3 border outline-none rounded-lg' />
          <button type='submit' className='px-4 p-1 bg-black text-center rounded-lg hover:scale-[1.02] transform ease-in-out duration-500 cursor-pointer text-white'>Change</button>
        </div>
      </form>
      <form onSubmit={changeOpenTo} className='w-full flex flex-col gap-2'>
        <label htmlFor="openTo">Open Till</label>
        <div className='w-full flex flex-row items-center justify-between gap-4'>
          <input type="text" required value={formData.openTo} id='openTo' name='openTo' onChange={handleChange} className='w-full p-1 px-3 border outline-none rounded-lg' />
          <button type='submit' className='px-4 p-1 bg-black text-center rounded-lg hover:scale-[1.02] transform ease-in-out duration-500 cursor-pointer text-white'>Change</button>
        </div>
      </form>
      <form onSubmit={changeSocialLink} className='w-full flex flex-col gap-2'>
        <label htmlFor="socialLink">Social Link</label>
        <div className='w-full flex flex-row items-center justify-between gap-4'>
          <input type="text" required value={formData.socialLink} id='socialLink' name='socialLink' onChange={handleChange} className='w-full p-1 px-3 border outline-none rounded-lg' />
          <button type='submit' className='px-4 p-1 bg-black text-center rounded-lg hover:scale-[1.02] transform ease-in-out duration-500 cursor-pointer text-white'>Change</button>
        </div>
      </form>

    </div>
  )
}

export default Setting
