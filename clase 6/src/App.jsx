
// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  return (
    <Router>
      <Header />
      
      

      <main id="contenedor-productos">

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/categorias" element={<ListaDeProductos />} />
          <Route path="/acerca" element={<AcercaDeLaEmpresa />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>

      </main>



      <Footer />
    </Router>
  );
}

export default App;

