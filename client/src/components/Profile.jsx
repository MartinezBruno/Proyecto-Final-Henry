import React, { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../redux/slices/user";
import styles from "../styles/profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import ProfileEditInfo from "./ProfileEditInfo";
import ProfileShowInfo from "./ProfileShowInfo";

export default function Profile() {
  const [isEditing, setEditing] = useState(false);
  

  const dispatch = useDispatch();
  const { UniqueUser } = useSelector((state) => state.user)
  const { user } = useSelector((state) => state.auth)


  useEffect(() => {
    dispatch(getUser(user.id))
  },[dispatch])

  return (
    <>
      <div className="container" style={{ marginTop: "20px" }}>
        <div className={styles.mainBody}>
          <div className={`row gutters-sm ${styles.guttersSm}`}>
            <div className={`col-md-4 mb-3 ${styles.mb3}`}>
              <div className={styles.card}>
                <div className={`card-body ${styles.cardBody}`}>
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={UniqueUser.imagen}
                      alt="Admin"
                      className="rounded-circle"
                      width="150"
                      onError={(e) => (e.target.src = 'data:image/png;base64,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')}
                    />
                    <div className="mt-3">
                      <h4>{UniqueUser.nombre_apellido_usuario}</h4>
                      
                      <p className="text-muted font-size-sm">
                        {UniqueUser.pais + ", " + UniqueUser.provincia} 
                      </p>
                      {/* <button className="btn btn-primary" style={{margin: '7px'}}>Follow</button>
                      <button className="btn btn-outline-primary">Mensaje</button> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* CUADRO DE APLICACIONES DE CONTACTO WEB */}

              <div className={`${styles.card} mt-3`}>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                    <span className="text-secondary">https://bootdey.com</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                    <span className="text-secondary">bootdey</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                    <span className="text-secondary">@bootdey</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram mr-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                    <span className="text-secondary">bootdey</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook mr-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                    <span className="text-secondary">bootdey</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              {isEditing ? (
                <ProfileEditInfo changeForm={setEditing} />
                ) : (
                  <ProfileShowInfo changeForm={setEditing} />
                )}

              {/* CUADRO DE MIS EMPLEADORES Y MIS EMPLEADOS */}

              <div className="row gutters-sm">
                <div className="col-sm-6 mb-3">
                  <div className={`${styles.card} h-100`}>
                    <div className={`card-body ${styles.cardBody}`}>
                      <h6 className="d-flex align-items-center mb-3"><i className="fa fa-black-tie text-secondary" style={{marginRight: '5px'}}aria-hidden="true">      </i> MIS EMPLEADORES</h6>
                      <small>Web Design</small>
                      <div className="progress mb-3" style={{height: '5px'}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Website Markup</small>
                      <div className="progress mb-3" style={{height: '5px'}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "72%"}} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>One Page</small>
                      <div className="progress mb-3" style={{height: '5px'}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "89%"}} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Mobile Template</small>
                      <div className="progress mb-3" style={{height: '5px'}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "55%"}} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Backend API</small>
                      <div className="progress mb-3" style={{height: '5px'}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "66%"}} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className={`${styles.card} h-100`}>
                    <div className={`card-body ${styles.cardBody}`}>
                      <h6 className="d-flex align-items-center mb-3"><i className="fa fa-user text-secondary" style={{marginRight: '5px'}}aria-hidden="true">      </i> MIS CLIENTES</h6>

                      <small>Web Design</small>
                      <div className="progress mb-3" style={{height: '5px'}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Website Markup</small>
                      <div className="progress mb-3" style={{height: '5px'}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "72%"}} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>One Page</small>
                      <div className="progress mb-3" style={{height: '5px'}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "89%"}} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Mobile Template</small>
                      <div className="progress mb-3" style={{height: '5px'}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "55%"}} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Backend API</small>
                      <div className="progress mb-3" style={{height: '5px'}}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{width: "66%"}} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}