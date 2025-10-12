import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";


export default function CarritoFlotante() {
  const { carrito, vaciarCarrito, toggleCarrito } = useContext(CarritoContext);

  const total = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );

  return (
    <div className="modal-overlay">
      <div className="modal-carrito cards-mode">
        <h3>🛒 Tu Carrito</h3>
        <button className="cerrar-modal" onClick={toggleCarrito}>
          ✖
        </button>
      </div>

      {carrito.length === 0 ? (
        <p className="carrito-vacio">El carrito está vacío.</p>
      ) : (
        <ul className="lista-productos">
          {carrito.map((producto) => (
            <li key={producto.id} className="item-carrito">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                width="50"
                height="50"
              />
              <div className="info-producto">
                <p>{producto.nombre}</p>
                <p>
                  {producto.cantidad} × ${producto.precio.toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {carrito.length > 0 && (
        <div className="carrito-footer">
          <p>Total: ${total.toFixed(2)}</p>
          <button className="vaciar" onClick={vaciarCarrito}>
            Vaciar carrito
          </button>
        </div>
      )}
    </div>
  );
}


