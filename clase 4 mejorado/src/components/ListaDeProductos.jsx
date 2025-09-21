function ListaDeProductos({ productos, añadirAlCarrito }) {
  return (
    <div className="product-list">
      {productos.map((producto) => (
        <div key={producto.id} className="card">
          <img src={producto.image} alt={producto.name} className="product-img" />
          <h3>{producto.name}</h3>
          <p>Precio: ${producto.price}</p>
          <button onClick={() => añadirAlCarrito(producto)}>Agregar al carrito</button>
        </div>
      ))}
    </div>
  );
}

export default ListaDeProductos;