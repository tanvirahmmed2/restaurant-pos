import { isLogin } from '@/lib/auth/middleware'
import { redirect } from 'next/navigation'
import React from 'react'
export const metadata={
    title:'Login | Restaurant',
    description:'Login page'
}

const LoginLayout = async({children}) => {
    const auth= await isLogin()

    if(auth.success){
        return redirect('/profile')
    }

  return (
    <div>
      {children}
    </div>
  )
}

export default LoginLayout
