//este es nuevo
import { useState, useEffect } from "react";
import CategoriasDeProductos from "./CategoriaDeProductos"; 

export default function ListaDeProductos({ añadirAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://68d87e112144ea3f6da833c6.mockapi.io/ListaDeProductos")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar los productos");
        return res.json();
      })
      .then((data) => setProductos(data))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p>Cargando productos…</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  
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
                <button
                  onClick={() => añadirAlCarrito(producto)}
                  className="boton"
                >
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}


