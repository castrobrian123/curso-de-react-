import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const PerfilFlotante = () => {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!usuario) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="perfil-flotante">
      <div className="perfil-contenido">
        <h4>👤 Perfil</h4>
        <img
          src={usuario.imagen}
          alt="Avatar"
          className="perfil-avatar"
        />
        <p><strong>Usuario:</strong> {usuario.username}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default PerfilFlotante;





