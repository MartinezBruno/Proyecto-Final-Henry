import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cleanActualChat, cleanNewProvider, getUserChatHistory, newUserMessage, refreshChat, setClickChat } from '../../redux/slices/chat'
import { getUniqueProvider } from '../../redux/slices/provider'
import api from '../../services/api'
import './chat.css'

export default function UserChat() {
  const { user } = useSelector((state) => state.auth)
  const { actualChat } = useSelector((state) => state.chat)
  const { chatHistory } = useSelector((state) => state.chat)
  const { idNewProvider } = useSelector((state) => state.chat)
  const { uniqueprovider } = useSelector((state) => state.provider)

  const idProvider = idNewProvider
  const dispatch = useDispatch()
  const idUsuario = user.id

  const [userMessage, setUserMessage] = useState({
    idUsuario: idUsuario,
    idProveedor: idProvider,
    mensajeUsuario: '',
  })

  useEffect(() => {
    dispatch(getUserChatHistory(idUsuario))
    dispatch(getUniqueProvider(idProvider))
    dispatch(cleanActualChat())
    return () => dispatch(cleanNewProvider())
  }, [])

  useEffect(() => {
    setTimeout(() => {
      dispatch(newUserMessage(userMessage))
      dispatch(refreshChat(userMessage))
    }, 10000)
  }, [actualChat.msj])

  function handleChangeUser(e) {
    e.preventDefault()
    setUserMessage({
      ...userMessage,
      [e.target.name]: e.target.value,
    })
  }

  //Cambiar de un chat a otro
  function handleChat(idUsuario, idProveedor) {
    dispatch(cleanNewProvider())
    dispatch(setClickChat(idUsuario, idProveedor))
    dispatch(getUniqueProvider(idProveedor))
    setUserMessage({
      ...userMessage,
      idProveedor: idProveedor,
    })
  }

  async function handleSubmitUsuario() {
    await api.post('/chat', userMessage)
    dispatch(refreshChat(userMessage))
    setUserMessage({
      ...userMessage,
      mensajeUsuario: '',
    })
  }

  return (
    <div className='container'>
      <div className='ScrollDownButton'>
      </div>
      <div className='row clearfix'>
        <div className='col-lg-12'>
          <div className='card chat-app'>
            <div id='plist' className='people-list' style={{ height: '79vh', border: '1px solid lightgray', borderRight: '2px solid lightgray' }}>
              <h4 style={{ display: 'flex', justifyContent: 'center' }}>Chats Abiertos</h4>
              <hr style={{ height: '2px', marginTop: '20px' }} />
              <ul className='list-unstyled chat-list mt-2 mb-0'>
                {chatHistory.length > 0 ? (
                  chatHistory?.map((p) => (
                    <a href='#ScrollDown'>
                      <li className='clearfix' value={p.id} onClick={() => handleChat(idUsuario, p.id)}>
                        <img
                          src={p.IMAGEN}
                          alt='nt'
                          style={{ width: '45px', height: '45px' }}
                          onError={(e) =>
                            (e.target.src =
                              'https://images-ext-2.discordapp.net/external/sDPHKeBTrgE7mhtTqdkBNgRWuod6SCz-ugAtCHW5FTE/%3Fx%3D480%26quality%3D20/https/www.softzone.es/app/uploads/2018/04/guest.png')
                          }
                        />
                        <div className='about'>
                          <div className='name' style={{ fontWeight: 'bold', fontSize: '16px' }}>
                            {p.NOMBRE_APELLIDO_PROVEEDOR}
                          </div>
                          <div className='status'>
                            {' '}
                            <p>Proveedor de Servicio</p>
                          </div>
                        </div>
                      </li>
                    </a>
                  ))
                ) : (
                  <p style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', fontSize: '18px' }}>
                    {' '}
                    ¡No tienes chats abiertos! Compra algún Servicio para poder interactuar con tu proveedor{' '}
                  </p>
                )}
              </ul>
            </div>

            <div className='chat'>
                <div className='sticky-top chat-header clearfix' style={{backgroundColor: 'white', zIndex: '1', borderBottom: '2px solid lightgray' }}>
                <div className='row '>
                  <div className='col-lg-6 '>
                    {actualChat.id || idProvider ? (
                      <>
                        <img
                          src={uniqueprovider.imagen}
                          alt='nt'
                          style={{ width: '40px', height: '40px' }}
                          onError={(e) =>
                            (e.target.src =
                              'https://images-ext-2.discordapp.net/external/sDPHKeBTrgE7mhtTqdkBNgRWuod6SCz-ugAtCHW5FTE/%3Fx%3D480%26quality%3D20/https/www.softzone.es/app/uploads/2018/04/guest.png')
                          }
                        />
                        <div className='chat-about'>
                          <h5 className='m-b-0'>{uniqueprovider.nombre_apellido_proveedor}</h5>
                        </div>
                      </>
                    ) : (
                      <>
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm7KJ0CyjRQU4eXlks0Wcl6sK_mtdJTkl-vCpVLH0804q2DBLgppv35pJ9DOeDaEk6sbw&usqp=CAU' />
                        <div className='chat-about'>
                          <h5 className='m-b-0'>Seleccione un Chat</h5>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className='chat-history'>
                {actualChat.CHAT?.length > 0 ? (
                  <div className='ScrollDownButton' style={{ backgroundColor: 'rgba(128, 128, 128, 0.464)' }}>
                    <a href='#ScrollDown'>
                      <i class='fa fa-arrow-down' aria-hidden='true'></i>
                    </a>
                  </div>
                ) : (
                  ''
                )}
                <ul className='m-b-0' id='h'>
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
                        <img src='https://upload.wikimedia.org/wikipedia/commons/1/1a/Dialogos_2.png' style={{ width: '400px', marginTop: '70px' }} />
                      </div>
                      {idNewProvider ? (
                        <h4 style={{ display: 'flex', justifyContent: 'center', margin: '50px', textAlign: 'center' }}>
                          ¡Envia el primer mensaje para establecer un chat con Tu Proveedor! Una vez enviado, el chat quedará guardado en la sección ubicada a
                          la izquierda <br />
                          "Chats Abiertos", para que tengas un acceso rápido y fácil.
                        </h4>
                      ) : (
                        <h4 style={{ display: 'flex', justifyContent: 'center', margin: '50px', textAlign: 'center' }}>
                          ¡Mantente conectado con tus proveedores y chatea con ellos en vivo! Acceda a un chat para empezar a hablar
                        </h4>
                      )}
                    </>
                  )}
                </ul>
                <div id='ScrollDown'></div>
              </div>
            </div>
            <div className='chat-message clearfix' >
              {idNewProvider || actualChat.length !== 0 ? (
                <div className='input-group mb-0'>
                  <div className='input-group-prepend '></div>
                  <input
                    type='text'
                    name='mensajeUsuario'
                    value={userMessage.mensajeUsuario}
                    onChange={handleChangeUser}
                    className='form-control'
                    style={{ borderRadius: '20px', marginLeft: '20px', marginBottom: '20px' }}
                    placeholder='Escriba su mensaje aqui...'
                  />

                  <button
                    type='button'
                    className='btn btn-primary'
                    onClick={handleSubmitUsuario}
                    style={{ borderRadius: '20px', marginLeft: '20px', marginRight: '30px', marginBottom: '20px' }}>
                    Enviar <i className='fa fa-commenting' aria-hidden='true'></i>
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
