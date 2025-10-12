import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


export default function PerfilFlotante() {
  const { usuario, logout, togglePerfil } = useContext(AuthContext);

  if (!usuario) return null;

  return (
    <div className="perfil-flotante">
      <div className="perfil-contenido">
        <h4>👤 Perfil</h4>
        <p><strong>Usuario:</strong> {usuario.username}</p>
        <p><strong>Email:</strong> {usuario.email}</p>

        <div className="botones-perfil">
          <button className="boton-cerrar" onClick={logout}>
            Cerrar Sesión
          </button>
          <button className="boton-cerrar" onClick={togglePerfil}>
            Ocultar Perfil
          </button>
        </div>
      </div>
    </div>
  );
}








