import React, { useEffect } from 'react'
import { chargeServices } from '../../redux/slices/services'
import {chargeUserEmergency, chargeProvEmergency} from '../../redux/slices/emergency'
import { useSelector, useDispatch } from 'react-redux'
import 'moment/locale/es'
import styles from '../../styles/emergencies.module.css'
import UserEmergency from './UserEmergency'
import ProvEmergency from './ProvEmergency,'
import { getAllProvidersEmergency } from '../../redux/slices/provider'

export default function Emergency() {
  let role
  let dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { dbServices } = useSelector((state) => state.services)
  const { userEmergency } = useSelector((state) => state.emergency)
  const { providerEmergency } = useSelector((state) => state.emergency)
  const { allProviders } = useSelector((state) => state.provider)


  
  if (user) {
    role = user.Role
  }

  //////////////////////////////////////////////////////useEffect para cargar los servicios y la emergencia
  useEffect(() => {
    dispatch(getAllProvidersEmergency())
    if(role==='USUARIO'){
        dispatch(chargeServices())
        if(user.id){
            dispatch(chargeUserEmergency(user.id))
            }
    }
    else if(role==='PROVEEDOR'){
        dispatch(chargeServices())
        if(user.id){
            dispatch(chargeProvEmergency(user.id))
            }
    }
    
  }, [dispatch])
//////////////////////////////////////////////////////////

if(dbServices.length>0 && allProviders.length>0){
  return (
    <>
      {role === 'USUARIO' && <UserEmergency userEmergency={userEmergency} dbServices={dbServices} allProviders={allProviders}/>}
      {role === 'PROVEEDOR' && <ProvEmergency providerEmergency={providerEmergency} dbServices={dbServices} />}
    </>
  )
}

  
}
