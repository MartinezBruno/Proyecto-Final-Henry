import React from 'react'
import { useState } from 'react'
import api from "../../services/api"
import Swal from 'sweetalert2'


export default function NewService() {

    const [input, setInput] = useState({
        nombreServicio : "",
        remote: false,
    })

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        api.post("/admin/newService", input).then(() => Swal.fire('Servicio Creado Correctamente', '', 'success'))
    }

  return (
    <>

      <div class='d-grid gap-5 col-4 mx-auto' style={{margin:"350px 0"}}>
      <h2 style={{ display: 'flex', marginBottom: '50px', textAlign: 'center', justifyContent: 'center' }}>Crear Servicio</h2>

        <form>
          <div class='mb-3'>
            <label for='exampleInputEmail1' class='form-label'>
              Nombre del Servicio
            </label>
            <input type='text' name="nombreServicio" value={input.nombreServicio} class='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' onChange={(e) => handleChange(e)} />
            <div class='form-text'>
              Selecciona un nombre para el servicio
            </div>
          </div>
          <div class='mb-3'>
            <label class='form-label'>
            Remoto
            </label>
            <select name='remote'  id='disabledSelect' class='form-select' onChange={(e) => handleChange(e)}>
              <option value={'All'} selected disabled hidden>Selecciona un estado</option>
              <option value={'true'}>True</option>
              <option value={'false'}>False</option>
            </select>
            <div id='emailHelp' class='form-text'>
              Selecciona si el servicio puede ser realizado de forma Remota o Presencial
            </div>
          </div>
          <button type="button" class="btn btn-primary" onClick={(e) => handleSubmit(e)}>Crear</button>
        </form>
      </div>
    </>
  )
}
