import { useState } from 'react'
import ListaUsuarios from "./components/ListaUsuarios";
import Botones from './components/Botones';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <ListaUsuarios></ListaUsuarios>
      <Botones></Botones>
    </div>
    </>
  )
}

export default App
