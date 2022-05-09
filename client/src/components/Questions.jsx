import React from 'react'
import styles from '../styles/login.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { providerLogin, userLogin } from '../redux/slices/auth'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import api from './../services/api'
import { SetQuestion } from '../redux/slices/provider'

export default function Questions(props) {
  const dispatch = useDispatch()
  const { mensaje } = useSelector((state) => state.message)
  const { isLoggedIn } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.auth)
  const { serviceProvider } = useSelector((state) => state.provider)

  const [Question, setQuestion] = useState({
    idUsuario:user.id,
    idProveedor:serviceProvider[0]?.id,
    idServicio:serviceProvider[0]?.servicio.id,
    pregunta:'',
  })

  function handleChange(e){
    e.preventDefault()
    setQuestion({
      ...Question,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e){
    dispatch(SetQuestion(Question))
    // window.location.href = `http://localhost:3000/home/${serviceProvider[0]?.servicio.id}/${serviceProvider[0]?.id}`
    window.location.reload()
}
  


  if (props.isModal) {
    //Si se inicia sesión desde un modal
    return (
      <>
        {/* <div class='form-check form-switch'>
          <input class='form-check-input' value={true} type='checkbox' role='switch' id='anonimo' checked />
          <label class='form-check-label' for='anonimo'>
            Hacer la pregunta como anonimo
          </label>
        </div> */}
        <div class='mb-3'>
          <label for='exampleFormControlTextarea1' class='form-label'>
            Preguntale a tu Proveedor!
          </label>
          <textarea
            name={'pregunta'}
            value={Question.pregunta}
            onChange={handleChange}
            class='form-control'
            id='exampleFormControlTextarea1'
            rows='3'
            placeholder='Escribe tu pregunta...'></textarea>
        </div>
        <div class='d-grid gap-2 d-md-flex justify-content-md-end'>
          <button class='btn btn-primary me-md-2' type='button' onClick={handleSubmit}>
            Enviar Pregunta
          </button>
        </div>
      </>
    )
  }
}
