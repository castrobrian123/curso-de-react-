// estamos haciendo una página para programación estructurada en caso de paros

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CategoriaDeUnidades from "./components/CategoriaDeUnidades";
import ListaDeUnidades from "./components/ListaDeUnidades";
import Inicio from "./pages/Inicio";
import AcercaDeLaEmpresa from "./pages/AcercaDeLaEmpresa";

import "./App.css";

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Mi página web</title>
        <meta name="description" content="Bienvenido a la materia de Programación Estructurada" />
        <meta name="keywords" content="programación estructurada, aprendizaje, unidades" />
      </Helmet>

      <Router>
        <Header />

        <main id="contenedor-productos">

          <Routes>
            {/* Página de inicio */}
            <Route path="/" element={<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />

            {/* Página de información */}
            <Route path="/acerca" element={<AcercaDeLaEmpresa />} />

            {/* ✅ Página principal de unidades */}
            <Route path="/las_unidades" element={<ListaDeUnidades />} />

            {/* ✅ Página de unidad específica */}
            <Route path="/las_unidades/unidad/:id" element={<ListaDeUnidades />} />
          </Routes>
        </main>

        <Footer />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </Router>
    </HelmetProvider>
  );
}

export default App;















