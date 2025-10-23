import React, { useState, useEffect } from "react";
import CategoriaDeUnidades from "./CategoriaDeUnidades";
import { useParams } from "react-router-dom";
import { FaFileVideo, FaLink, FaFilePdf, FaTimes } from "react-icons/fa";
import contenido from "./data/ElContenidoDeLaMateria.json";

export default function ListaDeUnidades() {
  const { id } = useParams();
  const [unidades] = useState(contenido.unidades);
  const [unidad, setUnidad] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [contentUrl, setContentUrl] = useState("");
  const [contentVisible, setContentVisible] = useState(false);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (unidades.length > 0) {
      const u = unidades.find((item) => item.id === parseInt(id));
      setUnidad(u || unidades[0]);
    }
  }, [id, unidades]);

  // ✅ Abrir modal
  const handleOpenModal = (tipo, url) => {
    // Si es video, asegurar formato embebido (embed)
    if (tipo === "video") {
      if (url.includes("watch?v=")) {
        const videoId = url.split("watch?v=")[1];
        url = `https://www.youtube.com/embed/${videoId}`;
      }
    }
    setModalContent(tipo);
    setContentUrl(url);
    setModalVisible(true);
    setTimeout(() => setContentVisible(true), 50);
  };

  const handleCloseModal = () => {
    setContentVisible(false);
    setTimeout(() => {
      setModalVisible(false);
      setModalContent(null);
      setContentUrl("");
    }, 300);
  };

  if (!unidad) return <p style={{ textAlign: "center" }}>Cargando...</p>;

  const maxContentWidth = Math.min(900, windowSize.width * 0.95);
  const maxContentHeight = Math.min(windowSize.height * 0.9, maxContentWidth * 1.3);

  return (
    <main className="panel_de_unidades">
      <CategoriaDeUnidades />

      <section className="contenido_de_unidad">
        <header className="encabezado_unidad">
          <h2>{unidad.titulo}</h2>
          <h4>{unidad.subtitulo}</h4>
        </header>

        <div className="lista_de_recursos">
          {unidad.recursos.map((recurso, i) => (
            <div key={i} className="recurso_item">
              {recurso.tipo === "video" && (
                <button
                  className="boton_recurso"
                  onClick={() => handleOpenModal("video", recurso.url)}
                >
                  <FaFileVideo className="icono" /> {recurso.nombre}
                </button>
              )}
              {recurso.tipo === "pdf" && (
                <button
                  className="boton_recurso"
                  onClick={() => handleOpenModal("scribd", recurso.url)}
                >
                  <FaFilePdf className="icono" /> {recurso.nombre}
                </button>
              )}
              {recurso.tipo === "link" && (
                <a
                  href={recurso.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="boton_recurso"
                >
                  <FaLink className="icono" /> {recurso.nombre}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalVisible && (
          <div className={`visor_modal ${modalVisible ? "fade-in" : "fade-out"}`}>
            <button className="cerrar_modal" onClick={handleCloseModal}>
              <FaTimes />
            </button>

            {/* 📘 Documentos (Scribd) */}
            {modalContent === "scribd" && (
              <div
                className={`visor_scribd ${contentVisible ? "fade-zoom-in" : "fade-zoom-out"}`}
                style={{ width: maxContentWidth, height: maxContentHeight }}
              >
                <iframe
                  src={contentUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen
                  title="Documento Scribd"
                ></iframe>
              </div>
            )}

            {/* 🎥 Video YouTube (ahora con iframe) */}
            {modalContent === "video" && (
              <div
                className={`visor_video ${contentVisible ? "fade-zoom-in" : "fade-zoom-out"}`}
                style={{ width: maxContentWidth, aspectRatio: "16/9" }}
              >
                <iframe
                  src={contentUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Video YouTube"
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    position: "relative",
                    zIndex: 5000,
                  }}
                ></iframe>
              </div>
            )}
          </div>
        )}
      </section>
      
    </main>
  );
}





















