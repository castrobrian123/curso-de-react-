

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ListaDeProductos from "./components/ListaDeProductos";
import CategoriaDeProductos from "./components/CategoriaDeProductos";
import Carrito from "./components/Carrito";
import AcercaDeLaEmpresa from "./components/AcercaDeLaEmpresa";
import Contactos from "./components/Contactos";
import Inicio from "./components/Inicio";
import "./App.css";

function App() {

  const [carrito, setCarrito] = useState([]);
  const [carritoVisible, setCarritoVisible] = useState(false);
  const toggleCarrito = () => setCarritoVisible(!carritoVisible);

  const añadirAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  return (

    <Router>

      <Header toggleCarrito={toggleCarrito} />

      <main id="contenedor-productos">

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/categorias" element={<ListaDeProductos añadirAlCarrito={añadirAlCarrito} />} />
          <Route path="/acerca" element={<AcercaDeLaEmpresa />} />
          <Route path="/contactos" element={<Contactos />} />
        </Routes>

        
        {carritoVisible && (
          <Carrito carrito={carrito} actualizarCarrito={setCarrito} onClose={toggleCarrito} />
        )}

      </main>

      <Footer />

    </Router>

  );
}

export default App;

