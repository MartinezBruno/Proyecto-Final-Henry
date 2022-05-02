import React from 'react'

export default function PAgination(props) {
  let isFirstPage = props.currentPage === 1 ? 'disabled' : ''
  let isLastPage =
    props.currentPage === Math.ceil(props.totalCards / props.cardsInPage)
      ? 'disabled'
      : ''

  let { currentPage, setPagina } = props

  return (
    <nav aria-label='Page navigation'>
      <ul className='pagination justify-content-center'>
        <li className={`page-item ${isFirstPage}`}>
          <a
            href='#'
            className='page-link'
            onClick={() => setPagina(currentPage - 1)}
            tabIndex='-1'>
            Anterior
          </a>
        </li>

        <li className={`page-item ${isLastPage}`}>
          <a
            href='#'
            className='page-link'
            onClick={() => setPagina(currentPage + 1)}>
            Siguiente
          </a>
        </li>
      </ul>
      <div className='pagination justify-content-center'>
        <p>
          {currentPage} de {Math.ceil(props.totalCards / props.cardsInPage)}
        </p>
      </div>
    </nav>
  )
}
