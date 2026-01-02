'use client'
import React, { useMemo } from 'react'

const LastMonthAnalytics = ({ data }) => {
  const date = new Date()
  const currYear = date.getFullYear()
  const currMonth = date.getMonth()

  const currentMonthData = useMemo(() => {
    if (!data) return [];
    return data.filter(item => {
      const itemDate = new Date(item.createdAt); 
      return itemDate.getMonth() === currMonth && itemDate.getFullYear() === currYear;
    });
  }, [data, currMonth, currYear]);

  const totalPrice = useMemo(() => {
    let total = 0;
    
    currentMonthData.forEach(item => {
      total += Number(item.totalPrice) || 0;
    });

    return total;
  }, [currentMonthData]);

  return (
    <div className='flex-1 flex-col flex items-center justify-center gap-2 p-2 border rounded-lg'>
      <h3 className='text-xl font-semibold'>Current Month Analytics</h3>
      <p><strong>Month:</strong> {currMonth + 1} / {currYear}</p>
      <p><strong>Total Orders:</strong> {currentMonthData.length}</p>
      <p><strong>Total Revenue:</strong> BDT {totalPrice.toFixed(2)}</p>
    </div>
  )
}

export default LastMonthAnalytics