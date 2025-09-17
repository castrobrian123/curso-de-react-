import React from "react";

function ProductCard({ producto, addToCart }) {
  return (
    <div className="card h-100 shadow-sm">
      <img src={producto.imagen} alt={producto.nombre} className="card-img-top" />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">💲 {producto.precio}</p>
        <button
          className="btn btn-primary mt-auto"
          onClick={() => addToCart(producto)}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
