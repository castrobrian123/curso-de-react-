function Carrito({ carrito, vaciarCarrito }) {
  return (
    <div className="carrito">
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <ul>
            {carrito.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <button onClick={vaciarCarrito}>Vaciar Carrito</button>
        </>
      )}
    </div>
  );
}

export default Carrito;
