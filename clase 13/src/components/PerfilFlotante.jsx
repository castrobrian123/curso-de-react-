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
        <img
        src={usuario.imagen}
        alt={usuario.username} />
        <h3> <FaUser /> {usuario.username}</h3>
        <p><strong> <FaEnvelope  /> Correo:</strong> {usuario.email}</p>
        <button onClick={handleLogout}> <FaSignOutAlt  /> Cerrar sesión </button>
    </div>
  );
}











