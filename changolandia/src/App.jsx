import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoriaDeProductos from "./components/CategoriaDeProductos";
import ListaDeProductos from "./components/ListaDeProductos";
import ModalCarrito from "./components/ModalCarrito";
import "./App.css";

import logoEmpresa from "./imagenes/logo de empresa.png";

function App() {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addToCart = (producto) => {
    setCart((prevCart) => {
      const existing = prevCart.find((p) => p.nombre === producto.nombre);
      if (existing) {
        return prevCart.map((p) =>
          p.nombre === producto.nombre ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        return [...prevCart, { ...producto, cantidad: 1 }];
      }
    });
  };

  return (
    <div className="App">
      <Header logo={logoEmpresa} />

      <div>
        <button id="boton-carrito" onClick={() => setShowModal(true)}>
          Ver Carrito ({cart.reduce((acc, p) => acc + p.cantidad, 0)})
        </button>
      </div>

      <main id="contenedor-productos">
        <CategoriaDeProductos />
        <ListaDeProductos addToCart={addToCart} />
      </main>

      <Footer />

      {showModal && (
        <ModalCarrito
          cart={cart}
          setCart={setCart}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default App;
