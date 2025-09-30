
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import CategoriaDeProductos from "./components/CategoriaDeProductos";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AcercaDeLaEmpresa from "./pages/AcercaDeLaEmpresa";
import Contactos from "./pages/Contactos";
import ListaDeProductos from "./components/ListaDeProductos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./pages/Carrito";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const toggleCarrito = () => setCarritoAbierto(prev => !prev);

  const API_URL = "https://68d87e112144ea3f6da833c6.mockapi.io/ListaDeProductos";

  // Cargar productos
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setProductos(data);
      } catch (err) {
        console.error("Error cargando productos:", err);
      }
    };
    fetchProductos();
  }, []);

  // Añadir al carrito
  const añadirAlCarrito = async (producto) => {
    if (producto.stock <= 0) return alert("No hay stock disponible");
    await actualizarStock(producto.id, producto.stock - 1);

    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Actualizar stock global
  const actualizarStock = async (id, nuevoStock) => {
    const producto = productos.find((p) => p.id === id);
    if (!producto) return;

    try {
      const updatedProducto = { ...producto, stock: nuevoStock };
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProducto),
      });
      const data = await res.json();
      setProductos((prev) => prev.map((p) => (p.id === id ? data : p)));
    } catch (err) {
      console.error("Error actualizando stock:", err);
    }
  };

  // Eliminar del carrito
  const eliminarDelCarrito = async (id) => {
    const item = carrito.find((i) => i.id === id);
    if (!item) return;
    const producto = productos.find((p) => p.id === id);
    await actualizarStock(id, producto.stock + item.cantidad);
    setCarrito((prev) => prev.filter((i) => i.id !== id));
  };

  // Ajustar cantidad desde carrito
  const aumentarCantidad = (id) => {
    const producto = productos.find((p) => p.id === id);
    if (!producto || producto.stock <= 0) return alert("No hay stock disponible");

    actualizarStock(id, producto.stock - 1);
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const disminuirCantidad = (id) => {
    const item = carrito.find((i) => i.id === id);
    if (!item) return;

    const producto = productos.find((p) => p.id === id);
    actualizarStock(id, producto.stock + 1);

    if (item.cantidad === 1) {
      setCarrito((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCarrito((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i
        )
      );
    }
  };

  return (
    <Router>
      <Header carritoCount={carrito.length} toggleCarrito={toggleCarrito} />


      <main id="contenedor-productos">

        <Routes>

          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/acerca" element={<AcercaDeLaEmpresa />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/productos" element={ <ListaDeProductos productos={productos} añadirAlCarrito={añadirAlCarrito} /> } />
          <Route path="/productos/:id" element={ <ProductoDetalle productos={productos} /> } />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login setIsAuthenticated={setIsAuthenticated} /> } />

          {/* Rutas protegidas */}
          <Route path="/carrito" element={ <ProtectedRoute isAuthenticated={isAuthenticated}> <Carrito carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} aumentarCantidad={aumentarCantidad} disminuirCantidad={disminuirCantidad} /> </ProtectedRoute>}/>

          <Route path="/admin" element={ <ProtectedRoute isAuthenticated={isAuthenticated}> <Admin API_URL={API_URL} productos={productos} setProductos={setProductos} actualizarStock={actualizarStock} /> </ProtectedRoute>}/>

        </Routes>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
