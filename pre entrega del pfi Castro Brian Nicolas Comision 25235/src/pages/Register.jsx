
//Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function getUsers() {
  return JSON.parse(localStorage.getItem("usuarios") || "[]");
}
function saveUsers(users) {
  localStorage.setItem("usuarios", JSON.stringify(users));
}

export default function Register({ setIsAuthenticated, setUsuarioActivo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (e) => /\S+@\S+\.\S+/.test(e);

  const handleRegister = (ev) => {
    ev.preventDefault();
    setError("");
    if (!validateEmail(email)) return setError("Ingresa un email válido.");
    if (password.length < 4) return setError("La contraseña debe tener al menos 4 caracteres.");

    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      return setError("El usuario ya existe.");
    }

    const newUser = { email, password }; 
    users.push(newUser);
    saveUsers(users);
    localStorage.setItem("usuarioActivo", JSON.stringify(newUser));
    localStorage.setItem("isAuthenticated", "true");
    setUsuarioActivo && setUsuarioActivo(newUser);
    setIsAuthenticated && setIsAuthenticated(true);
    navigate("/"); 
  };

  return (
    <section className="Panel_De_Formulario_De_Contacto" >
      <h2>Registro</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRegister}>

        <div className="contenedor_centrado">

          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />

        </div>

        <div className="contenedor_centrado">

          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        </div>

        <div className="contenedor_centrado">

          <button type="submit" className="boton">Crear cuenta</button>

        </div>
        
      </form>

      <div className="contenedor_centrado">

        <p>¿Ya tenés cuenta? <Link to="/login" className="boton">Iniciá sesión</Link></p>

      </div>
      
    </section>

  );

}
