import NewExpenseForm from '@/components/forms/NewExpenseForm'
import React from 'react'

const NewExpense = () => {
    return (
        <div className='w-full flex flex-col items-center gap-4'>
            <h1 className='w-full text-center text-xl font-semibold'>Add New Expense</h1>
            <NewExpenseForm />
        </div>
    )
}

export default NewExpense
