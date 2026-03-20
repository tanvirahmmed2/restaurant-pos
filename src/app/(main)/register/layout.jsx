import { isLogin } from '@/lib/auth/middleware'
import { redirect } from 'next/navigation'
import React from 'react'
export const metadata={
    title:'Register | Restaurant',
    description:'Register page'
}

const RegisterLayout = async({children}) => {
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

export default RegisterLayout
