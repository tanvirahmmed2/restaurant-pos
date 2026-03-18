'use client'
import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MdStar } from 'react-icons/md'
import { Context } from '@/components/context/Context'

const Categories = () => {
    const { categories } = useContext(Context)
    if (!categories || categories.length === 0) return console.log('No category found')
    return (
        <div className='w-full flex flex-col items-center gap-4 py-5 min-h-screen'>
            <h1 className='text-base md:text-2xl font-semibold text-center flex items-center justify-center gap-4 flex-row'>Explore Our Top Categories <MdStar/></h1>
            <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-10'>
            
            {categories.map((cat) => (
                <motion.div initial={{opacity:0, scale:0.9, rotate:6}} whileInView={{opacity:1, scale:1, rotate:0}} transition={{duration:0.7}} key={cat._id} className=' gap-2 group shadow cursor-pointer flex items-center flex-col p-2 rounded-xl'>
                    <div className='w-full rounded-full overflow-hidden'>
                        <Image src={cat?.image} alt='category image' width={500} height={500} className='w-full aspect-square overflow-hidden object-cover group-hover:scale-105 transform ease-in-out duration-500  ' />
                    </div>
                    <Link href={`/category/${cat.slug}`} className='text-xs md:text-xl font-mono font-semibold'>{cat?.name}</Link>
                </motion.div>
            ))}
        </div>
        </div>
    )
}

export default Categories
