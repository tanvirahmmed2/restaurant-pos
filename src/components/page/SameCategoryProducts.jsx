'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Item from '../card/Item'
import Link from 'next/link'

const SameCategoryProducts = ({ id }) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`/api/product?q=${id}`, { withCredentials: true })
                setProducts(res.data.payload)
            } catch (error) {
                setProducts([])
            }
        }
        fetchProducts()
    }, [id])

    return (
        <div className='w-full flex flex-col items-center p-1 sm:p-4'>
            {
                products.length > 0 ? <div className='w-full flex flex-col items-center gap-4 py-6'>
                    <p>You May Also Love</p>
                    <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'>
                        {
                            products.map((item) => (
                                <Item item={item} key={item._id}/>
                            ))
                        }
                    </div>
                </div> : <p>No product found</p>
            }
        </div>
    )
}

export default SameCategoryProducts
