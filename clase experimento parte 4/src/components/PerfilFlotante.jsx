

// components/PerfilFlotante.jsx
import React from "react";

export default function PerfilFlotante({ usuario, onLogout }) {
  if (!usuario) return null;

  return (
    <div className="perfil-flotante">
      <div className="perfil-contenido">
        <h4>👤 Perfil</h4>
        <p><strong>Email:</strong> {usuario.email}</p>
        <button onClick={onLogout}>Cerrar Sesión</button>
      </div>
    </div>
  );
}
