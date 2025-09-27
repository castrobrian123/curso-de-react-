import React from "react";

function Header({ logo }) {
  return (
    <header>
      <section className="barra_navegacion">
        <div className="Logo_De_Empresa">
          <img src={logo} alt="Logo de la empresa" />
          <h2>Changolandia</h2>
        </div>
        <nav className="menu_navegacion">
          <ul>
            <li><a href="#Inicio">Inicio</a></li>
            <li><a href="#Solicitar Trabajo">Solicitar Trabajo</a></li>
            <li><a href="#barra_de_navegacion_de_categorias_de_productos">Categoria</a></li>
            <li><a href="#Contacto">Contacto</a></li>
          </ul>
        </nav>
      </section>
    </header>
  );
}

export default Header;