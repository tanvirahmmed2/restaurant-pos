import React from 'react'

const About = () => {
  return (
    <div className='w-full flex flex-col md:flex-row items-center justify-center gap-2 min-h-150 p-4'>
        <div className='flex-1 flex-col gap-4 flex text-wrap'>
            <h1 className='text-3xl'>About Us</h1>
            <p className='font-semibold'>Every great meal begins with a story.</p>
            <p>Ours started with a simple dream — to create a place where food feels like home, flavors carry memories, and every guest is treated like family. What began as a small kitchen filled with passion has grown into a restaurant built on love, dedication, and respect for good food.</p>
            <p>We believe that great taste comes from honesty. That’s why we carefully select fresh ingredients, balance tradition with creativity, and cook every dish with attention and care. Each recipe reflects our roots, inspired by classic flavors and refined for today’s table.</p>
            <p>Our restaurant is more than just a place to eat — it’s a place to gather, celebrate, and slow down. From quiet dinners to joyful moments shared with friends and family, we’re honored to be part of your everyday memories.</p>
        </div>
        <div className='flex-1'>

        </div>
      
    </div>
  )
}

export default About
