import React from 'react'
import styles from '../styles/login.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { providerLogin, userLogin } from '../redux/slices/auth'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import api from './../services/api'
import { SetQuestion, setAnswer } from '../redux/slices/provider'

export default function Questions(props) {
  const dispatch = useDispatch()
  const { message } = useSelector((state) => state.provider)
  const { isLoggedIn } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.auth)
  const { serviceProvider } = useSelector((state) => state.provider)

  const [Question, setQuestion] = useState({
    idUsuario: user.id,
    idProveedor: serviceProvider[0]?.id,
    idServicio: serviceProvider[0]?.servicio.id,
    pregunta: '',
  })

  const [Answer, setAnswer] = useState({
    idPregunta: Number(message),
    idProveedor: user.id,
    respuesta: '',
  })

  function handleQuestionChange(e) {
    e.preventDefault()
    setQuestion({
      ...Question,
      [e.target.name]: e.target.value,
    })
  }
  function handleAnswerChange(e) {
    e.preventDefault()
    setAnswer({
      ...Answer,
      [e.target.name]: e.target.value,
    })
  }

  function handleQuestionSubmit(e) {
    dispatch(SetQuestion(Question))
    Swal.fire('Su Pregunta fue agregada correctamente', '', 'success')
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }
  async function handleAnswerSubmit(e) {
    // console.log(Answer)
    await api.patch('/pregunta/respuesta', Answer)
    Swal.fire('Su Respuesta fue agregada correctamente', '', 'success')
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  //Si se inicia sesión desde un modal
  if (user.Role === 'USUARIO') {
    return (
      <>
        <div class='mb-3'>
          <label for='exampleFormControlTextarea1' class='form-label'>
            Preguntale a tu Proveedor!
          </label>
          <textarea
            name={'pregunta'}
            value={Question.pregunta}
            onChange={handleQuestionChange}
            class='form-control'
            id='exampleFormControlTextarea1'
            rows='3'
            placeholder='Escribe tu pregunta...'></textarea>
        </div>
        <div class='d-grid gap-2 d-md-flex justify-content-md-end'>
          <button class='btn btn-primary me-md-2' type='button' onClick={handleQuestionSubmit}>
            Enviar Pregunta
          </button>
        </div>
      </>
    )
  }
  if (user.Role === 'PROVEEDOR') {
    return (
      <>
        <div class='mb-3'>
          <label for='exampleFormControlTextarea1' class='form-label'>
            Respondele al Usuario
          </label>
          <textarea
            name={'respuesta'}
            value={Answer.respuesta}
            onChange={handleAnswerChange}
            class='form-control'
            id='exampleFormControlTextarea1'
            rows='3'
            placeholder='Escribe tu respuesta...'></textarea>
        </div>
        <div class='d-grid gap-2 d-md-flex justify-content-md-end'>
          <button class='btn btn-primary me-md-2' type='button' onClick={handleAnswerSubmit}>
            Enviar Respuesta
          </button>
        </div>
      </>
    )
  }
}
