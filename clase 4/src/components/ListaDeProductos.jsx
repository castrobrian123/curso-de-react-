import impresoraImg from "../imagenes/impresora comun.jpg";
import mouseImg from "../imagenes/mouse mecanico.jpg";
import auricularesImg from "../imagenes/auriculares grandes.jpg";
import tecladoImg from "../imagenes/teclado mecanico.jpg";

function ListaDeProductos({ añadirAlCarrito }) {
  const productos = [
    { id: 1, name: "Impresora", price: 25, image: impresoraImg },
    { id: 2, name: "Mouse", price: 40, image: mouseImg },
    { id: 3, name: "Auriculares", price: 60, image: auricularesImg },
    { id: 4, name: "Teclado", price: 70, image: tecladoImg },
  ];

  return (
    <div className="product-list">
      {productos.map((producto) => (
        <div key={producto.id} className="card">
          <img src={producto.image} alt={producto.name} className="product-img" />
          <h3>{producto.name}</h3>
          <p>Precio: ${producto.price}</p>
          <button onClick={() => añadirAlCarrito(producto)}>
            Agregar al carrito
          </button>
        </div>
      ))}
    </div>
  );
}

export default ListaDeProductos;
