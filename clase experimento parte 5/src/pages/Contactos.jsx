

import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Contactos() {
  const [tipo, setTipo] = useState("consulta");
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    puesto: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
    
    if (e.target.value === "consulta") {
      setFormData({
        ...formData,
        puesto: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", { tipo, ...formData });
    alert(
      tipo === "empleo"
        ? "Solicitud de empleo enviada con éxito ✅"
        : "Consulta enviada con éxito ✅"
    );
    
  };

  return (
    <section className="Panel_De_Formulario_De_Contacto">
      <h2>Formulario de Contacto</h2>

      <form className="Formulario_De_Contacto" onSubmit={handleSubmit}>
        <label htmlFor="tipo">Tipo de contacto</label>
        <select id="tipo" value={tipo} onChange={handleTipoChange}>
          <option value="consulta">Consulta general</option>
          <option value="empleo">Solicitud de empleo</option>
        </select>

        <label htmlFor="nombre">Nombre completo</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />

        <label htmlFor="correo">Correo electrónico</label>
        <input
          type="email"
          id="correo"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          required
        />

        <label htmlFor="telefono">Teléfono</label>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
        />

        {tipo === "empleo" && (
          <>
            <label htmlFor="puesto">Puesto al que desea postularse</label>
            <input
              type="text"
              id="puesto"
              name="puesto"
              value={formData.puesto}
              onChange={handleChange}
              required={tipo === "empleo"}
            />
          </>
        )}

        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="4"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder={
            tipo === "empleo"
              ? "Contanos por qué querés trabajar con nosotros..."
              : "Escribí tu consulta aquí..."
          }
        ></textarea>

        <div className="botones">
          <button type="submit">
            {tipo === "empleo" ? "Enviar solicitud" : "Enviar consulta"}
          </button>
          <Link to="/" className="cancelar">
            Volver al inicio
          </Link>
        </div>
      </form>
    </section>
  );
}

