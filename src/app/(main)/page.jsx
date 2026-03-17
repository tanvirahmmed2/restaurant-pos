import About from '@/components/page/About'
import Category from '@/components/page/Category'
import Intro from '@/components/page/Intro'
import Latest from '@/components/page/Latest'
import Review from '@/components/page/Review'
import React from 'react'

const Main = () => {
  return (
    <div className='w-full px-1 sm:px-4 overflow-hidden min-h-screen flex flex-col items-center justify-center py-5'>
      <Intro/>
      <Latest/>
      <Review/>
      <Category/>
      <About/>
    </div>
  )
}

export default Main
