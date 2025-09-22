import React from "react";

function ModalCarrito({ cart,onClose,agregarUnidad,eliminarUnidad,vaciarCarrito,confirmarCompra, }) {
  
  const totalCarrito = cart.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );

  return (
    <div className="modal-overlay">
      <div className="modal-carrito cards-mode">
        <button className="cerrar-modal" onClick={onClose}>
          x
        </button>
        <h3>Carrito de Compras</h3>

        {cart.length === 0 ? (
          <p className="carrito-vacio">El carrito está vacío</p>
        ) : (
          <>
            <div className="productos-cards">
              {cart.map((producto, index) => (
                <div key={index} className="card-producto">
                  <div className="info-producto">
                    <h4>{producto.nombre}</h4>
                    <p>Cantidad: {producto.cantidad}</p>
                    <p>Precio unitario: ${producto.precio.toFixed(2)}</p>
                    <p>Total: ${(producto.precio * producto.cantidad).toFixed(2)}</p>
                  </div>
                  <div className="acciones-producto">
                    <button
                      className="btn-agregar"
                      onClick={() => agregarUnidad(producto.nombre)}
                    >
                      +
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => eliminarUnidad(producto.nombre)}
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="total-general">
              <h4>Total del carrito: ${totalCarrito.toFixed(2)}</h4>
            </div>
          </>
        )}

        <div className="acciones-carrito">
          <button className="btn-eliminar" onClick={vaciarCarrito}>
            Vaciar carrito
          </button>
          <button className="btn-agregar" onClick={confirmarCompra}>
            Confirmar compra
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCarrito;
