import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoriaDeProductos from "./components/CategoriaDeProductos";
import ListaDeProductos from "./components/ListaDeProductos";
import Carrito from "./components/Carrito";
import "./App.css";

import logoEmpresa from "./imagenes/logo de empresa.png";

function App() {
  const [carrito, actualizarCarrito] = useState([]);
  const [mostrarModal, cerrarModal] = useState(false);

  const añadirAlCarrito = (producto) => {
    actualizarCarrito( (carritoAnterior) => {
      const existente = carritoAnterior.find((p) => p.nombre === producto.nombre);
      if (existente) {
        return carritoAnterior.map( (p) =>
          p.nombre === producto.nombre ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        return [...carritoAnterior, { ...producto, cantidad: 1 }];
      }
    });
  };
  
  return (

    <div className="app">
      <Header logo={logoEmpresa} />

      <div>
        <button id="boton-carrito" onClick={() => cerrarModal(true)}>
          Ver Carrito ({carrito.reduce((acc, p) => acc + p.cantidad, 0)})
        </button>
      </div>

      <main id="contenedor-productos">

        <CategoriaDeProductos />
        <ListaDeProductos añadirAlCarrito={añadirAlCarrito} />

      </main>

      <Footer />

      {mostrarModal && (
        <Carrito carrito={carrito} actualizarCarrito={actualizarCarrito} onClose={() => cerrarModal(false)} />
      )}

    </div>

  );

}

export default App;