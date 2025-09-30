
export default function Carrito({ carrito, eliminarDelCarrito, aumentarCantidad, disminuirCantidad }) {
  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  return (
    <section className="carrito-container">
      <h2 className="carrito-titulo">🛒 Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p className="carrito-vacio">El carrito está vacío</p>
      ) : (
        <div className="tabla-wrapper">
          <table className="carrito-tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>${p.precio}</td>
                  <td>{p.cantidad}</td>
                  <td className="subtotal">${p.precio * p.cantidad}</td>
                  <td>
                    <button className="btn-cantidad" onClick={() => disminuirCantidad(p.id)}>➖</button>
                    <button className="btn-cantidad" onClick={() => aumentarCantidad(p.id)}>➕</button>
                    <button className="btn-eliminar" onClick={() => eliminarDelCarrito(p.id)}>🗑 Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {carrito.length > 0 && (
        <h3 className="carrito-total">
          Total: <span>${total}</span>
        </h3>
      )}
    </section>
  );
}