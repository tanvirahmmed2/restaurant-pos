'use client'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

const SalesAddToCart = ({ product }) => {
    const router = useRouter()


    const data = { title: product.title, productId: product._id, quantity: 1 }

    const addItemToCart = async () => {
        try {
            const response = await axios.post('/api/user/cart', data, { withCredentials: true })

            toast.success(response.data.message)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || 'Failed to add to cart')

        }
        router.refresh()
    }

    return (
        <div onClick={addItemToCart} className='w-full cursor-pointer flex flex-col items-center justify-center border border-black/10 shadow-sm rounded-lg overflow-hidden text-center text-sm p-1 gap-1'>
            <Image src={product.image} alt={product.title} width={400} height={400} className='w-full rounded-lg overflow-hidden' />
            <h1>{product.title}</h1>
            <p className='text-base font-semibold'>BDT {product.price}</p>
        </div>
    )
}

export default SalesAddToCart
