
// Header.jsx
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
        {/* Logo y nombre */}
        <div className="Logo_De_Empresa">

          <img src={logoEmpresa} alt="Logo de la Empresa" />
          <h2>Changolandia</h2>

        </div>

        {/* Menú principal */}
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
              <Link to="/admin">Administración</Link>
            </li>

          </ul>

        </nav>

        {/* Acciones: carrito y sesión */}
        <div className="acciones">

          <button id="boton-carrito" onClick={openCarrito}>
            Carrito ({carritoCount || 0})
          </button>

        </div>

      </section>

    </header>

  );

}

