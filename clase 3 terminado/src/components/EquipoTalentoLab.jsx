import React from "react";
import "../styles/EquipoTalentoLab.css";

const EquipoTalentoLab = ({ equipo }) => {
  return (
    <div className="equipo-container">
      {equipo.map((miembro, index) => (
        <div className="card" key={index}>
          <img src={miembro.imagen} alt={miembro.nombre} className="avatar" />
          <h3>{miembro.nombre}</h3>
          <p>{miembro.rol}</p>
        </div>
      ))}
    </div>
  );
};

export default EquipoTalentoLab;
