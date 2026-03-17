'use client'
import React, { useContext } from 'react'
import { Context } from '../context/Context'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const Category = () => {
    const { categories } = useContext(Context)
    if (!categories || categories.length === 0) return console.log('No category found')
    return (
        <div className='w-full grid grid-cols-2 md:grid-cols-4  gap-10 p-4'>
            {categories.map((cat) => (
                <motion.div initial={{opacity:0, scale:0.9, rotate:6}} whileInView={{opacity:1, scale:1, rotate:0}} transition={{duration:0.7}} key={cat._id} className=' gap-2 group shadow cursor-pointer flex items-center flex-col p-2 rounded-2xl'>
                    <div className='w-full rounded-2xl overflow-hidden'>
                        <Image src={cat?.image} alt='category image' width={500} height={500} className='w-full aspect-square overflow-hidden object-cover group-hover:scale-105 transform ease-in-out duration-500  ' />
                    </div>
                    <Link href={`/category/${cat.slug}`} className='text-xs md:text-xl font-mono font-semibold'>{cat?.name}</Link>
                </motion.div>
            ))}
        </div>
    )
}

export default Category
