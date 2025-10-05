import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


export default function Register({ USERS_URL, setIsAuthenticated, setUsuarioActivo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Obtener todos los usuarios
      const res = await fetch(USERS_URL);
      const usuarios = await res.json();

      if (usuarios.some(u => u.email === email)) {
        return alert("El correo ya está registrado");
      }

      const nuevoUsuario = { email, password };

      // Guardar en MockAPI
      const createRes = await fetch(USERS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      const usuarioCreado = await createRes.json();

      // Guardar en sessionStorage
      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioCreado));

      // Actualizar estado
      setIsAuthenticated(true);
      setUsuarioActivo(usuarioCreado);

      navigate("/");
    } catch (err) {
      console.error("Error en registro:", err);
      alert("Error al conectarse al servidor");
    }
  };

  return (
    <section className="Panel_De_Formulario_De_Contacto">

      <h2>Registrarse</h2>

      <form onSubmit={handleRegister}>

        <div className="contenedor_centrado">

          <input type="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} required />

        </div>

        <div className="contenedor_centrado">

          <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />

        </div>

        <div className="contenedor_centrado">

          <button type="submit">Registrarse</button>

        </div>

        
      </form>

      <div className="contenedor_centrado">

        <p>¿Ya tenés cuenta? <Link to="/login" className="boton">Iniciá sesión</Link></p>

      </div>

    </section>
  );
}





