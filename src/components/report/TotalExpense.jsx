'ue client'
import React, { useMemo } from 'react'

const TotalExpense = ({ data }) => {
    const totalPrice = useMemo(() => {
        let total = 0
        data.forEach(item => {
            total += Number(item.amount) || 0

        });
        return total
    }, [data])

    
    return (
        <div className='w-full flex-col flex items-center justify-center gap-2 p-2 border rounded-lg bg-slate-200'>
            <h1 className='text-xl font-semibold'>Total Expense</h1>
            <p>Total Expenses : {data.length}</p>
            <h1>Total Expenses Value{totalPrice}</h1>
        </div>
    )
}

export default TotalExpense
