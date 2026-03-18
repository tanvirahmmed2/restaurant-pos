import About from '@/components/page/About'
import FlashSale from '@/components/page/FlashSale'
import Intro from '@/components/page/Intro'
import Latest from '@/components/page/Latest'
import Review from '@/components/page/Review'
import React from 'react'

const Main = () => {
  return (
    <div className='w-full overflow-hidden min-h-screen flex flex-col items-center justify-center '>
      <Intro/>
      <FlashSale/>
      <Review/>
      <Latest/>
      <About/>
    </div>
  )
}

export default Main
