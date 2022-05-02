import React from 'react';

export default function PAgination(props){


    let isFirstPage = props.currentPage === 1 ? 'disabled' : '';
    let isLastPage = props.currentPage === (Math.ceil(props.totalCards / props.cardsInPage)) ? 'disabled' : ''

    let {currentPage, setPagina} = props

    return (

        

        <nav aria-label="Page navigation">
  <ul class="pagination justify-content-center">
    <li class={`page-item ${isFirstPage}`}>
      <a href='#' class="page-link" onClick={()=> setPagina(currentPage-1)} tabindex="-1">Anterior</a>
    </li>
    <li class={`page-item ${isLastPage}`}>
      <a href='#' class="page-link" onClick={()=> setPagina(currentPage+1)}>Siguiente</a>
    </li>
  </ul>
</nav>
    )
}