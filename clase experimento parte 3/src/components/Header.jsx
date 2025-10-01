
// src/components/Header.jsx  (modificar)
import { Link, useNavigate } from "react-router-dom";
import logoEmpresa from "../imagenes/logo de empresa.png";

export default function Header({ carritoCount, toggleCarrito, isAuthenticated, usuarioActivo, setIsAuthenticated, setUsuarioActivo }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    localStorage.removeItem("isAuthenticated");
    setUsuarioActivo && setUsuarioActivo(null);
    setIsAuthenticated && setIsAuthenticated(false);
    navigate("/");
  };

  const openCarrito = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    toggleCarrito && toggleCarrito();
  };

  return (
    <header>
      <section className="barra_navegacion">
        <div className="Logo_De_Empresa">
          <img src={logoEmpresa} alt="Logo de la Empresa" />
          <h2>Changolandia</h2>
        </div>

        <nav className="menu_navegacion">
          <ul>
            <li>
              <Link to="/inicio">Inicio</Link>
            </li>

            <li>
              <Link to="/acerca">Acerca de la Empresa</Link>
            </li>
            <li>
              <Link to="/contactos">Contactos</Link>
            </li>

            <li>
              <Link to="/productos">Productos</Link>
            </li>

            <li>
              <Link to="/admin" >Administracion</Link>
            </li>
            

            <li>
              <button id="boton-carrito" onClick={toggleCarrito}>
                Ver Carrito
              </button>
            </li>



          </ul>
        </nav>

        <div className="acciones">
          <button onClick={openCarrito}>Carrito ({carritoCount || 0})</button>

          {isAuthenticated ? (
            <>
              <span>{usuarioActivo?.email}</span>
              <Link to="/admin">Admin</Link>
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Registro</Link>
            </>
          )}
        </div>
      </section>
    </header>
  );
}
