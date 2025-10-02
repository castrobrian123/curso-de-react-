
// src/pages/Login.jsx
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
    // redirect to previous page or carrito/admin
    navigate("/"); // o navigate("/carrito") si querés
  };

  return (
    <section style={{ padding: 20, maxWidth: 500, margin: "auto" }}>
      <h2>Iniciar sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Ingresar</button>
      </form>
      <p>¿No tenés cuenta? <Link to="/register">Registrate</Link></p>
    </section>
  );
}
