
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ProductoDetalle({ productos }) {
  const { id } = useParams();
  const producto = productos.find((p) => String(p.id) === id);

  if (!producto) {
    return <section style={{ padding: "20px" }}><h2>Producto no encontrado</h2></section>;
  }

  return (
    <section className="descripcion-de-producto">
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion || "Sin descripción"}</p>
      <p><strong>Precio:</strong> ${producto.precio}</p>
      <p><strong>Stock:</strong> {producto.stock}</p>
      <img src={producto.imagen} alt={producto.nombre} width="200" />
      <div className="contenedor_centrado">
      <Link to="/productos" className="boton_colaborar">
          Volver
      </Link>
      </div>
    </section>
  );
}