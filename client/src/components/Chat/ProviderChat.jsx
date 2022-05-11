import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProviderChatHistory, refreshChat, setClickChat } from '../../redux/slices/chat'
import { getUser } from '../../redux/slices/user'
import api from '../../services/api'
import './chat.css'

export default function ProviderChat() {
  const { user } = useSelector((state) => state.auth)
  const { UniqueUser } = useSelector((state) => state.user)
  const { actualChat } = useSelector((state) => state.chat)
  const { chatHistory } = useSelector((state) => state.chat)
  const { uniqueprovider } = useSelector((state) => state.provider)

  const dispatch = useDispatch()
  const idProveedor = user.id
  
  useEffect(() => {
      dispatch(getProviderChatHistory(idProveedor))
  }, [dispatch])
  
  const [providerMessage, setProviderMessage] = useState({
      idUsuario: "",
      idProveedor: idProveedor,
      mensajeProveedor: '',
    })
    

  function handleChangeProvider(e) {
    // console.log(idProveedor)
    e.preventDefault()
    setProviderMessage({
      ...providerMessage,
      [e.target.name]: e.target.value,
    })
  }

  function handleChat(idUsuario, idProveedor) {
    console.log(idProveedor)
    dispatch(setClickChat(idUsuario, idProveedor))
    dispatch(getUser(idUsuario))
    setProviderMessage({
      ...providerMessage,
      idUsuario: idUsuario,
    })
  }

  async function handleSubmitProveedor() {
    await api.post("http://localhost:3001/api/chat", providerMessage)
    dispatch(refreshChat(providerMessage))
    setProviderMessage({
        ...providerMessage,
        mensajeProveedor: '',
    })
  }

  return (
    <div className='container'>
      <div className='row clearfix'>
        <div className='col-lg-12'>
          <div className='card chat-app'>
            <div id='plist' className='people-list'>
                <h4 style={{display:"flex", justifyContent:"center"}}>Chats Abiertos</h4>
                <hr/>
              <div className='input-group'>
                {/* <input type='text' className='form-control' placeholder='Buscar...' /> */}
              </div>
              <ul className='list-unstyled chat-list mt-2 mb-0'>
                {chatHistory?.map((p) => (
                  <a href='#ScrollDown'>
                    <li className='clearfix' value={p.id} onClick={() => handleChat(p.id, idProveedor)}>
                      <img
                        src={p.IMAGEN}
                        alt='nt'
                        onError={(e) =>
                          (e.target.src =
                            'https://images-ext-2.discordapp.net/external/sDPHKeBTrgE7mhtTqdkBNgRWuod6SCz-ugAtCHW5FTE/%3Fx%3D480%26quality%3D20/https/www.softzone.es/app/uploads/2018/04/guest.png')
                        }
                      />
                      <div className='about'>
                        <div className='name'>{p.NOMBRE_APELLIDO_USUARIO}</div>
                        <div className='status'>
                          {' '}
                          <p>Usuario</p>
                        </div>
                      </div>
                    </li>
                  </a>
                ))}
              </ul>
            </div>

            <div className='chat'>
              <div className='chat-header clearfix'>
                <div className='row'>
                  <div className='col-lg-6'>
                    <img
                      src={UniqueUser.imagen}
                      style={{width:"45px", height:"45px"}}
                      alt='nt'
                      onError={(e) =>
                        (e.target.src =
                          'https://images-ext-2.discordapp.net/external/sDPHKeBTrgE7mhtTqdkBNgRWuod6SCz-ugAtCHW5FTE/%3Fx%3D480%26quality%3D20/https/www.softzone.es/app/uploads/2018/04/guest.png')
                      }
                    />
                    <div className='chat-about'>
                      <h5 className='m-b-0'>{UniqueUser.nombre_apellido_usuario}</h5>
                    </div>
                  </div>
                  <div className='col-lg-6 hidden-sm text-right'>
                    {/* <a href='javascript:void(0);' className='btn btn-outline-secondary'>
                      <i className='fa fa-camera'></i>
                    </a>
                    <a href='javascript:void(0);' className='btn btn-outline-primary'>
                      <i className='fa fa-image'></i>
                    </a>
                    <a href='javascript:void(0);' className='btn btn-outline-info'>
                      <i className='fa fa-cogs'></i>
                    </a>
                    <a href='javascript:void(0);' className='btn btn-outline-warning'>
                      <i className='fa fa-question'></i>
                    </a> */}
                  </div>
                </div>
              </div>
              <div className='chat-history'>
                <ul className='m-b-0'>
                  {actualChat.CHAT?.length > 0 ? (
                    actualChat.CHAT?.map((message, index) =>
                      message.includes(user.nombreApellido) ? (
                        <li className='clearfix' key={index}>
                          <div className='message other-message float-right'>{message}</div>
                        </li>
                      ) : (
                        <li className='clearfix'>
                          <div className='message my-message'>{message}</div>
                        </li>
                      )
                    )
                  ) : ( 
                    <>
                      <div className='row chat-empty '>
                        <img src='https://upload.wikimedia.org/wikipedia/commons/1/1a/Dialogos_2.png' style={{ width: '400px' }} />
                      </div>
                      <h4 style={{display:"flex", justifyContent:"center", margin:"50px", textAlign:"center"}}>Si usted accedio a este chat desde la seccion mis compras, debe enviar el mensaje antes de realizar cualquier otra accion, de lo contrario, Su proveedor no se guardara en su lista de Chats Abiertos y NO le podra enviar un Mensaje en un futuro, salvo que repita el procedimiento.</h4>
                    </>
                  )}
                  
                </ul>
                <div id='ScrollDown'></div>
              </div>
            </div>
            <div className='chat-message clearfix' style={{ marginLeft: '281px' }}>
              <div className='input-group mb-0'>
                <div className='input-group-prepend '></div>
                <input
                  type='text'
                  name='mensajeProveedor'
                  value={providerMessage.mensajeProveedor}
                  onChange={handleChangeProvider}
                  className='form-control'
                  placeholder='Escriba su mensaje aqui...'
                />
                <button type='button' className='btn btn-primary' onClick={handleSubmitProveedor}>
                  Enviar <i className='fa fa-commenting' aria-hidden='true'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
