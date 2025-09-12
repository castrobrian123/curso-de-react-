import { useState } from "react";
import "./App.css";

function App() {
  const [mensaje, setMensaje] = useState("");

  const mostrarSaludo = () => {
    setMensaje("¡Hola! 👋 Bienvenido a React con Vite");
    alert("¡Hola! 👋 Bienvenido a React con Vite");
  };

  return (
    <div className="contenedor">
      <h1 className="titulo">Ejercicio React + Vite</h1>
      <button onClick={mostrarSaludo} className="boton-saludo">
        Saludar
      </button>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
}

export default App;
