import React from 'react'
import { useSelector } from 'react-redux'
import ProfileProveedor from './ProfileProvider/Profile'
import ProfileUser from './ProfileUser/Profile'

export default function Profile() {
  const { user } = useSelector((state) => state.auth)
  let role = user.Role

  return <>{role === 'PROVEEDOR' ? <ProfileProveedor /> : <ProfileUser />}</>
}
