function Cart({ cart, clearCart }) {
  return (
    <div className="cart">
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <button onClick={clearCart}>Vaciar Carrito</button>
        </>
      )}
    </div>
  );
}

export default Cart;
