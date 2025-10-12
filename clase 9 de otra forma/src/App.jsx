import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CarritoProvider, CarritoContext } from "./context/CarritoContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ListaDeProductos from "./components/ListaDeProductos";
import Inicio from "./pages/Inicio";
import AcercaDeLaEmpresa from "./pages/AcercaDeLaEmpresa";
import Contactos from "./pages/Contactos";
import Login from "./pages/Login";
import CarritoFlotante from "./pages/CarritoFlotante";
import PerfilFlotante from "./components/PerfilFlotante";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await fetch(
          "https://68d87e112144ea3f6da833c6.mockapi.io/ListaDeProductos"
        );
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      } finally {
        setCargando(false);
      }
    };
    obtenerProductos();
  }, []);

  return (
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <Header />

          <main id="contenedor-productos">

            
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/productos" element={ <ListaDeProductos productos={productos} cargando={cargando} /> } />
              <Route path="/carrito" element={ <ProtectedRoute> <CarritoFlotante /> </ProtectedRoute> } />
              <Route path="/acerca" element={<AcercaDeLaEmpresa />} />
              <Route path="/contactos" element={<Contactos />} />
              <Route path="/login" element={<Login />} />
            </Routes>

            
            <FlotantesGlobales />
          </main>

          <Footer />
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
}


function FlotantesGlobales() {
  const { carritoVisible } = useContext(CarritoContext);
  const { usuario, perfilVisible, logout } = useContext(AuthContext);


  return (
    <>
      {carritoVisible && <CarritoFlotante />}
      { perfilVisible && usuario && (
        <PerfilFlotante usuario={usuario} logout={logout}  />
      )}
    </>
  );
}

export default App;












