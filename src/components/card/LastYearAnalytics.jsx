'use client'
import React, { useMemo } from 'react'

const LastYearAnalytics = ({ data }) => {
    const date = new Date()
    const currYear = date.getFullYear()

    const currentYearData = useMemo(() => {
        if (!data) return [];
        return data.filter(item => {
            const itemDate = new Date(item.createdAt);
            return itemDate.getFullYear() === currYear;
        });
    }, [data, currYear]);

    const totalPrice = useMemo(() => {
        let total = 0;

        currentYearData.forEach(item => {
            total += Number(item.totalPrice) || 0;
        });

        return total;
    }, [currentYearData]);

    return (
        <div className='flex-1 flex-col flex items-center justify-center gap-2 p-2 border rounded-lg'>
            <h3 className='text-xl font-semibold'>Current Year Analytics</h3>
            <p><strong>Year:</strong> {currYear}</p>
            <p><strong>Total Orders:</strong> {currentYearData.length}</p>
            <p><strong>Total Revenue:</strong> BDT {totalPrice.toFixed(2)}</p>
        </div>
    )
}

export default LastYearAnalytics
