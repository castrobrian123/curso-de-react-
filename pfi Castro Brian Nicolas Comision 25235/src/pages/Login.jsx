
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { toast } from 'react-toastify';

import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Login = ({ USERS_URL }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false); 

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    const success = await login(username, password, USERS_URL);
    setCargando(false);

    if (success) {
      toast.success(`👋 ¡Bienvenido de nuevo, ${username}!`, { autoClose: 2000 });
      navigate("/inicio");
    } else {
      // Reemplazo de setError con toast.error
      toast.error("❌ Usuario o contraseña incorrectos", { autoClose: 3000 });
    }
  };

  return (
    <div className="Panel_De_Formulario_De_Contacto">
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleSubmit}>
        <div className="contenedor_centrado">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="contenedor_centrado">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="contenedor_centrado">
          <button type="submit" className="boton" disabled={cargando}>
            {cargando ? "Validando..." : "Ingresar"}
          </button>
        </div>
      </form>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      <div className="contenedor_centrado">
        <p>
          ¿No tenés cuenta?{" "}
          <Link to="/register" className="boton">
            <FaUserPlus style={{ marginRight: "5px" }} /> Registrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;



