import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register({ USERS_URL }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { loginUsuarioDirecto } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const nombreNormalizado = username.trim();

    if (!nombreNormalizado || !password) {
      return setError("Todos los campos son obligatorios.");
    }

    if (password.length < 4) {
      return setError("La contraseña debe tener al menos 4 caracteres.");
    }

    try {
      // Traer usuarios actuales desde MockAPI
      const res = await fetch(USERS_URL);
      const usuarios = await res.json();

      // Verificar si el usuario ya existe
      if (usuarios.some(u => u.username?.trim() === nombreNormalizado)) {
        return setError("El usuario ya está registrado.");
      }

      // Crear nuevo usuario
      const nuevoUsuario = { username: nombreNormalizado, password };
      const createRes = await fetch(USERS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!createRes.ok) throw new Error("Error al crear el usuario");

      const usuarioCreado = await createRes.json();

      // Iniciar sesión automáticamente usando loginUsuarioDirecto
      loginUsuarioDirecto(usuarioCreado);

      navigate("/productos");
    } catch (err) {
      console.error("Error en registro:", err);
      setError("Error al conectarse al servidor.");
    }
  };

  return (
    <section className="Panel_De_Formulario_De_Contacto">
      <h2>Registrarse</h2>

      <form onSubmit={handleRegister}>
        <div className="contenedor_centrado">
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="contenedor_centrado">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="mensaje-error">{error}</p>}

        <div className="contenedor_centrado">
          <button type="submit" className="boton">Registrarse</button>
        </div>
      </form>

      <div className="contenedor_centrado">
        <p>
          ¿Ya tenés cuenta? <Link to="/login" className="boton">Iniciá sesión</Link>
        </p>
      </div>
    </section>
  );
}



