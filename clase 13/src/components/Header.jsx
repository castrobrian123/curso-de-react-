import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";
import logoEmpresa from "../imagenes/logo de empresa.png";
import {
  FaShoppingCart,
  FaUserCircle,
  FaSignOutAlt,
  FaHome,
  FaInfoCircle,
  FaPhoneAlt,
  FaBoxOpen,
  FaTools,
  FaBars,
  FaTimes
} from "react-icons/fa";

const Header = () => {
  const { carrito, toggleCarrito } = useContext(CarritoContext);
  const { usuario, logout } = useContext(AuthContext);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const totalItems = carrito.reduce((sum, p) => sum + p.cantidad, 0);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <header>
      <section className="barra_navegacion">
        <div className="Logo_De_Empresa">
          <img src={logoEmpresa} alt="Logo de la Empresa" />
          <h2>Changolandia</h2>
        </div>

        
        <button className="hamburguesa" onClick={toggleMenu}>
          {menuAbierto ? <FaTimes /> : <FaBars />}
        </button>

        
        <nav className={`menu_navegacion ${menuAbierto ? "activo" : ""}`}>
          <ul>
            <li><Link to="/inicio" onClick={cerrarMenu}><FaHome /> Inicio</Link></li>
            <li><Link to="/acerca" onClick={cerrarMenu}><FaInfoCircle /> Acerca de la Empresa</Link></li>
            <li><Link to="/contactos" onClick={cerrarMenu}><FaPhoneAlt /> Contactos</Link></li>
            <li><Link to="/productos" onClick={cerrarMenu}><FaBoxOpen /> Productos</Link></li>
            <li><Link to="/admin" onClick={cerrarMenu}><FaTools /> Administración</Link></li>
          </ul>
        </nav>

        <div className="acciones">
          <button onClick={toggleCarrito} id="boton-carrito">
            <FaShoppingCart className="icon-cart" /> Carrito ({totalItems})
          </button>
        </div>
      </section>
    </header>
  );
};

export default Header;









