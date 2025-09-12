import React from "react";
import EquipoTalentoLab from "./components/EquipoTalentoLab";
import TarjetaProyecto from "./components/TarjetaProyecto";
import GaleriaIntereses from "./components/GaleriaIntereses";
import "./styles/App.css";

import silviaImg from "./assets/images/silvia.jpg";
import luisImg from "./assets/images/luis.jpg";
import matiasImg from "./assets/images/matias.jpg";
import sabrinaImg from "./assets/images/sabrina.jpg";

const equipo = [
  { nombre: "Silvia", rol: "Product Owner", imagen: silviaImg },
  { nombre: "Luis", rol: "Diseñador UX/UI", imagen: luisImg },
  { nombre: "Matías", rol: "Desarrollador", imagen: matiasImg },
  { nombre: "Sabrina", rol: "Desarrolladora", imagen: sabrinaImg },
];

const intereses = ["React", "JavaScript", "APIs", "Diseño UX", "Node.js"];

function App() {
  return (
    <div className="app">
      <h1>🌟 Equipo TalentoLab</h1>
      <EquipoTalentoLab equipo={equipo} />

      <h1>🚀 Proyectos</h1>
      <div className="proyectos-container">
        <TarjetaProyecto
          titulo="Plataforma de Gestión"
          descripcion="Una herramienta para optimizar la gestión de equipos."
          botonTexto="Explorar proyecto"
        />
        <TarjetaProyecto
          titulo="App de Aprendizaje"
          descripcion="Aplicación para cursos online con interactividad."
          botonTexto="Ver más"
        />
      </div>

      <h1>🎯 Intereses</h1>
      <GaleriaIntereses intereses={intereses} />
    </div>
  );
}

export default App;
