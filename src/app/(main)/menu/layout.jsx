import React from 'react'

export const metadata={
    title:'Menu | Restaurant',
    description:'MenuBar site'
}


const Menuayout = async({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default Menuayout
