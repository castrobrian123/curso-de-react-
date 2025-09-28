
import { Link } from "react-router-dom";
import logoEmpresa from "../imagenes/logo de empresa.png";

function Header() {
  return (
    <header>
      <section className="barra_navegacion">
        <div className="Logo_De_Empresa">
          <img src={logoEmpresa} alt="Logo de la Empresa" />
          <h2>Mi eCommerce</h2>
        </div>

        <nav className="menu_navegacion">
          <ul>
            <li>
              <Link to="/inicio">Inicio</Link>
            </li>
            <li>
              <Link to="/categorias">Categoria</Link>
            </li>
            <li>
              <Link to="/acerca">Acerca de la Empresa</Link>
            </li>
            <li>
              <Link to="/contactos">Contactos</Link>
            </li>
            <li>
              <Link to="/carrito">Carrito</Link>
            </li>

          </ul>
        </nav>
      </section>
      
    </header>
  );
}

export default Header;