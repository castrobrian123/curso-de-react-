
// pages/Register.jsx
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

    const newUser = { email, password }; // mock: contraseña en claro (NO usar en producción)
    users.push(newUser);
    saveUsers(users);
    localStorage.setItem("usuarioActivo", JSON.stringify(newUser));
    localStorage.setItem("isAuthenticated", "true");
    setUsuarioActivo && setUsuarioActivo(newUser);
    setIsAuthenticated && setIsAuthenticated(true);
    navigate("/"); // o /carrito si preferís
  };

  return (
    <section style={{ padding: 20, maxWidth: 500, margin: "auto" }}>
      <h2>Registro</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Crear cuenta</button>
      </form>
      <p>¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></p>
    </section>
  );
}
