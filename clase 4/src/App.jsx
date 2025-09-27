import { useState } from "react";
import ListaDeProductos from "./components/ListaDeProductos";
import Carrito from "./components/Carrito";

function App() {
  const [carrito, actualizarCarrito] = useState([]);

  const añadirAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);

    if (existe) {
      actualizarCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      actualizarCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const vaciarCarrito = () => {
    actualizarCarrito([]);
  };

  return (
    <div className="app">
      <header>
        <h1>Fly Sistem</h1>
      </header>

      <nav>
        <ul className="nav-menu">
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Productos</a></li>
          <li><a href="#">Carrito</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </nav>

      <main>

        <h2>Productos Disponibles</h2>
        <ListaDeProductos añadirAlCarrito={añadirAlCarrito} />

        <h2>Carrito de Compras</h2>
        <Carrito carrito={carrito} vaciarCarrito={vaciarCarrito} />
        
      </main>

      <footer>
        <p>Brian Castro</p>
      </footer>
    </div>
  );
}

export default App;