import About from '@/components/page/About'
import Intro from '@/components/page/Intro'
import Latest from '@/components/page/Latest'
import React from 'react'

const Main = () => {
  return (
    <div className='w-full overflow-hidden'>
      <Intro/>
      <Latest/>
      <About/>
    </div>
  )
}

export default Main
