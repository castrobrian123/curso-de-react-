
import React, { useState } from "react";
import { FaCheese, FaWineBottle, FaCookie, FaUtensils, FaBars, FaTimes } from "react-icons/fa";

const CategoriasDeProductos = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <section id="barra_de_navegacion_de_categorias_de_productos">
      
      <button className="hamburguesa" onClick={toggleMenu}>
        {menuAbierto ? <FaTimes /> : <FaBars />}
      </button>

      
      <nav className={`menu_navegacion ${menuAbierto ? "activo" : ""}`}>
        <ul>
          <li>
            <a href="#Lacteos" onClick={cerrarMenu}>
              <FaCheese /> Lácteos
            </a>
          </li>
          <li>
            <a href="#Bebidas" onClick={cerrarMenu}>
              <FaWineBottle /> Bebidas
            </a>
          </li>
          <li>
            <a href="#Galletas" onClick={cerrarMenu}>
              <FaCookie /> Galletas
            </a>
          </li>
          <li>
            <a href="#Pastas" onClick={cerrarMenu}>
              <FaUtensils /> Pastas
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default CategoriasDeProductos;
