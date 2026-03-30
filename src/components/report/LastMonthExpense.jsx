'use client'
import React, { useMemo } from 'react'

const LastMonthExpense = ({ data }) => {
  const expenseList = data

  const date = new Date()
  const currYear = date.getFullYear()
  const currMonth = date.getMonth()

  const currentMonthData = useMemo(() => {
    if (!expenseList.length) return [];
    
    return expenseList.filter(item => {
      const itemDate = new Date(item.createdAt); 
      return itemDate.getMonth() === currMonth && itemDate.getFullYear() === currYear;
    });
  }, [expenseList, currMonth, currYear]);

  const totalExpense = useMemo(() => {
    return currentMonthData.reduce((total, item) => {
      return total + (Number(item.amount) || 0);
    }, 0);
  }, [currentMonthData]);

  return (
    <div className='w-full flex-col flex items-center justify-center gap-2 p-2 border rounded-lg bg-slate-200'>
      <h3 className='text-xl font-semibold'>Current Month Expense</h3>
      <p><strong>Month:</strong> {currMonth + 1} / {currYear}</p>
      <p><strong>Total Expense:</strong> {currentMonthData.length}</p>
      <p><strong>Total Expense Value:</strong> BDT {totalExpense.toFixed(2)}</p>
    </div>
  )
}

export default LastMonthExpense