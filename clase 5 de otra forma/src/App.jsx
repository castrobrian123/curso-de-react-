import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "bootswatch/dist/yeti/bootstrap.min.css"; // Tema elegante de Bootswatch

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (producto) => {
    setCart([...cart, producto]);
  };

  return (
    <div>
      <Navbar />
      <div className="container my-4">
        <h1 className="text-center mb-4">🛒 Mi eCommerce</h1>
        <div className="row">
          <div className="col-md-8">
            <ProductList addToCart={addToCart} />
          </div>
          <div className="col-md-4">
            <Cart cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
