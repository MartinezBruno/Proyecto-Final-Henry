import styles from '../../styles/landingpage.module.css'
import NavBar from './Navbar'
import Footer from './Footer'
import 'animate.css'
import { useSelector } from 'react-redux'

export default function LandingPage() {

  return (
    <>
      <div className='container-fluid'>
        <NavBar />

        <div className={`container-fluid`}>
          <div className='container-fluid text-white text-center'>
            <div style={{ marginBottom: '150px', marginTop: '150px' }}>
              <h1>ENLACES PROFESIONALES DE CALIDAD</h1>
              <h6>OFRECE O CONTRATA SERVICIOS PROFESIONALES SIN FRONTERAS</h6>
              <br />
              <br />
              <a className='animate__animated animate__slideInUp btn btn-lg btn-success' href='/home'>
                <span>¡COMIENZA AHORA!</span>{' '}
              </a>
            </div>

            <div className={`${styles.widgetContainer}`}>
              <div className={styles.landingWidget}>
                <i className='fa fa-users fa-2x text-'></i>
                <hr />
                Conectar con proveedores nunca fue mas facil. Contrata tus servicios favoritos de forma rapida y segura.
              </div>
              <div className={styles.landingWidget}>
                {/* Logo de Seguridad */}
                <i className='fa fa-shield fa-2x' aria-hidden='true'></i>
                <hr />
                Protegemos a los proveedores y usuarios ofreciendo un ecosistema de Pago Seguro.
              </div>
              <div className={styles.landingWidget}>
                <i className='fa fa-trophy fa-2x text-dark'></i>
                <hr />
                Recompensamos su confianza otorgandole beneficios únicos y exclusivos para vos.
              </div>
              <div className={styles.landingWidget}>
                <i className='fa fa-handshake-o fa-2x text-dark'></i>
                <hr />
                Conviertete en provedor y ayuda a +10.000 usuarios a Resolver sus necesidades.
              </div>
            </div>
          </div>
        </div>
        {/* NO BORRAR, ES EL HERO */}
        <div className={styles.hero}></div>
        {/* NO BORRAR, ES EL HERO */}

        {/* <div className="container" style={{marginBottom: '25px'}}>
  <div className="row align-items-center justify-content-center mt-3 mb-3 text-center">

    <h1 style={{margin: '50px'}}>SATISFACCIÓN GARANTIZADA</h1>

    <div className="d-flex flex-wrap column justify-content-center" style={{marginBottom: '150px'}}>

    <div className="col align-items-center justify-content-center" style={{width: '5rem', borderLeft: '1px solid black',borderRight: '1px solid black', padding: '10px', backgroundColor: 'white', boxShadow:' 0 0 5px 1px rgba(0, 0, 0, 0.4)', margin: '10px', borderRadius: '15px'}}>
      <h4>Siempre respaldados</h4>

      <p>Todos los usuarios, son validados por los administradores y entre los mismos usuarios.</p>
    </div>

    <div className="col align-items-center justify-content-center" style={{width: '5rem', borderLeft: '1px solid black',borderRight: '1px solid black', padding: '10px', backgroundColor: 'white', boxShadow:' 0 0 5px 1px rgba(0, 0, 0, 0.4)', margin: '10px', borderRadius: '15px'}}>
      <h4>Privacidad de datos</h4>

      <p>Los datos que compartas con nosotros serán protegidos y nunca serán compartidos a terceros.</p>

    </div>
    </div>
  

  </div>
  </div> */}
      </div>
    </>
  )
}
