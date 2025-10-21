import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


import { toast } from 'react-toastify';

import { FaUserPlus, FaSignInAlt } from "react-icons/fa";

export default function Register({ USERS_URL }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { loginUsuarioDirecto } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const nombreNormalizado = username.trim();

    if (!nombreNormalizado || !password) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    if (password.length < 4) {
      toast.error("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    try {
      // ... (Validación de usuario existente y creación - sin cambios) ...

      // Validación de usuario existente
      const res = await fetch(USERS_URL);
      const usuarios = await res.json();

      if (usuarios.some(u => u.username?.trim() === nombreNormalizado)) {
        toast.error("El usuario ya está registrado.");
        return;
      }

      // Creación de usuario
      const nuevoUsuario = { username: nombreNormalizado, password, email: "" }; // Se podría agregar email
      const createRes = await fetch(USERS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!createRes.ok) throw new Error("Error al crear el usuario");

      const usuarioCreado = await createRes.json();
      
      loginUsuarioDirecto(usuarioCreado);
      toast.success(`🎉 ¡Registro exitoso! Bienvenido, ${nombreNormalizado}.`, { autoClose: 2000 });
      
      navigate("/productos");

    } catch (err) {
      console.error("Error en registro:", err);
      toast.error("❌ Error al conectarse al servidor.");
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
          <button type="submit" className="boton"> <FaUserPlus style={{ marginRight: "5px" }} /> Registrarse</button>
        </div>
      </form>

      <div className="contenedor_centrado">
        <p>
          ¿Ya tenés cuenta? <Link to="/login" className="boton"> <FaSignInAlt style={{ marginRight: "5px" }} /> Iniciá sesión</Link>
        </p>
      </div>
    </section>
  );
}



