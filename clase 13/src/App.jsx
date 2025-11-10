import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CarritoProvider, CarritoContext } from "./context/CarritoContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ListaDeProductos from "./components/ListaDeProductos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Inicio from "./pages/Inicio";
import AcercaDeLaEmpresa from "./pages/AcercaDeLaEmpresa";
import Contactos from "./pages/Contactos";
import Login from "./pages/Login";
import Register from "./pages/Register"
import PerfilFlotante from "./components/PerfilFlotante";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";

import "./App.css";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  const API_URL = "https://68d87e112144ea3f6da833c6.mockapi.io/ListaDeProductos";
  const USERS_URL = "https://68d87e112144ea3f6da833c6.mockapi.io/ListaDeUsuarios";

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  
  useEffect(() => {
    const storedProductos = localStorage.getItem("productos");
    if (storedProductos) {
      setProductos(JSON.parse(storedProductos));
      setCargando(false);
    } else {
      fetch(API_URL)
        .then(res => res.json())
        .then(data => {
          setProductos(data);
        })
        .catch(err => console.error(err))
        .finally(() => setCargando(false));
    }
  }, []);

  
  useEffect(() => {
    if (productos.length > 0) {
      localStorage.setItem("productos", JSON.stringify(productos));
    }
  }, [productos]);

  const actualizarStock = (id, nuevoStock) => {
    const actualizados = productos.map((p) =>
      p.id === id ? { ...p, stock: nuevoStock } : p
    );
    setProductos(actualizados);
  };

  return (

    <HelmetProvider>
      
      <AuthProvider>

        <CarritoProvider productos={productos} actualizarStock={actualizarStock}>

          {/* React Helmet para SEO Global */}
          <Helmet>
            <title>Changolandia | Tu Supermercado Online</title>
            <meta name="description" content="Tu supermercado online de confianza. Productos de calidad, al mejor precio y envío rápido." />
            <meta name="keywords" content="supermercado, online, compras, comestibles, Changolandia, alimentos, productos" />
          </Helmet>

          <Router>

            <Header />

            <main>
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/inicio" element={<Inicio />} />
                <Route path="/productos" element={ <ListaDeProductos productos={productos} cargando={cargando} /> } />
                <Route path="/productos/:id" element={<ProductoDetalle productos={productos} />} />
                
                <Route path="/acerca" element={<AcercaDeLaEmpresa />} />
                <Route path="/contactos" element={<Contactos />} />
                <Route path="/login" element={<Login USERS_URL={USERS_URL} />} />
                <Route path="/register" element={<Register USERS_URL={USERS_URL} />} />

                <Route path="/admin" element={ <ProtectedRoute> <Admin API_URL={API_URL} productos={productos} setProductos={setProductos} actualizarStock={actualizarStock} /> </ProtectedRoute> } />
              </Routes>
            </main>

            <FlotantesGlobales />

            <Footer />

          </Router>

          {/* Contenedor de Toastify */}
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />

        </CarritoProvider>

      </AuthProvider>

    </HelmetProvider>


  );
  
}

function FlotantesGlobales() {
  const { carritoVisible } = useContext(CarritoContext);
  const { usuario, perfilVisible, logout } = useContext(AuthContext);

  return (
    <>
      
      {usuario && perfilVisible && (
        <PerfilFlotante usuario={usuario} onLogout={logout} />
      )}
    </>
  );
}

export default App;














