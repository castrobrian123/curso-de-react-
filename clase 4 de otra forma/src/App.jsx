import { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

// Importar imágenes
import impresoraImg from "./imagenes/impresora comun.jpg";
import mouseImg from "./imagenes/mouse mecanico.jpg";
import auricularesImg from "./imagenes/auriculares grandes.jpg";
import tecladoImg from "./imagenes/teclado mecanico.jpg";

function App() {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "impresora", price: 25, image: impresoraImg },
    { id: 2, name: "Mouse", price: 40, image: mouseImg },
    { id: 3, name: "Auriculares", price: 60, image: auricularesImg },
    { id: 4, name: "Teclado", price: 70, image: tecladoImg },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const clearCart = () => {
    setCart([]);
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
        <ProductList products={products} addToCart={addToCart} />

        <h2>Carrito de Compras</h2>
        <Cart cart={cart} clearCart={clearCart} />
      </main>

      <footer>
        <p>Brian Castro</p>
      </footer>
    </div>
  );
}

export default App;
