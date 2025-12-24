import Link from 'next/link'
import React from 'react'
import Logout from '../buttons/Logout'
import Profile from '../buttons/Profile'

const Sidebar = ({ sidebar }) => {
    return (
        <div className={`w-full flex items-center flex-col justify-center gap-2 p-4 ${sidebar ? 'flex' : 'hidden'}`}>
            <Link href={'/'}>Home</Link>
            <Link href={'/menu'}>Menu</Link>
            <Link href={'/login'}>Login</Link>
            <Link href={'/cart'}>Cart</Link>
            <Link href={'/manage'}>Manage</Link>
            <Link href={'/sales'}>Sales</Link>
            <Logout />
            <Profile />


        </div>
    )
}

export default Sidebar
