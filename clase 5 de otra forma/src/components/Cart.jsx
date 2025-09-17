import React from "react";

function Cart({ cart }) {
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-dark text-white">🛍️ Carrito</div>
      <div className="card-body">
        {cart.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <ul className="list-group">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between">
                {item.nombre} <span>💲 {item.precio}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Cart;
