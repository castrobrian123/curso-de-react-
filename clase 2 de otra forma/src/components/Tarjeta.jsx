import React from "react";
import Boton from "./Boton";
import "../styles/App.css";

const Tarjeta = ({ titulo, descripcion, botonTexto }) => {
  return (
    <div className="tarjeta">
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      <Boton texto={botonTexto} />
    </div>
  );
};

export default Tarjeta;