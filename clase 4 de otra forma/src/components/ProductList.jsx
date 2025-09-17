function ProductList({ products, addToCart }) {
  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="card">
          <img src={product.image} alt={product.name} className="product-img" />
          <h3>{product.name}</h3>
          <p>Precio: ${product.price}</p>
          <button onClick={() => addToCart(product)}>Agregar al carrito</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;