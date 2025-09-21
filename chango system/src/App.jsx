import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoriaDeProductos from "./components/CategoriaDeProductos"
import ListaDeProductos from "./components/ListaDeProductos";
import "./App.css";

import logoEmpresa from "./imagenes/logo de empresa.png";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (producto) => setCart([...cart, producto]);

  return (

    <div className="App">

      <Header logo={logoEmpresa} />

      <div>
        <a href="/carrito_de_compras/carrito_de_compras" id="boton-carrito">
          Ver Carrito ({cart.length})
        </a>
      </div>

      <main id="contenedor-productos">
        <CategoriaDeProductos />
        <ListaDeProductos addToCart={addToCart} />
      </main>

      <Footer/>

    </div>
  );
}

export default App;
