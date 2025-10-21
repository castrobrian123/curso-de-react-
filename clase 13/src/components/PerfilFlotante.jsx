import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { FaSignOutAlt, FaUser, FaEnvelope } from "react-icons/fa";

export default function PerfilFlotante({ usuario, onLogout }) {
  const { togglePerfil } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!usuario) return null;

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="perfil-flotante">
      <div className="perfil-contenido">
        <img
        src={usuario.imagen}
        alt={usuario.username}
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          display: "block",
          margin: "0 auto 10px auto"
        }}
      />
        <h3> <FaUser /> {usuario.username}</h3>
        <p><strong> <FaEnvelope style={{ marginRight: "5px" }} /> Correo:</strong> {usuario.email}</p>
        <button onClick={handleLogout}> <FaSignOutAlt style={{ marginRight: "5px" }} /> Cerrar sesión </button>
      </div>
    </div>
  );
}











