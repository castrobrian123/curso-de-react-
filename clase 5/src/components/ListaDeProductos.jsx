
import React, { useState, useEffect } from "react";

function ListaDeProductos({ añadirAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://68d87e112144ea3f6da833c6.mockapi.io/ListaDeProductos")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los productos");
        return res.json();
      })
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  // Agrupar productos por categoría
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
              <div key={producto.id} className="La_Publicacion">
                <img
                  src={producto.imagen}
                  alt={producto.alt}
                  width="150"
                  height="150"
                />
                <h3>{producto.nombre}</h3>
                <p className="Precio_Del_Producto">${producto.precio}</p>
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

export default ListaDeProductos;
