import React, { useState } from "react";
import "../styles/GaleriaIntereses.css";

const GaleriaIntereses = ({ intereses }) => {
  const [activos, setActivos] = useState([]);

  const toggleInteres = (interes) => {
    setActivos((prev) =>
      prev.includes(interes)
        ? prev.filter((i) => i !== interes)
        : [...prev, interes]
    );
  };

  return (
    <div className="galeria">
      {intereses.map((interes, index) => (
        <button
          key={index}
          className={`btn-interes ${activos.includes(interes) ? "activo" : ""}`}
          onClick={() => toggleInteres(interes)}
        >
          {interes}
        </button>
      ))}
    </div>
  );
};

export default GaleriaIntereses;
