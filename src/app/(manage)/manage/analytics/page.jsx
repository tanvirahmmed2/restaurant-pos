'use client'
import LastMonthExpense from '@/components/report/LastMonthExpense'
import LastMonthSales from '@/components/report/LastMonthSales'
import LastYearExpense from '@/components/report/LastYearExpense'
import LastYearSales from '@/components/report/LastYearSales'
import TotalExpense from '@/components/report/TotalExpense'
import TotalSales from '@/components/report/TotalSales'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Analytics = () => {
  const [data, setData] = useState([])
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/order/delivery', { withCredentials: true })
        setData(response.data.payload)

      } catch (error) {
        console.log(error)
        setData([])

      }

    }

    fetchOrders()
  }, [])


  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await axios.get('/api/expense', { withCredentials: true })
        setExpenses(res.data.payload || [])
      } catch (error) {
        setExpenses([])
      }
    }
    fetchExpenses()
  }, [])
  return (
    <div className='w-full flex flex-col items-center justify-center p-4'>
      {
        setData === null ? <p>No data found</p> : <div className='w-full flex flex-col items-center justify-center gap-4'>
          <h1 className='text-2xl font-semibold border-b-2 px-6'>Analytics</h1>
          <div className='w-full flex flex-row items-center justify-center gap-2'>
            <LastMonthSales data={data} />
            <LastYearSales data={data} />

            <TotalSales data={data} />
          </div>
          <div className='w-full flex flex-row items-center justify-center gap-2'>
            <LastMonthExpense data={expenses}/>
            <LastYearExpense data={expenses}/>
            <TotalExpense data={expenses}/>
          </div>
        </div>
      }
    </div>
  )
}

export default Analytics
