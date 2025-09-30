
import { Link } from "react-router-dom";

export default function ListaDeProductos({ productos, añadirAlCarrito }) {
  if (!productos || productos.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <section style={{ padding: "20px" }}>
      <h2>Lista de Productos</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {productos.map((producto) => (
          <div key={producto.id} style={{ border: "1px solid #ddd", padding: "10px", width: "200px" }}>
            <img src={producto.imagen} alt={producto.nombre} width="100%" />
            <h3>{producto.nombre}</h3>
            <p>Categoría: {producto.categoria}</p>
            <p>Precio: ${producto.precio}</p>
            <p>Stock: {producto.stock}</p>

            {/* Link al detalle */}
            <Link to={`/productos/${producto.id}`}>Ver Detalles</Link>

            {/* Botón para añadir al carrito */}
            {añadirAlCarrito && (
              <button onClick={() => añadirAlCarrito(producto)}>
                Añadir al carrito
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}