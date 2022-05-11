import React from 'react'
import { useEffect } from 'react'
import { getUser } from '../redux/slices/user'
import { useDispatch, useSelector } from 'react-redux'
import ProfileProveedor from './ProfileProvider/Profile'
import ProfileUser from './ProfileUser/Profile'

export default function Profile() {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  let role = user.Role

  useEffect(() => {
    dispatch(getUser(user.id))
  }, [dispatch])

  return <>{role === 'PROVEEDOR' ? <ProfileProveedor /> : <ProfileUser />}</>
}
