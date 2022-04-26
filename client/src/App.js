import logo from './logo.svg';
import './App.css';
import {useSelector, useDispatch} from 'react-redux'
import {pruebaFunction} from './redux/slices/prueba.js'

function App() {

  let {test: hola} = useSelector(state => state.prueba)
  let dispatch = useDispatch();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {hola ? <p>{hola}</p> : null}
        <button onClick={()=> dispatch(pruebaFunction('HOLA'))}>MOSTRAR STRING</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
