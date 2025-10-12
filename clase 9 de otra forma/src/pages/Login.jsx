
import { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    const result = await login(nombre, password);
    setCargando(false);

    if (result.success) {
      // Si venía de una ruta protegida, redirige a ella
      const destino = location.state?.from?.pathname || "/";
      navigate(destino);
    } else {
      setError(result.message || "Error al iniciar sesión");
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
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

