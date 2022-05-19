import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserChatHistory, refreshChat, setClickChat } from '../../redux/slices/chat'
import api from '../../services/api'
import UserChat from "./UserChat"
import ProviderChat from "./ProviderChat"

export default function Chat() {
  const { user } = useSelector((state) => state.auth)
  // console.log(user)

  if(user.Role === "USUARIO"){
    return <UserChat />
  }else{
    return <ProviderChat />
  }
}
