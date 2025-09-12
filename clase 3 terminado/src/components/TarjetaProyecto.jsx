import React from "react";
import "../styles/TarjetaProyecto.css";

const TarjetaProyecto = ({ titulo, descripcion, botonTexto }) => {
  const handleClick = () => {
    console.log(`Explorando: ${titulo}`);
  };

  return (
    <div className="proyecto-card">
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
      <button onClick={handleClick}>{botonTexto}</button>
    </div>
  );
};

export default TarjetaProyecto;
