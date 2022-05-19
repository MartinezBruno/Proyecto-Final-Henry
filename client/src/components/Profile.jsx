import React from 'react'
import { useSelector } from 'react-redux'
import ProfileProveedor from './ProfileProvider/Profile'
import ProfileUser from './ProfileUser/Profile'
import Banned from './Banned'

export default function Profile() {
  const { user } = useSelector((state) => state.auth)
  // console.log(user)
  let role = user.Role
  if (user) {
    var banned = user.banned
  }
  if (banned === 'Si') {
    return <Banned />
  }

  return <>{role === 'PROVEEDOR' ? <ProfileProveedor /> : <ProfileUser />}</>
}
