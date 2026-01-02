'use client'
import axios from 'axios';
import React from 'react'
import { GiConfirmed } from "react-icons/gi";
import { toast } from 'react-toastify';

const ConfirmBooking = ({id}) => {
    const confirmReservation=async()=>{
      try {
        const ressponse= await axios.post('/api/reservation/confirm', {id}, {withCredentials:true})
        toast.success(ressponse.data.message)
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to confirm Reservation")
        console.log(error)
      }
    }
  return (
    <button className='text-xl cursor-pointer' onClick={confirmReservation}><GiConfirmed/></button>
  )
}

export default ConfirmBooking
