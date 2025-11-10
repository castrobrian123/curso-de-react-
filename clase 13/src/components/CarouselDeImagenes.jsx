import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import imagenesData from "./data/imagenes.json";

const CarouselDeImagenes = () => {
  const [indiceActual, setIndiceActual] = useState(0);
  const [transicion, setTransicion] = useState(false);
  const imagenes = imagenesData.imagenes;

  // 🔁 Convierte enlaces de Google Drive (cualquier formato) a enlaces directos visibles
  const convertirEnlaceDrive = (url) => {
    if (!url) return url;

    // Si ya es enlace directo
    if (
      url.includes("drive.google.com/uc?export=") ||
      url.includes("googleusercontent.com")
    ) {
      return url;
    }

    // ?id=ID
    const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (openMatch)
      return `https://drive.google.com/uc?export=view&id=${openMatch[1]}`;

    // /d/ID/
    const dMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)(?:\/|$)/);
    if (dMatch)
      return `https://drive.google.com/uc?export=view&id=${dMatch[1]}`;

    // /file/d/ID/
    const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)(?:\/|$)/);
    if (fileMatch)
      return `https://drive.google.com/uc?export=view&id=${fileMatch[1]}`;

    return url;
  };

  // ⏱ Avance automático
  useEffect(() => {
    const intervalo = setInterval(() => {
      siguienteImagen();
    }, 4000);
    return () => clearInterval(intervalo);
  }, []);

  const siguienteImagen = () => {
    setTransicion(true);
    setTimeout(() => {
      setIndiceActual((prev) => (prev + 1) % imagenes.length);
      setTransicion(false);
    }, 400);
  };

  const anteriorImagen = () => {
    setTransicion(true);
    setTimeout(() => {
      setIndiceActual((prev) => (prev - 1 + imagenes.length) % imagenes.length);
      setTransicion(false);
    }, 400);
  };

  const irAImagen = (index) => setIndiceActual(index);

  return (
    <div className="carousel-imagenes-contenedor">
      <button
        className="carousel-imagenes-boton izquierda"
        onClick={anteriorImagen}
      >
        <FaChevronLeft />
      </button>

      <div
        className={`carousel-imagenes-slide ${
          transicion ? "salidaDeImagen" : "entradaDeImagen"
        }`}
      >
        <img
          src={convertirEnlaceDrive(imagenes[indiceActual].url)}
          alt={imagenes[indiceActual].alt}
          className="carousel-imagenes-foto"
          onError={(e) => {
            // Si no carga (por permisos o error), muestra un fallback
            e.target.src =
              "https://via.placeholder.com/800x500?text=Imagen+no+disponible";
          }}
        />
        <p className="carousel-imagenes-titulo">
          {imagenes[indiceActual].titulo}
        </p>
      </div>

      <button
        className="carousel-imagenes-boton derecha"
        onClick={siguienteImagen}
      >
        <FaChevronRight />
      </button>

      <div className="carousel-imagenes-indicadores">
        {imagenes.map((_, index) => (
          <button
            key={index}
            onClick={() => irAImagen(index)}
            className={`carousel-imagenes-indicador ${
              indiceActual === index ? "activo" : ""
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default CarouselDeImagenes;


