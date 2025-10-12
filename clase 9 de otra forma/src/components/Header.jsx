import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";
import logoEmpresa from "../imagenes/logo de empresa.png";



const Header = () => {
  const { carrito, toggleCarrito } = useContext(CarritoContext);
  const { usuario, togglePerfil, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirige al login al cerrar sesión
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
                <Link to="/login">Administración</Link>
              </li>
            
          </ul>
        </nav>

        <div className="acciones">
          <button onClick={toggleCarrito} id="boton-carrito">
            🛒 Carrito ({carrito.length})
          </button>

          

          
        </div>
      </section>
    </header>
  );
};

export default Header;
