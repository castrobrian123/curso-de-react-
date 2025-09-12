import React from "react";
import "../styles/App.css";

const ListaProductos = ({ productos }) => {
  return (
    <div className="lista-productos">
      <h2>Lista de Productos</h2>
      <ol>
        {productos.map((producto, index) => (
          <li key={index}>{producto}</li>
        ))}
      </ol>
    </div>
  );
};

export default ListaProductos;