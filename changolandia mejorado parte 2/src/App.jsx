
import { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const CategoriaDeProductos = lazy(() => import("./components/CategoriaDeProductos"));
import Header from "./components/Header";
import Footer from "./components/Footer";
const AcercaDeLaEmpresa = lazy(() => import("./pages/AcercaDeLaEmpresa"));
const Contactos = lazy(() => import("./pages/Contactos"));
import ListaDeProductos from "./components/ListaDeProductos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Inicio from "./pages/Inicio";
import ProtectedRoute from "./components/ProtectedRoute";
import PerfilFlotante from "./components/PerfilFlotante";
import "./App.css";

const Admin = lazy(() => import("./pages/Admin"));
const Carrito = lazy(() => import("./pages/Carrito"));

function App() {
  const API_URL = "https://68d87e112144ea3f6da833c6.mockapi.io/ListaDeProductos";
  const USERS_URL = "https://68d87e112144ea3f6da833c6.mockapi.io/ListaDeUsuarios";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  const toggleCarrito = () => setCarritoAbierto(prev => !prev);

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("usuarioActivo");
    setIsAuthenticated(false);
    setUsuarioActivo(null);
  };

  useEffect(() => {
    setIsClient(true);
    const auth = sessionStorage.getItem("isAuthenticated") === "true";
    const user = sessionStorage.getItem("usuarioActivo");
    setIsAuthenticated(auth);
    setUsuarioActivo(user ? JSON.parse(user) : null);
  }, []);

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
              element={
                <ListaDeProductos
                  productos={productos}
                  añadirAlCarrito={añadirAlCarrito}
                />
              }
            />
            <Route path="/productos/:id" element={<ProductoDetalle productos={productos} />} />

            <Route
              path="/login"
              element={
                <Login
                  USERS_URL={USERS_URL}
                  setIsAuthenticated={setIsAuthenticated}
                  setUsuarioActivo={setUsuarioActivo}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  USERS_URL={USERS_URL}
                  setIsAuthenticated={setIsAuthenticated}
                  setUsuarioActivo={setUsuarioActivo}
                />
              }
            />

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

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />

      {isClient && isAuthenticated && usuarioActivo && (
        <PerfilFlotante usuario={usuarioActivo} onLogout={handleLogout} />
      )}

      {carritoAbierto && (
        <div className="modal-overlay" onClick={toggleCarrito}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Carrito
              carrito={carrito}
              setCarrito={setCarrito}
              productos={productos}
              actualizarStock={actualizarStock}
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
