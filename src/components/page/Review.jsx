'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { RiMapPinUserLine, RiDoubleQuotesL } from 'react-icons/ri'
import { motion, AnimatePresence } from 'framer-motion'

const Review = () => {
    const [reviews, setReviews] = useState([])
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get('/api/review', { withCredentials: true })
                setReviews(res.data.payload)
            } catch (error) {
                setReviews([])
            }
        }
        fetchReviews()
    }, [])

    useEffect(() => {
        if (reviews.length === 0) return
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % reviews.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [reviews])

    if (!reviews || reviews.length === 0) return null

    return (
        <section className='w-full py-16 bg-slate-300 overflow-hidden'>
            <div className='max-w-4xl mx-auto px-6 text-center'>
                <h2 className='text-3xl font-bold text-slate-800 mb-2'>Guest Experiences</h2>
                <div className='w-20 h-1 bg-black mx-auto mb-10 rounded-full' />

                <div className='relative h-87.5 flex items-center justify-center'>
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={reviews[index]._id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className='absolute w-full max-w-2xl bg-white border border-slate-100 shadow-xl rounded-3xl p-8 md:p-12 flex flex-col items-center gap-4'
                        >
                            <RiDoubleQuotesL className='text-4xl text-slate-200 absolute top-6 left-8' />
                            
                            <div className='w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-4xl text-slate-400 border-4 border-white shadow-sm'>
                                <RiMapPinUserLine />
                            </div>

                            <div className='space-y-1'>
                                <h3 className='text-xl font-bold text-slate-800'>{reviews[index].name}</h3>
                                <p className='text-[8px] text-slate-400 font-medium uppercase tracking-widest'>{reviews[index].email}</p>
                            </div>

                            <p className='text-slate-600 italic leading-relaxed text-lg'>
                                "{reviews[index].comment}"
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className='flex justify-center gap-3 mt-8'>
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`h-2 transition-all duration-300 rounded-full ${
                                i === index ? 'w-8 bg-black' : 'w-2 bg-slate-300'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Review