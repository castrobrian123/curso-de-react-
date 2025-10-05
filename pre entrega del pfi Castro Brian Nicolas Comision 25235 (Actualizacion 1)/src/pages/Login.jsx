import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ USERS_URL, setIsAuthenticated, setUsuarioActivo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(USERS_URL);
      const usuarios = await res.json();

      const usuario = usuarios.find(u => u.email === email && u.password === password);
      if (!usuario) return alert("Usuario o contraseña incorrectos");

      
      sessionStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("usuarioActivo", JSON.stringify(usuario));

      
      setIsAuthenticated(true);
      setUsuarioActivo(usuario);

      navigate("/");
    } catch (err) {
      console.error("Error en login:", err);
      alert("Error al conectarse al servidor");
    }
  };

  return (
    <div className="Panel_De_Formulario_De_Contacto">

      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleLogin}>

        <div className="contenedor_centrado">

          <input type="email" placeholder="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} required />

        </div>

        <div className="contenedor_centrado">

          <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} required />

        </div>

        <div className="contenedor_centrado">

          <button type="submit" className="boton">Iniciar Sesion</button>

        </div>

      </form>

      <div className="contenedor_centrado">

        <p>¿No tenés cuenta? <Link to="/register" className="boton" >Registrate</Link></p>

      </div>
      
    </div>
  );
}





