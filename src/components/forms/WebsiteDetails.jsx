'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const WebsiteDetails = () => {
    const [formData, setFormData] = useState({
        title: '',
        address: '',
        tagline: '',
        socialLink: '',
        tax: '',
        openFrom: '',
        openTo: '',
        bio:''

    })

    const handleChange=(e)=>{
        const {name, value}= e.target
        setFormData((prev)=>({...prev, [name]:value}))
    }


    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response= await axios.post('/api/website', formData, {withCredentials:true})
            toast.success(response.data.message)
            window.location.reload()
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || 'Failed to submit data')
        }
    }

    return (
        <form onSubmit={handleSubmit} className='w-full flex flex-col items-center justify-center gap-2 p-4'>
            <h1 className='text-center text-2xl'>Website info</h1>
            <div className='w-full flex flex-col gap-2'>
                <label htmlFor="title">Name</label>
                <input type="text" id='title' name='title' value={formData.title}  required onChange={handleChange} className='w-full p-1 pz-2 border outline-none'/>
            </div>
            <div className='w-full flex flex-col gap-2'>
                <label htmlFor="tagline">Tagline</label>
                <input type="text" id='tagline' name='tagline' value={formData.tagline}  required onChange={handleChange} className='w-full p-1 pz-2 border outline-none'/>
            </div>
            <div className='w-full flex flex-col gap-2'>
                <label htmlFor="address">Address</label>
                <input type="text" id='adsress' name='address' value={formData.address} required onChange={handleChange} className='w-full p-1 pz-2 border outline-none' />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <label htmlFor="tax">Tax</label>
                <input type="number" id='tax' name='tax' value={formData.tax} required onChange={handleChange} className='w-full p-1 pz-2 border outline-none' />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <label htmlFor="openFrom">Open Time</label>
                <input type="text" id='openFrom' name='openFrom' value={formData.openFrom} placeholder='Please mention "am/pm"' required onChange={handleChange} className='w-full p-1 pz-2 border outline-none' />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <label htmlFor="openTo">Open Till</label>
                <input type="text" id='openTo' name='openTo' value={formData.openTo}  placeholder='Please mention "am/pm"' required onChange={handleChange} className='w-full p-1 pz-2 border outline-none'/>
            </div>
            <div className='w-full flex flex-col gap-2'>
                <label htmlFor="bio">Bio</label>
                <textarea name="bio" id="bio" value={formData.bio} required onChange={handleChange} className='w-full p-1 pz-2 border outline-none'></textarea>
            </div>
            <div className='w-full flex flex-col gap-2'>
                <label htmlFor="socialLink">Social Link</label>
                <input name="socialLink" id="socialLink" value={formData.socialLink} required onChange={handleChange} className='w-full p-1 pz-2 border outline-none' type='text'/>
            </div>
            <button type='submit' className='w-full p-1 bg-black text-white text-center cursor-pointer hover:opacity-90'>Submit</button>
        </form>
    )
}

export default WebsiteDetails
