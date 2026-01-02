'use client'
import LastMonthAnalytics from '@/components/card/LastMonthAnalytics'
import LastYearAnalytics from '@/components/card/LastYearAnalytics'
import TotalAnalytics from '@/components/card/TotalAnalytics'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Analytics = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/order/deliver', { withCredentials: true })
        setData(response.data.payload)

      } catch (error) {
        console.log(error)
        setData([])

      }

    }

    fetchOrders()
  }, [])

  return (
    <div className='w-full flex flex-col items-center justify-center p-4'>
      {
        setData === null ? <p>No data found</p> : <div className='w-full flex flex-col items-center justify-center gap-4'>
          <h1 className='text-2xl font-semibold border-b-2 px-6'>Analytics</h1>
          <div className='w-full flex flex-row items-center justify-center gap-2'>
            <LastMonthAnalytics data={data} />
            <LastYearAnalytics data={data} />

          </div>

          <TotalAnalytics data={data} />
        </div>
      }
    </div>
  )
}

export default Analytics
