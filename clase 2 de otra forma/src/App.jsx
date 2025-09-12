import React from "react";
import ListaProductos from "./components/ListaProductos";
import Tarjeta from "./components/Tarjeta";
import Boton from "./components/Boton";
import "./styles/App.css";

const productos = ["Manzanas", "Peras", "Naranjas"];

function App() {
  const handleClick = () => {
    alert("¡Botón presionado!");
  };

  return (
    <div className="app">
      <h1>Mi Tienda de Frutas</h1>

      {/* Lista de productos */}
      <ListaProductos productos={productos} />

      {/* Tarjetas */}
      <div className="tarjetas">
        <Tarjeta
          titulo="Oferta especial"
          descripcion="20% de descuento en todos los productos"
          botonTexto="Ver más"
        />
        <Tarjeta
          titulo="Promoción limitada"
          descripcion="Compra 2 y llévate 1 gratis"
          botonTexto="Comprar ahora"
        />
      </div>

      {/* Botones adicionales */}
      <div className="acciones">
        <Boton texto="Suscribirse" onClick={handleClick} />
        <Boton texto="Contactar" onClick={handleClick} />
      </div>
    </div>
  );
}

export default App;