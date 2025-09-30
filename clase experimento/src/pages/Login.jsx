
export default function Login({ isAuthenticated, setIsAuthenticated }) {
  const handleLogin = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <section style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{isAuthenticated ? "Ya iniciaste sesión" : "Iniciar Sesión"}</h2>
      <button onClick={handleLogin}>
        {isAuthenticated ? "Cerrar Sesión" : "Iniciar Sesión"}
      </button>
    </section>
  );
}