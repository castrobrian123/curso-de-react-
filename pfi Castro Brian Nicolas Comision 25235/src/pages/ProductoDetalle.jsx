
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { Helmet } from 'react-helmet-async';

import { FaArrowLeft } from "react-icons/fa";

export default function ProductoDetalle({ productos }) {
  const { id } = useParams();
  const producto = productos.find((p) => String(p.id) === id);

  if (!producto) {
    return <section style={{ padding: "20px" }}><h2>Producto no encontrado</h2></section>;
  }

  return (
    <section className="descripcion-de-producto">
      <Helmet>
        <title>{producto.nombre} | Changolandia</title>
        <meta name="description" content={`Detalles y precio de ${producto.nombre}. ${producto.descripcion}. Compra online en Changolandia.`} />
        <meta name="og:title" content={producto.nombre} />
        <meta name="og:image" content={producto.imagen} />
      </Helmet>
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion || "Sin descripción"}</p>
      <p><strong>Precio:</strong> ${producto.precio}</p>
      <p><strong>Stock:</strong> {producto.stock}</p>
      <img src={producto.imagen} alt={producto.nombre} width="200" />
      <div className="contenedor_centrado">
      <Link to="/productos" className="boton_colaborar">
        <FaArrowLeft style={{ marginRight: "5px" }} /> Volver
      </Link>
      </div>
    </section>
  );
}