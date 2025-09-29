
import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoEmpresa from "../imagenes/logo de empresa.png";

function Carrito({ carrito = [], actualizarCarrito = () => {}, onClose = () => {} }) {
  const totalCarrito = carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );

  const agregarUnidad = (id) => {
    actualizarCarrito((carritoAnterior) =>
      carritoAnterior.map((p) =>
        p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
      )
    );
  };

  const eliminarUnidad = (id) => {
    actualizarCarrito((carritoAnterior) =>
      carritoAnterior
        .map((p) =>
          p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        )
        .filter((p) => p.cantidad > 0)
    );
  };

  const vaciarCarrito = () => actualizarCarrito([]);

  const generarIdPedido = () => `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

  const generarPDF = () => {
    if (carrito.length === 0) return alert("El carrito está vacío");

    const doc = new jsPDF("p", "mm", "a4");
    const fecha = new Date().toLocaleString();
    const idPedido = generarIdPedido();

    // Logo y encabezado
    doc.addImage(logoEmpresa, "PNG", 80, 5, 50, 20);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Recibo de Compra", 105, 35, { align: "center" });
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Pedido: ${idPedido}`, 105, 42, { align: "center" });
    doc.text(`Fecha: ${fecha}`, 105, 49, { align: "center" });

    const filas = carrito.map((producto) => [
      producto.nombre,
      producto.cantidad,
      `$${producto.precio.toFixed(2)}`,
      `$${(producto.precio * producto.cantidad).toFixed(2)}`,
    ]);

    autoTable(doc, {
      head: [["Producto", "Cant.", "P.Unit", "Subtotal"]],
      body: filas,
      startY: 60,
      theme: "grid",
      styles: { fontSize: 12, halign: "center" },
      headStyles: { fontStyle: "bold", fillColor: [220, 220, 220] },
      columnStyles: { 0: { halign: "left" } },
      margin: { left: 10, right: 10 },
      tableWidth: "auto",
    });

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    const yTotal = doc.lastAutoTable.finalY + 10;
    doc.text(`TOTAL: $${totalCarrito.toFixed(2)}`, 105, yTotal, { align: "center" });
    doc.save(`ticket_${idPedido}.pdf`);
  };

  const compraConfirmada = () => {
    if (carrito.length === 0) return alert("El carrito está vacío");
    alert("¡Compra confirmada! Se generó su ticket en PDF.");
    generarPDF();
    vaciarCarrito();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-carrito cards-mode">
        <button className="cerrar-modal" onClick={onClose}>
          x
        </button>
        <h3>Carrito de Compras</h3>

        {carrito.length === 0 ? (
          <p className="carrito-vacio">El carrito está vacío</p>
        ) : (
          <>
            <div className="productos-cards">
              {carrito.map((producto) => (
                <div key={producto.id} className="card-producto">
                  <div className="info-producto">
                    <h4>{producto.nombre}</h4>
                    <p>Cantidad: {producto.cantidad}</p>
                    <p>Precio unitario: ${producto.precio.toFixed(2)}</p>
                    <p>Total: ${(producto.precio * producto.cantidad).toFixed(2)}</p>
                  </div>
                  <div className="acciones-producto">
                    <button onClick={() => agregarUnidad(producto.id)}>+</button>
                    <button onClick={() => eliminarUnidad(producto.id)}>-</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="total-general">
              <h4>Total del carrito: ${totalCarrito.toFixed(2)}</h4>
            </div>
          </>
        )}

        <div className="acciones-carrito">
          <button onClick={vaciarCarrito}>Vaciar carrito</button>
          <button onClick={compraConfirmada}>Confirmar compra</button>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
