import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setChatActual } from '../../redux/slices/chat'
import api from '../../services/api'
import './chat.css'

export default function Chat() {
  const { chatActual } = useSelector((state) => state.chat)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const idUsuario = user.id
  console.log(idUsuario)

  const [userMessage, setUserMessage] = useState({
    idUsuario: idUsuario,
    idProveedor: 'db792087-2c18-488b-a299-d01c17e47f99',
    mensajeUsuario: '',
  })

    const [providerMessage, setProviderMessage] = useState({
      idUsuario: idUsuario,
      idProveedor: 'db792087-2c18-488b-a299-d01c17e47f99',
      mensajeProveedor: ''
    })

  const idProveedor = 'db792087-2c18-488b-a299-d01c17e47f99'

  function handleChangeUser(e) {
    e.preventDefault()
    setUserMessage({
      ...userMessage,
      [e.target.name]: e.target.value,
    })
  }
  function handleChangeProvider(e) {
    e.preventDefault()
    setProviderMessage({
      ...providerMessage,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmitUsuario() {
    await api.post('http://localhost:3001/api/chat', userMessage)
    dispatch(setChatActual(userMessage))
  }
  function handleSubmitProveedor() {
    // await api.post("http://localhost:3001/api/chat", providerMessage)
    dispatch(setChatActual(idUsuario, idProveedor))
  }

  return (
    <div className='container'>
      <div className='row clearfix'>
        <div className='col-lg-12'>
          <div className='card chat-app'>
            <div id='plist' className='people-list'>
              <div className='input-group'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>
                    <i className='fa fa-search'></i>
                  </span>
                </div>
                <input type='text' className='form-control' placeholder='Search...' />
              </div>
              <ul className='list-unstyled chat-list mt-2 mb-0'>
                <li className='clearfix' >
                  <img src='https://bootdey.com/img/Content/avatar/avatar1.png' alt='avatar' />
                  <div className='about'>
                    <div className='name'>Vincent Porter</div>
                    <div className='status'>
                      {' '}
                      <i className='fa fa-circle offline'></i> left 7 mins ago{' '}
                    </div>
                  </div>
                </li>
                {/* <li className='clearfix active'>
                  <img src='https://bootdey.com/img/Content/avatar/avatar2.png' alt='avatar' />
                  <div className='about'>
                    <div className='name'>Aiden Chavez</div>
                    <div className='status'>
                      {' '}
                      <i className='fa fa-circle online'></i> online{' '}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <img src='https://bootdey.com/img/Content/avatar/avatar3.png' alt='avatar' />
                  <div className='about'>
                    <div className='name'>Mike Thomas</div>
                    <div className='status'>
                      {' '}
                      <i className='fa fa-circle online'></i> online{' '}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <img src='https://bootdey.com/img/Content/avatar/avatar7.png' alt='avatar' />
                  <div className='about'>
                    <div className='name'>Christian Kelly</div>
                    <div className='status'>
                      {' '}
                      <i className='fa fa-circle offline'></i> left 10 hours ago{' '}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <img src='https://bootdey.com/img/Content/avatar/avatar8.png' alt='avatar' />
                  <div className='about'>
                    <div className='name'>Monica Ward</div>
                    <div className='status'>
                      {' '}
                      <i className='fa fa-circle online'></i> online{' '}
                    </div>
                  </div>
                </li>
                <li className='clearfix'>
                  <img src='https://bootdey.com/img/Content/avatar/avatar3.png' alt='avatar' />
                  <div className='about'>
                    <div className='name'>Dean Henry</div>
                    <div className='status'>
                      {' '}
                      <i className='fa fa-circle offline'></i> offline since Oct 28{' '}
                    </div>
                  </div>
                </li> */}
              </ul>
            </div>
            
            <div className='chat'>
              <div className='chat-header clearfix'>
                <div className='row'>
                  <div className='col-lg-6'>
                    {/* <a href='javascript:void(0);' data-toggle='modal' data-target='#view_info'>
                      <img src='https://bootdey.com/img/Content/avatar/avatar2.png' alt='avatar' />
                    </a> */}
                    <div className='chat-about'>
                      <h6 className='m-b-0'>Aiden Chavez</h6>
                      <small>Last seen: 2 hours ago</small>
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
                  {chatActual.CHAT?.map((message,index) =>
                    message.includes(user.nombreApellido) ? (
                      <li className='clearfix' key={index}>
                        <div className='message other-message float-right'>{message}</div>
                      </li>
                    ) : (
                      <li className='clearfix'>
                        <div className='message my-message'>{message}</div>
                      </li>
                    )
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
              </div>
              <div className='chat-message clearfix'>
                <div className='input-group mb-0'>
                  <div className='input-group-prepend'></div>
                  {user.Role === 'USUARIO' ? (
                    <>
                      <input
                        type='text'
                        name='mensajeUsuario'
                        value={userMessage.mensajeUsuario}
                        onChange={handleChangeUser}
                        className='form-control'
                        placeholder='Escriba su mensaje aqui...'
                      />
                      <button type='button' className='btn btn-primary' onClick={handleSubmitUsuario}>
                        Enviar <i className="fa fa-commenting" aria-hidden="true"></i>
                      </button>
                    </>
                  ) : user.Role === 'PROVEEDOR' ? (
                    <>
                      <input
                        type='text'
                        name='mensajeProveedor'
                        value={providerMessage.mensajeProveedor}
                        onChange={handleChangeProvider}
                        className='form-control'
                        placeholder='Escriba su mensaje aqui...'
                      />
                      <button type='button' className='btn btn-primary' onClick={handleSubmitProveedor}>
                        Enviar
                        <i className="fa fa-external-link-square" aria-hidden="true"></i>
                      </button>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
