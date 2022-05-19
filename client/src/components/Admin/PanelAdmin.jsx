import { Modal } from 'bootstrap'
import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import NewService from './NewService'

export default function PanelAdmin() {

  return (
    <div
      class='d-grid gap-5 col-4 mx-auto'
      style={{
        display: 'flex',
        border: '5px solid gray',
        borderRadius: '20px',
        margin: 'auto',
        marginTop: '100px',
        padding: '100px 0',
        textAlign: 'center',
        justifyContent: 'center',
      }}>
      <h2 style={{ display: 'flex', marginBottom: '50px', textAlign: 'center', justifyContent: 'center' }}>PANEL DE ADMINISTRADOR</h2>
      <NavLink to={'/admin/usersList'}>
        <button class='btn btn-primary' type='button'>
          LISTA DE USUARIOS
        </button>
      </NavLink>
      <NavLink to={'/admin/providersList'}>
        <button class='btn btn-primary' type='button'>
          LISTA DE PROVEEDORES
        </button>
      </NavLink>

      <NavLink to={'/admin/salesHistory'}>
        <button class='btn btn-primary' type='button'>
          HISTORIAL DE COMPRAS
        </button>
      </NavLink>

      <NavLink to={'/admin/ayudas'}>
        <button class='btn btn-primary' type='button'>
          LISTA DE AYUDAS
        </button>
      </NavLink>

      <NavLink to={'/admin/newService'}>
        <button class='btn btn-primary' type='button'>
          CREAR NUEVO SERVICIO
        </button>
      </NavLink>
    </div>
  )
}
