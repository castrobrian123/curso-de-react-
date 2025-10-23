import { Link } from "react-router-dom";
import { useContext } from "react";

import logoEmpresa from "../imagenes/logo de empresa.png";

import { FaShoppingCart, FaUser, FaUserCircle, FaSignOutAlt,  FaHome, FaInfoCircle, FaPhoneAlt, FaBoxOpen, FaTools } from "react-icons/fa";

const Header = () => {

  return (
    <header>
      <section className="barra_navegacion">
        <div className="Logo_De_Empresa">
          <img src={logoEmpresa} alt="Logo de la Empresa" />
          <h2>Programacion</h2>
          <h2>Estructurada</h2>
        </div>

        <nav className="menu_navegacion">
          <ul>
            <li><Link to="/inicio"> <FaHome /> Inicio</Link></li>
            <li><Link to="/acerca"> <FaInfoCircle /> Acerca de la pagina</Link></li>
            <li><Link to="/las_unidades"> <FaBoxOpen /> Las Unidades</Link></li>
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;








