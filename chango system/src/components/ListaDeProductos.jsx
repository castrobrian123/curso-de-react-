import React from "react";


import leche from "../imagenes/leche la serenisima.jpg";
import quesoFresco from "../imagenes/queso fresco por salut.png";
import yogurt from "../imagenes/yogurt.png";
import quesoUntable from "../imagenes/queso untable.png";
import agua from "../imagenes/agua.png";
import jugoLevite from "../imagenes/jugo levite.jpg";
import cocaCola from "../imagenes/coca cola.png";
import jugoCitric from "../imagenes/jugo citric.jpg";
import galletas9 from "../imagenes/galletas 9 de oro.png";
import donSaturn from "../imagenes/don saturn.jpg";
import cerealitas from "../imagenes/galletas cerealitas.jpg";
import pitusas from "../imagenes/pitusas.jpeg";
import fideoMostachol from "../imagenes/fideo mostachol lucchetti.png";
import fideoTallarin from "../imagenes/fideo tallarin lucchetti.png";
import fideoCodito from "../imagenes/fideo codito lucchetti.png";
import fideoTirabuzon from "../imagenes/fideo tirabuzon lucchetti.png";

const productos = [
  { categoria: "Lacteos", nombre: "Leche La Serenisima", precio: 600, imagen: leche, alt: "leche la serenisima" },
  { categoria: "Lacteos", nombre: "Queso fresco por salut punta del agua", precio: 1200, imagen: quesoFresco, alt: "queso fresco" },
  { categoria: "Lacteos", nombre: "Yogurt firme yogurisimo", precio: 450, imagen: yogurt, alt: "yogurt" },
  { categoria: "Lacteos", nombre: "Queso untable milkaut", precio: 700, imagen: quesoUntable, alt: "queso para untar" },
  { categoria: "Bebidas", nombre: "Agua Villavicencio", precio: 350, imagen: agua, alt: "agua villavicencio" },
  { categoria: "Bebidas", nombre: "Jugo Levite", precio: 400, imagen: jugoLevite, alt: "jugo levite naranja" },
  { categoria: "Bebidas", nombre: "Gaseosa Coca Cola", precio: 550, imagen: cocaCola, alt: "gaseosa coca cola" },
  { categoria: "Bebidas", nombre: "Jugo Citric", precio: 500, imagen: jugoCitric, alt: "jugo citric naranja" },
  { categoria: "Galletas", nombre: "Galletas 9 de oro", precio: 300, imagen: galletas9, alt: "galletas 9 de oro" },
  { categoria: "Galletas", nombre: "Galletas Don Saturn", precio: 280, imagen: donSaturn, alt: "galletas don saturn" },
  { categoria: "Galletas", nombre: "Galletas Cerealitas", precio: 320, imagen: cerealitas, alt: "galletas cerealitas" },
  { categoria: "Galletas", nombre: "Galletas Pitusas", precio: 250, imagen: pitusas, alt: "galletas pitusas" },
  { categoria: "Pastas", nombre: "Paquete de Fideo Mostachol Lucchetti", precio: 470, imagen: fideoMostachol, alt: "fideos mostachol" },
  { categoria: "Pastas", nombre: "Paquete de Fideo Tallarin Lucchetti", precio: 480, imagen: fideoTallarin, alt: "fideos tallarin" },
  { categoria: "Pastas", nombre: "Paquete de Fideo Codito Lucchetti", precio: 490, imagen: fideoCodito, alt: "fideo codito" },
  { categoria: "Pastas", nombre: "Paquete de fideo Tirabuzon Lucchetti", precio: 500, imagen: fideoTirabuzon, alt: "fideo tirabuzon" }
];

const ListaDeProductos = ({ addToCart }) => {
  const categorias = {};

  productos.forEach((producto) => {
    if (!categorias[producto.categoria]) categorias[producto.categoria] = [];
    categorias[producto.categoria].push(producto);
  });

  return (
    <div>
      {Object.keys(categorias).map((categoria) => (
        <section key={categoria} id={categoria} className="Categoria">
          <h2>{categoria}</h2>
          <div className="Seccion_De_Publicacion">
            {categorias[categoria].map((producto) => (
              <div key={producto.nombre} className="La_Publicacion">
                <img src={producto.imagen} alt={producto.alt} />
                <h3>{producto.nombre}</h3>
                <p className="Precio_Del_Producto">${producto.precio}</p>
                <button onClick={() => addToCart(producto)} className="boton">
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ListaDeProductos;
