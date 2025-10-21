import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { AuthContext } from "../context/AuthContext";
import logoEmpresa from "../imagenes/logo de empresa.png";

import { FaShoppingCart, FaUser, FaUserCircle, FaSignOutAlt,  FaHome, FaInfoCircle, FaPhoneAlt, FaBoxOpen, FaTools } from "react-icons/fa";

const Header = () => {
  const { carrito, toggleCarrito } = useContext(CarritoContext);
  const { usuario, logout } = useContext(AuthContext);

  const totalItems = carrito.reduce((sum, p) => sum + p.cantidad, 0);

  return (
    <header>
      <section className="barra_navegacion">
        <div className="Logo_De_Empresa">
          <img src={logoEmpresa} alt="Logo de la Empresa" />
          <h2>Changolandia</h2>
        </div>

        <nav className="menu_navegacion">
          <ul>
            <li><Link to="/inicio"> <FaHome /> Inicio</Link></li>
            <li><Link to="/acerca"> <FaInfoCircle /> Acerca de la Empresa</Link></li>
            <li><Link to="/contactos"> <FaPhoneAlt /> Contactos</Link></li>
            <li><Link to="/productos"> <FaBoxOpen /> Productos</Link></li>

            <li><Link to="/admin"> <FaTools /> Administración</Link></li>
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








