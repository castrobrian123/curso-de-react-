
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoriaDeProductos from "./components/CategoriaDeProductos";
import ListaDeProductos from "./components/ListaDeProductos";
import Carrito from "./components/Carrito";
import "./App.css";

import logoEmpresa from "./imagenes/logo de empresa.png";

function App() {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const añadirAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };



  return (
    
    <div className="App">
      <Header logo={logoEmpresa} />

      <div>

        <button id="boton-carrito" onClick={() => setMostrarCarrito(true)}>
          Ver Carrito {carrito.reduce((acc, item) => acc + item.cantidad, 0)}
        </button>

      </div>

      <main id="contenedor-productos">

        <CategoriaDeProductos />
        <ListaDeProductos añadirAlCarrito={añadirAlCarrito} />

      </main>

      <Footer />

      { 
        mostrarCarrito && ( 
          <Carrito carrito={carrito} actualizarCarrito={setCarrito} onClose={ () => setMostrarCarrito(false) } />
        )
      }

    </div>
  );
}

export default App;

