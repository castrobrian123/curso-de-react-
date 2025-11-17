import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import imagenesData from "./data/imagenes.json";

const CarouselDeImagenes = () => {
  
  const [indiceActual, setIndiceActual] = useState(0);
  const [transicion, setTransicion] = useState(false);
  const imagenes = imagenesData.imagenes;

  const convertirEnlaceDrive = (url) => {

    if (!url) return url;

    let match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);

    if (!match) match = url.match(/id=([a-zA-Z0-9_-]+)/);

    if (!match) return url;

    const id = match[1];

    return `https://lh3.googleusercontent.com/d/${id}`;
    
  };

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
      
      <button className="carousel-imagenes-boton izquierda" onClick={anteriorImagen} >

        <FaChevronLeft />

      </button>

      <div className={`carousel-imagenes-slide ${ transicion ? "salidaDeImagen" : "entradaDeImagen" }`} >

        <img src={convertirEnlaceDrive(imagenes[indiceActual].url)} alt={imagenes[indiceActual].alt} className="carousel-imagenes-foto" />

      </div>

      <button className="carousel-imagenes-boton derecha" onClick={siguienteImagen} >

        <FaChevronRight />

      </button>

      <div className="carousel-imagenes-indicadores">

        {imagenes.map((_, index) => (
          <button key={index} onClick={ () => irAImagen(index) } className={`carousel-imagenes-indicador ${ indiceActual === index ? "activo" : ""}`} ></button>
        ))}

      </div>

    </div>

  );

};

export default CarouselDeImagenes;


