
//Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function getUsers() {
  return JSON.parse(localStorage.getItem("usuarios") || "[]");
}

export default function Login({ setIsAuthenticated, setUsuarioActivo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      setError("Credenciales inválidas");
      return;
    }
    localStorage.setItem("usuarioActivo", JSON.stringify(user));
    localStorage.setItem("isAuthenticated", "true");
    setUsuarioActivo && setUsuarioActivo(user);
    setIsAuthenticated && setIsAuthenticated(true);
    navigate("/"); 
  };

  return (

    <section className="Panel_De_Formulario_De_Contacto" >

      <h2>Iniciar sesión</h2>

      {error && <p className="error" >{error}</p>}

      <form onSubmit={handleLogin}>

        <div className="contenedor_centrado">

          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} required />

        </div>

        <div className="contenedor_centrado">

          <label>Contraseña</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

        </div>

        <div className="contenedor_centrado">
          
          <button type="submit" className="boton">Ingresar</button>

        </div>

      </form>

      <div className="contenedor_centrado" >

        <p>¿No tenés cuenta? <Link to="/register" className="boton" >Registrate</Link></p>

      </div>

    </section>

  );

}
