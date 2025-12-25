import { isLogin } from '@/lib/middleware'
import React from 'react'

const Profile = async () => {
  const auth = await isLogin()
  const data = auth.payload
  console.log(data)
  return (
    <div>

    </div>
  )
}

export default Profile
