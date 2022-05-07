// import React, { useState } from "react";
// import styles from "../styles/filters.module.css";
// import { useDispatch } from "react-redux";
// import {
//   filterByProfesion,
//   filterByRemote,
//   filterByPrices,
// } from "../redux/slices/provider";

// export default function Filters({ setCurrentPage }) {
//   const [profesion, setProfesion] = useState("");
//   const dispatch = useDispatch();

//   const handleOnChange = (e) => {
//     e.preventDefault();
//     setProfesion(e.target.value);
//   };

//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     dispatch(filterByProfesion(profesion));
//     setProfesion("");
//     setCurrentPage(1)
//   };

//   const handleFilterByPrice = (e) => {
//     e.preventDefault();
//     dispatch(filterByPrices(e.target.value));
//     setCurrentPage(1)
//   };

//   const handleFilterByRemote = (e) => {
//     e.preventDefault();
//     dispatch(filterByRemote(e.target.value));
//     setCurrentPage(1)
//   };

//   return (
//     <>
//       <div className="d-flex container align-items-center justify-content-center">
//         <section>
//           <div className={styles.searchbg}>
//             <div className="mask d-flex align-items-center h-100">
//               <div className="container">
//                 <p className="display-4 font-weight-bold mt-3 mb-3 text-dark">
//                   Indicanos qué es lo que estas buscando
//                 </p>
//                 <div className={`"card" ${styles.searchbg}`}>
//                   <div className="card-body">
//                     <div className="row justify-content-center">
//                       <div className="col-md-5 mb-3 mb-md-0">
//                         <div id="basic" className="form-outline text-center">
//                           <div style={{ display: "flex" }}>
//                             <input
//                               type="text"
//                               placeholder="Profesion..."
//                               onChange={(e) => handleOnChange(e)}
//                               id="form1"
//                               className="form-control form-control-lg"
//                               autoComplete="off"
//                             />
//                             <input
//                               className="btn btn-secondary btn-block btn-lg"
//                               style={{marginLeft:"10px"}}
//                               type="submit"
//                               value="🔍"
//                               onClick={(e) => handleOnSubmit(e)}
//                             />
//                           </div>

//                           <label className="form-label" htmlFor="form1">
//                             ¿Qué servicio / profesion buscas?
//                           </label>
//                         </div>
//                       </div>

//                       <div className="col-md-3 mb-3 mb-md-0">
//                         <div id="location" className="form-outline text-center">
//                           <select
//                             name="cost"
//                             className="form-control form-control-lg"
//                             onChange={(e) => handleFilterByPrice(e)}
//                           >
//                             <option disabled hidden>
//                               Selecciona
//                             </option>
//                             <option>Todos</option>
//                             <option value={"MayorMenor"}>Mayor a menor</option>
//                             <option value={"MenorMayor"}>Menor a mayor</option>
//                           </select>
//                           <label className="form-label" htmlFor="form1">
//                             Ordenar por precio
//                           </label>
//                         </div>
//                       </div>

//                       {/* INICIA REMOTO CHECK */}
//                       <div className="col-md-2 mb-3 mb-md-0">
//                         <div
//                           className="d-flex align-items-center justify-content-center form-outline text-center"
//                           style={{ flexDirection: "column" }}
//                         >
//                           <select
//                             name="cost"
//                             className="form-control form-control-lg"
//                             onChange={(e) => handleFilterByRemote(e)}
//                             style={{ textAlign: "center" }}
//                           >
//                             <option disabled hidden>
//                               Selecciona
//                             </option>
//                             <option>Todos</option>
//                             <option value={"true"}>✓</option>
//                             <option value={"false"}>✘</option>
//                           </select>

//                           <label
//                             className="form-label"
//                             htmlFor="checkbox"
//                             style={{ margin: "0px" }}
//                           >
//                             ¿Remoto?
//                           </label>
//                         </div>
//                       </div>
//                       {/* TERMINA REMOTO CHECK */}
//                       {/* <div className="col-md-1">
//                         <input
//                           className="btn btn-secondary btn-block btn-lg"
//                           type="submit"
//                           value="🔍"
//                         />
//                       </div> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }
