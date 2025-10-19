
import { createContext, useState, useContext } from "react";
import logoEmpresa from "../imagenes/logo de empresa.png";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";


export const CarritoContext = createContext();

export const CarritoProvider = ({ children, productos, actualizarStock }) => {
  const [carrito, setCarrito] = useState([]);
  const [carritoVisible, setCarritoVisible] = useState(false);

  
  const añadirAlCarrito = (productoId) => {
    const producto = productos.find(p => p.id === productoId);
    if (!producto || producto.stock <= 0) return alert("No hay stock disponible");

    setCarrito(prev => {
      const existe = prev.find(p => p.id === productoId);
      if (existe) {
        return prev.map(p =>
          p.id === productoId ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });

    actualizarStock(productoId, producto.stock - 1);
  };

  
  const aumentarCantidad = (productoId) => {
    const producto = productos.find(p => p.id === productoId);
    if (!producto || producto.stock <= 0) return alert("No hay más stock disponible");

    setCarrito(prev =>
      prev.map(p =>
        p.id === productoId ? { ...p, cantidad: p.cantidad + 1 } : p
      )
    );

    actualizarStock(productoId, producto.stock - 1);
  };

  
  const disminuirCantidad = (productoId) => {
    const item = carrito.find(p => p.id === productoId);
    if (!item || item.cantidad <= 1) return;

    setCarrito(prev =>
      prev.map(p =>
        p.id === productoId ? { ...p, cantidad: p.cantidad - 1 } : p
      )
    );

    const producto = productos.find(p => p.id === productoId);
    actualizarStock(productoId, producto.stock + 1);
  };

  
  const eliminarDelCarrito = (productoId) => {
    const item = carrito.find(p => p.id === productoId);
    if (!item) return;

    const producto = productos.find(p => p.id === productoId);
    actualizarStock(productoId, producto.stock + item.cantidad);

    setCarrito(prev => prev.filter(p => p.id !== productoId));
  };

  
  const vaciarCarrito = () => {
    carrito.forEach(item => {
      const producto = productos.find(p => p.id === item.id);
      actualizarStock(item.id, producto.stock + item.cantidad);
    });
    setCarrito([]);
  };

  
  const toggleCarrito = () => setCarritoVisible(!carritoVisible);

  
  const generarPDF = () => {
    if (carrito.length === 0) return alert("El carrito está vacío");

    const doc = new jsPDF("p", "mm", "a4");
    const fecha = new Date().toLocaleString();
    const idPedido = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

    try { doc.addImage(logoEmpresa, "PNG", 80, 5, 50, 20); } catch (e) {}

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Recibo de Compra", 105, 35, { align: "center" });
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Pedido: ${idPedido}`, 105, 42, { align: "center" });
    doc.text(`Fecha: ${fecha}`, 105, 49, { align: "center" });

    const filas = carrito.map(p => [
      p.nombre,
      p.cantidad,
      `$${p.precio.toFixed(2)}`,
      `$${(p.precio * p.cantidad).toFixed(2)}`
    ]);

    autoTable(doc, {
      head: [["Producto", "Cant.", "P.Unit", "Subtotal"]],
      body: filas,
      startY: 60,
      theme: "grid",
      styles: { fontSize: 12, halign: "center" },
      headStyles: { fontStyle: "bold", fillColor: [220, 220, 220] },
      columnStyles: { 0: { halign: "left" } },
      margin: { left: 10, right: 10 }
    });

    const yTotal = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL: $${total.toFixed(2)}`, 105, yTotal, { align: "center" });

    doc.save(`ticket_${idPedido}.pdf`);
  };

  const compraConfirmada = () => {
    if (carrito.length === 0) return alert("El carrito está vacío");
    alert("¡Compra confirmada! Se generó su ticket en PDF.");
    generarPDF();
    vaciarCarrito();
    setCarritoVisible(false);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        añadirAlCarrito,
        eliminarDelCarrito,
        aumentarCantidad,
        disminuirCantidad,
        vaciarCarrito,
        carritoVisible,
        toggleCarrito,
        compraConfirmada,
      }}
    >
      {children}
      {carritoVisible && (
        <div className="modal-overlay" onClick={toggleCarrito}>
          <div
            className="modal-carrito cards-mode"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="cerrar-modal" onClick={toggleCarrito}>X</button>
            <h2 className="carrito-titulo">Carrito de Compras</h2>

            {carrito.length === 0 ? (
              <p className="carrito-vacio">El carrito está vacío</p>
            ) : (
              <div className="productos-cards">
                {carrito.map((p) => (
                  <div className="card-producto" key={p.id}>
                    <div className="info-producto">
                      <h3>{p.nombre}</h3>
                      <p>Cantidad: {p.cantidad}</p>
                      <p>Precio unitario: ${p.precio.toFixed(2)}</p>
                      <p>Total: ${(p.precio * p.cantidad).toFixed(2)}</p>
                    </div>

                    <div className="acciones-producto">
                      <button
                        className="btn-agregar"
                        onClick={() => aumentarCantidad(p.id)}
                      >
                        +
                      </button>
                      <button
                        className="btn-eliminar"
                        onClick={() => disminuirCantidad(p.id)}
                      >
                        -
                      </button>
                      <button
                        className="btn-eliminar"
                        onClick={() => eliminarDelCarrito(p.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {carrito.length > 0 && (
              <h3 className="total-general">
                Total del carrito: $
                {carrito.reduce(
                  (sum, p) => sum + p.precio * p.cantidad,
                  0
                ).toFixed(2)}
              </h3>
            )}

            <div className="acciones-carrito">
              <button className="btn-eliminar" onClick={vaciarCarrito}>
                Vaciar carrito
              </button>
              <button className="btn-agregar" onClick={compraConfirmada}>
                Confirmar compra
              </button>
            </div>
          </div>
        </div>
      )}
    </CarritoContext.Provider>
  );
};



