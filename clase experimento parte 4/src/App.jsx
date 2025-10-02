
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

import CategoriaDeProductos from "./components/CategoriaDeProductos";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AcercaDeLaEmpresa from "./pages/AcercaDeLaEmpresa";
import Contactos from "./pages/Contactos";
import ListaDeProductos from "./components/ListaDeProductos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Inicio from "./pages/Inicio";
import ProtectedRoute from "./components/ProtectedRoute";
import PerfilFlotante from "./components/PerfilFlotante";
import "./App.css";

// 🔹 Lazy loading para lo pesado
const Admin = lazy(() => import("./pages/Admin"));
const Carrito = lazy(() => import("./pages/Carrito"));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const [usuarioActivo, setUsuarioActivo] = useState(() => {
    const u = localStorage.getItem("usuarioActivo");
    return u ? JSON.parse(u) : null;
  });

  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  const toggleCarrito = () => setCarritoAbierto((prev) => !prev);

  const API_URL = "https://68d87e112144ea3f6da833c6.mockapi.io/ListaDeProductos";

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    localStorage.removeItem("isAuthenticated");
    setUsuarioActivo(null);
    setIsAuthenticated(false);
  };

  // 🔹 Cargar productos desde API
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

  // 🔹 Añadir al carrito con actualización de stock
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

  // 🔹 Actualizar stock global
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

  // 🔹 Eliminar del carrito
  const eliminarDelCarrito = async (id) => {
    const item = carrito.find((i) => i.id === id);
    if (!item) return;
    const producto = productos.find((p) => p.id === id);
    await actualizarStock(id, producto.stock + item.cantidad);
    setCarrito((prev) => prev.filter((i) => i.id !== id));
  };

  // 🔹 Ajustar cantidades
  const aumentarCantidad = (id) => {
    const producto = productos.find((p) => p.id === id);
    if (!producto || producto.stock <= 0) return alert("No hay stock disponible");

    actualizarStock(id, producto.stock - 1);
    setCarrito((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item))
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
        prev.map((i) => (i.id === id ? { ...i, cantidad: i.cantidad - 1 } : i))
      );
    }
  };

  return (
    <Router>
      <Header
        carritoCount={carrito.length}
        toggleCarrito={toggleCarrito}
        isAuthenticated={isAuthenticated}
        usuarioActivo={usuarioActivo}
        setIsAuthenticated={setIsAuthenticated}
        setUsuarioActivo={setUsuarioActivo}
      />

      <main id="contenedor-productos">
        <Suspense fallback={<p style={{ textAlign: "center" }}>Cargando...</p>}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/acerca" element={<AcercaDeLaEmpresa />} />
            <Route path="/contactos" element={<Contactos />} />
            <Route
              path="/productos"
              element={<ListaDeProductos productos={productos} añadirAlCarrito={añadirAlCarrito} />}
            />
            <Route path="/productos/:id" element={<ProductoDetalle productos={productos} />} />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} setUsuarioActivo={setUsuarioActivo} />}
            />
            <Route
              path="/register"
              element={<Register setIsAuthenticated={setIsAuthenticated} setUsuarioActivo={setUsuarioActivo} />}
            />

            {/* 🔒 Ruta protegida */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Admin
                    API_URL={API_URL}
                    productos={productos}
                    setProductos={setProductos}
                    actualizarStock={actualizarStock}
                  />
                </ProtectedRoute>
              }
            />

            {/* 404 → redirigir */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />

      {/* 🔹 Perfil flotante */}
      {isAuthenticated && usuarioActivo && (
        <PerfilFlotante usuario={usuarioActivo} onLogout={handleLogout} />
      )}

      {/* 🔹 Modal del carrito */}
      {carritoAbierto && (
        <div className="modal-overlay" onClick={toggleCarrito}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Carrito
              carrito={carrito}
              eliminarDelCarrito={eliminarDelCarrito}
              aumentarCantidad={aumentarCantidad}
              disminuirCantidad={disminuirCantidad}
              vaciarCarrito={() => setCarrito([])}
              onClose={toggleCarrito}
            />
            <button onClick={toggleCarrito} className="btn-cerrar">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;

