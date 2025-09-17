import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const API_URL = "https://mockapi.io/clone/68cab761430c4476c34aa7fb";

function ProductList({ addToCart }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Error en la petición");
        const data = await res.json();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  if (loading) return <p className="text-center">⏳ Cargando productos...</p>;
  if (error) return <p className="text-danger text-center">⚠️ Error al cargar productos. Inténtalo más tarde.</p>;

  return (
    <div className="row">
      {productos.map((producto) => (
        <div key={producto.id} className="col-md-6 col-lg-4 mb-4">
          <ProductCard producto={producto} addToCart={addToCart} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
