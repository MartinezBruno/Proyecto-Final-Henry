import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserChatHistory, newUserMessage, refreshChat, setClickChat } from '../../redux/slices/chat'
import { getUniqueProvider } from '../../redux/slices/provider'
import api from '../../services/api'
import './chat.css'

export default function UserChat() {
  const { user } = useSelector((state) => state.auth)
  const { msj } = useSelector((state) => state.chat)
  const { actualChat } = useSelector((state) => state.chat)
  const { chatHistory } = useSelector((state) => state.chat)
  const { idNewProvider } = useSelector((state) => state.chat)
  const { uniqueprovider } = useSelector((state) => state.provider)

  const dispatch = useDispatch()
  const idUsuario = user.id
  const idProvider = idNewProvider

  const [userMessage, setUserMessage] = useState({
    idUsuario: idUsuario,
    idProveedor: idProvider,
    mensajeUsuario: '',
  })

  useEffect(() => {
    dispatch(getUserChatHistory(idUsuario))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      dispatch(newUserMessage(userMessage))
      dispatch(refreshChat(userMessage))
    }, 10000);
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
                    <li className='clearfix' value={p.id} onClick={() => handleChat(idUsuario, p.id)}>
                      <img
                        src={p.IMAGEN}
                        alt='nt'
                        onError={(e) =>
                          (e.target.src =
                            'https://images-ext-2.discordapp.net/external/sDPHKeBTrgE7mhtTqdkBNgRWuod6SCz-ugAtCHW5FTE/%3Fx%3D480%26quality%3D20/https/www.softzone.es/app/uploads/2018/04/guest.png')
                        }
                      />
                      <div className='about'>
                        <div className='name'>{p.NOMBRE_APELLIDO_PROVEEDOR}</div>
                        <div className='status'>
                          {' '}
                          <p>Proveedor de Servicio</p>
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
                      src={uniqueprovider.imagen}
                      alt='nt'
                      onError={(e) =>
                        (e.target.src =
                          'https://images-ext-2.discordapp.net/external/sDPHKeBTrgE7mhtTqdkBNgRWuod6SCz-ugAtCHW5FTE/%3Fx%3D480%26quality%3D20/https/www.softzone.es/app/uploads/2018/04/guest.png')
                      }
                    />
                    <div className='chat-about'>
                      <h5 className='m-b-0'>{uniqueprovider.nombre_apellido_proveedor}</h5>
                    </div>
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
                  {/* <li className='clearfix'>
                    <div className='message-data text-right'>
                      <span className='message-data-time'>10:10 AM, Today</span>
                      <img src='https://bootdey.com/img/Content/avatar/avatar7.png' alt='avatar' />
                    </div>
                    <div className='message other-message float-right'> Hi Aiden, how are you? How is the project coming along? </div>
                  </li>
                  <li className='clearfix'>
                    <div className='message-data'>
                      <span className='message-data-time'>10:12 AM, Today</span>
                    </div>
                    <div className='message my-message'>Are we meeting today?</div>
                  </li>
                  <li className='clearfix'>
                    <div className='message-data'>
                      <span className='message-data-time'>10:15 AM, Today</span>
                    </div>
                    <div className='message my-message'>Project has been already finished and I have results to show you.</div>
                  </li> */}
                </ul>
                <div id='ScrollDown'></div>
              </div>
            </div>
            <div className='chat-message clearfix' style={{ marginLeft: '281px' }}>
              <div className='input-group mb-0'>
                <div className='input-group-prepend '></div>
                <input
                  type='text'
                  name='mensajeUsuario'
                  value={userMessage.mensajeUsuario}
                  onChange={handleChangeUser}
                  className='form-control'
                  placeholder='Escriba su mensaje aqui...'
                />
                <button type='button' className='btn btn-primary' onClick={handleSubmitUsuario}>
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
