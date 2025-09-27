import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logoEmpresa from "../imagenes/logo de empresa.png";

function Carrito({ carrito, actualizarCarrito, onClose }){

  const totalCarrito = carrito.reduce( (total, producto) => total + producto.precio * producto.cantidad , 0 );

  const agregarUnidad = (nombre) => {
    actualizarCarrito( (carritoAnterior) => carritoAnterior.map( (p) => p.nombre === nombre ? { ...p, cantidad: p.cantidad + 1 } : p ) );
  };

  const eliminarUnidad = (nombre) => {
    actualizarCarrito( (carritoAnterior) => carritoAnterior.map( (p) => p.nombre === nombre ? { ...p, cantidad: p.cantidad - 1 } : p ).filter( (p) => p.cantidad > 0 ));
  };

  const vaciarCarrito = () => actualizarCarrito([]);

  const generarIdPedido = () => {
    const random = Math.floor( 100000 + Math.random() * 900000 );
    return `ORD-${ random }`;
  };

  const generarPDF = () => {
    const anchoHoja = 180;
    const altoBase = 1300;
    const alturaProducto = 10;
    const alturaTotal = altoBase + carrito.length * alturaProducto;

    const doc = new jsPDF( { unit: "mm", format: [ anchoHoja, alturaTotal ], } );

    const fecha = new Date().toLocaleString();
    const idPedido = generarIdPedido();

    const anchoLogo = 30;
    doc.addImage( logoEmpresa, "PNG", ( anchoHoja - anchoLogo ) / 2, 5, anchoLogo, 25 );

    doc.setFontSize(16);
    doc.setFont( "helvetica", "bold" );
    doc.text( "Recibo de Compra Changolandia", anchoHoja / 2, 40, { align: "center" } );

    doc.setFontSize(12);
    doc.setFont( "helvetica", "normal" );
    doc.text( `Pedido: ${idPedido}`, anchoHoja / 2, 50, { align: "center" } );
    doc.text( `Fecha: ${fecha}`, anchoHoja / 2, 58, { align: "center" } );

    doc.setLineWidth(0.5);
    doc.line( 5, 65, anchoHoja - 5, 65 );

    const filas = carrito.map( (producto) => [ producto.nombre, producto.cantidad, `$${ producto.precio.toFixed(2) }`, `$${ ( producto.precio * producto.cantidad ).toFixed(2) }`, ] );

    autoTable( doc, { head: [ [ "Producto", "Cant.", "P.Unit", "Subtotal" ] ], body: filas, startY: 70, theme: "grid", styles: { fontSize: 12, halign: "center", cellPadding: 2 }, headStyles: { fontStyle: "bold", fillColor: [220, 220, 220] }, columnStyles: { 0: { halign: "left", cellWidth: "wrap" }, 1: { halign: "center", cellWidth: 20 }, 2: { halign: "center", cellWidth: 25 }, 3: { halign: "center", cellWidth: 25 }, }, margin: { left: 5, right: 5 }, tableWidth: "auto", });

    let y = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.setFont( "helvetica", "bold" );
    doc.text( `TOTAL: $${ totalCarrito.toFixed(2) }`, anchoHoja / 2, y, { align: "center" } );

    y += 5;
    doc.setLineWidth(0.5);
    doc.line( 5, y, anchoHoja - 5, y );

    y += 15;
    doc.setFont( "helvetica", "normal" );
    doc.setFontSize(12);
    doc.text( "¡Gracias por su compra!", anchoHoja / 2, y, { align: "center" } );

    doc.save( `ticket_${idPedido}.pdf` );
  };

  const compraConfirmada = () => {
    alert( "¡Compra confirmada! Se generó su ticket en PDF." );
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

        {carrito.length === 0 ? ( <p className="carrito-vacio">El carrito está vacío</p> ) : (
          <>
            <div className="productos-cards">
              {carrito.map( ( producto, index ) => (
                <div key={index} className="card-producto">
                  <div className="info-producto">
                    <h4>{producto.nombre}</h4>
                    <p>Cantidad: {producto.cantidad}</p>
                    <p>Precio unitario: ${ producto.precio.toFixed(2) }</p>
                    <p>
                      Total: ${ ( producto.precio * producto.cantidad ).toFixed(2) }
                    </p>
                  </div>
                  <div className="acciones-producto">
                    <button className="btn-agregar"  onClick={ () =>  agregarUnidad(producto.nombre) } > + </button>
                    <button className="btn-eliminar" onClick={ () => eliminarUnidad(producto.nombre) } > - </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="total-general">
              <h4>Total del carrito: ${ totalCarrito.toFixed(2) }</h4>
            </div>
          </>
        )}

        <div className="acciones-carrito">
          <button className="btn-eliminar" onClick={vaciarCarrito}>   Vaciar carrito  </button>
          <button className="btn-agregar" onClick={compraConfirmada}> Confirmar compra</button>
        </div>

      </div>

    </div>

  );


}

export default Carrito;