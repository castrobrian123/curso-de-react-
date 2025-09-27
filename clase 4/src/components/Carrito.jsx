function Carrito({ carrito, vaciarCarrito }) {
  const total = carrito.reduce(
    (acc, item) => acc + item.price * item.cantidad,
    0
  );

  return (
    <div className="carrito">
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <ul>
            {carrito.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price} x {item.cantidad} = ${item.price * item.cantidad}
              </li>
            ))}
          </ul>

          <p><strong>Total: ${total}</strong></p>

          <button onClick={vaciarCarrito}>Vaciar Carrito</button>
        </>
      )}
    </div>
  );
}

export default Carrito;