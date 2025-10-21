
import React from "react";

import { FaCheese, FaWineBottle, FaCookie, FaUtensils } from "react-icons/fa";

const CategoriasDeProductos = () => {
  return (
    <section id="barra_de_navegacion_de_categorias_de_productos">
      <nav className="menu_navegacion">
        <ul>
          <li><a href="#Lacteos"> <FaCheese /> Lácteos</a></li>
          <li><a href="#Bebidas"> <FaWineBottle /> Bebidas</a></li>
          <li><a href="#Galletas"> <FaCookie /> Galletas</a></li>
          <li><a href="#Pastas"> <FaUtensils /> Pastas</a></li>
        </ul>
      </nav>
    </section>
  );
};

export default CategoriasDeProductos;