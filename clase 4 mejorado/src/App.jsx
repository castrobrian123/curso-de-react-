import { useState } from "react";
import ListaDeProductos from "./components/ListaDeProductos";
import Carrito from "./components/Carrito";

// Importar imágenes
import impresoraImg from "./imagenes/impresora comun.jpg";
import mouseImg from "./imagenes/mouse mecanico.jpg";
import auricularesImg from "./imagenes/auriculares grandes.jpg";
import tecladoImg from "./imagenes/teclado mecanico.jpg";

function App() {
  const [carrito, actualizarCarrito] = useState([]);

  const productos = [
    { id: 1, name: "Impresora", price: 25, image: impresoraImg },
    { id: 2, name: "Mouse", price: 40, image: mouseImg },
    { id: 3, name: "Auriculares", price: 60, image: auricularesImg },
    { id: 4, name: "Teclado", price: 70, image: tecladoImg },
  ];

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
        <ListaDeProductos productos={productos} añadirAlCarrito={añadirAlCarrito} />

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
