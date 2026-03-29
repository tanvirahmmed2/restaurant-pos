'use client'
import Link from 'next/link'
import React, { useContext } from 'react'
import Logout from '../buttons/Logout'
import { Context } from '../context/Context'

const Sidebar = ({ isSidebar, setIsSidebar, }) => {
    const {cartBar,setCartBar, userData, staffData}= useContext(Context)
    const handleGotoCart=()=>{
        setCartBar(!cartBar)
        setIsSidebar(false)
    }
    return (
        <div className={`w-full flex md:hidden items-center flex-col justify-center gap-2 p-4 ${isSidebar ? 'flex' : 'hidden'} bg-white`}>
            <Link href={'/'} onClick={() => setIsSidebar(false)}>Home</Link>
            <Link href={'/menu'} onClick={() => setIsSidebar(false)}>Menu</Link>
            <Link href={'/support'} onClick={() => setIsSidebar(false)}>Support</Link>
            <Link href={'/reservation'} onClick={() => setIsSidebar(false)}>Reservation</Link>
            
          <button className='hover:opacity-70 cursor-pointer' onClick={handleGotoCart} >Cart</button>
            {
                userData ? <div className=' w-auto flex flex-col items-center justify-center gap-2'>

                    <Link href={'/profile'} onClick={() => setIsSidebar(false)}>Profile</Link>
                    <p onClick={() => setIsSidebar(false)}><Logout /></p>
                </div> :
                    <Link href={'/login'} onClick={() => setIsSidebar(false)}>Login</Link>
            }


        </div>
    )
}

export default Sidebar
