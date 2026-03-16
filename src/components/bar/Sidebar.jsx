'use client'
import Link from 'next/link'
import React from 'react'
import Logout from '../buttons/Logout'

const Sidebar = ({ isSidebar, setIsSidebar, isLogin, role }) => {
    return (
        <div className={`w-full flex md:hidden items-center flex-col justify-center gap-2 p-4 ${isSidebar ? 'flex' : 'hidden'} bg-white`}>
            <Link href={'/'} onClick={() => setIsSidebar(false)}>Home</Link>
            <Link href={'/menu'} onClick={() => setIsSidebar(false)}>Menu</Link>
            <Link href={'/support'}>Support</Link>
            <Link href={'/reservation'}>Reservation</Link>
            {role === 'manager' && <Link href={'/manage'} onClick={() => setIsSidebar(false)}>Manage</Link>}
            {role === 'sales' && <Link href={'/sales'} onClick={() => setIsSidebar(false)}>Sales</Link>}
            {
                isLogin ? <div className=' w-auto flex flex-col items-center justify-center gap-2'>

                    <Link href={'/profile'} onClick={() => setIsSidebar(false)}>Profile</Link>
                    <Link href={'/cart'} onClick={() => setIsSidebar(false)}>Cart</Link>
                    <p onClick={() => setIsSidebar(false)}><Logout /></p>
                </div> :
                    <Link href={'/login'} onClick={() => setIsSidebar(false)}>Login</Link>
            }


        </div>
    )
}

export default Sidebar
