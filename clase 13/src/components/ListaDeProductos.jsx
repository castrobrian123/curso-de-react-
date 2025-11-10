
import { Link } from "react-router-dom";
import CategoriasDeProductos from "./CategoriaDeProductos";
import CarouselDeImagenes from "./CarouselDeImagenes";
import CarouselDeVideos from "./CarouselDeVideos";
import videosData from "./data/videos.json";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

import { FaCartPlus } from "react-icons/fa";

export default function ListaDeProductos({ productos }) {
  const { añadirAlCarrito } = useContext(CarritoContext);

  if (!productos || productos.length === 0) return <p>No hay productos disponibles.</p>;

  const categorias = productos.reduce((acc, p) => {
    const cat = p.categoria || "Sin Categoría";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  return (
    <div>
      <CarouselDeImagenes/>
      <CategoriasDeProductos />
      {Object.keys(categorias).map(categoria => (
        <section key={categoria} id={categoria} className="Panel_De_Publicacion_De_Productos">
          <h2>{categoria}</h2>
          <div className="Seccion_De_Publicacion">
            {categorias[categoria].map(producto => (
              <div key={producto.id} className="La_Publicacion">
                <img src={producto.imagen} alt={producto.alt || producto.nombre} width="150" height="150"/>
                <h3>{producto.nombre}</h3>
                <p className="Precio_Del_Producto">${producto.precio.toFixed(2)}</p>

                {producto.stock > 0 ? (
                  <p className="Stock_Del_Producto">Stock: {producto.stock}</p>
                ) : (
                  <p className="Stock_Del_Producto" style={{ color: "red", fontWeight: "bold" }}>
                    ¡Stock agotado!
                  </p>
                )}

                <div className="contenedor_centrado">
                  <Link to={`/productos/${producto.id}`} className="boton">Ver Detalles</Link>
                </div>

                <div className="contenedor_centrado">
                  <button
                    className="boton"
                    onClick={() => añadirAlCarrito(producto.id)}
                    disabled={producto.stock <= 0}
                  >
                    <FaCartPlus style={{ marginRight: "5px" }} />Añadir al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
      <CarouselDeVideos videos={videosData} autoPlay={true}  />
    </div>
  );
}






