import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
        <h3>{usuario.username}</h3>
        <p><strong>Correo:</strong> {usuario.email}</p>
        <button onClick={handleLogout}> Cerrar sesión </button>
      </div>
    </div>
  );
}











