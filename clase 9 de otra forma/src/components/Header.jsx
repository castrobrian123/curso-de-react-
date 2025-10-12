import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import logoEmpresa from "../imagenes/logo de empresa.png";

const Header = () => {
  const { carrito, toggleCarrito } = useContext(CarritoContext);

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

