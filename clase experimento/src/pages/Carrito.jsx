
export default function Carrito({ carrito, eliminarDelCarrito, aumentarCantidad, disminuirCantidad }) {
  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  return (
    <section style={{ padding: "20px" }}>
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? <p>El carrito está vacío</p> : (
        <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "center" }}>
          <thead>
            <tr><th>Nombre</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {carrito.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>${p.precio}</td>
                <td>{p.cantidad}</td>
                <td>${p.precio * p.cantidad}</td>
                <td>
                  <button onClick={() => disminuirCantidad(p.id)}>-</button>
                  <button onClick={() => aumentarCantidad(p.id)}>+</button>
                  <button onClick={() => eliminarDelCarrito(p.id)} style={{ color: "red" }}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3>Total: ${total}</h3>
    </section>
  );
}

