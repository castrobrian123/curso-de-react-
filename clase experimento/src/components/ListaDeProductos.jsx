
import { Link } from "react-router-dom";
import CategoriasDeProductos from "./CategoriaDeProductos";

export default function ListaDeProductos({ productos, añadirAlCarrito }) {
  if (!productos || productos.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  // Agrupar por categorías (como antes)
  const categorias = productos.reduce((acc, producto) => {
    const cat = producto.categoria || "Sin Categoría";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(producto);
    return acc;
  }, {});

  return (
    <div>
      <CategoriasDeProductos />

      {Object.keys(categorias).map((categoria) => (
        <section key={categoria} id={categoria} className="Panel_De_Publicacion_De_Productos">
          <h2>{categoria}</h2>
          <div className="Seccion_De_Publicacion">
            {categorias[categoria].map((producto) => (
              <div key={producto.id} className="La_Publicacion">
                <img
                  src={producto.imagen}
                  alt={producto.alt || producto.nombre}
                  width="150"
                  height="150"
                />
                <h3>{producto.nombre}</h3>
                <p className="Precio_Del_Producto">${producto.precio.toFixed(2)}</p>
                <p className="Stock_Del_Producto">Stock: {producto.stock}</p>

                <div className="contenedor_centrado">
                  <Link to={`/productos/${producto.id}`} className="boton">
                    Ver Detalles
                  </Link>
                </div>

                <div className="contenedor_centrado">
                  {añadirAlCarrito && (
                    <button onClick={() => añadirAlCarrito(producto)} className="boton">
                      Añadir al carrito
                    </button>
                  )}

                </div>


              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
