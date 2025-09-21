import React from "react";

function ModalCarrito({ cart, onClose, agregarUnidad, eliminarUnidad, vaciarCarrito, confirmarCompra }) {
  return (
    <div className="modal-overlay">
      <div className="modal-carrito">
        <button className="cerrar-modal" onClick={onClose}>
          X
        </button>
        <h3>Carrito de Compras</h3>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.length === 0 ? (
              <tr>
                <td colSpan="4">El carrito está vacío</td>
              </tr>
            ) : (
              cart.map((producto, index) => (
                <tr key={index}>
                  <td>{producto.nombre}</td>
                  <td>{producto.cantidad}</td>
                  <td>${producto.precio.toFixed(2)}</td>
                  <td>
                    <button className="btn-agregar" onClick={() => agregarUnidad(producto.nombre)}>
                      Agregar unidad
                    </button>
                    <button className="btn-eliminar" onClick={() => eliminarUnidad(producto.nombre)}>
                      Eliminar unidad
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

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
