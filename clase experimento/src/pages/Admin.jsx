
// pages/Admin.jsx
import { useState } from "react";

export default function Admin({ API_URL, productos, setProductos, actualizarStock }) {
  const [nuevoProducto, setNuevoProducto] = useState({
    categoria: "", nombre: "", precio: "", imagen: "", stock: "",
  });
  const [editandoId, setEditandoId] = useState(null);
  const [productoEditado, setProductoEditado] = useState({});

  const handleChangeNuevo = (e) => setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  const handleChangeEditado = (e) => setProductoEditado({ ...productoEditado, [e.target.name]: e.target.value });

  const handleAgregarProducto = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...nuevoProducto, precio: Number(nuevoProducto.precio), stock: Number(nuevoProducto.stock) }),
      });
      const data = await res.json();
      setProductos([...productos, data]);
      setNuevoProducto({ categoria: "", nombre: "", precio: "", imagen: "", stock: "" });
    } catch (err) { console.error(err); }
  };

  const activarEdicion = (producto) => { setEditandoId(producto.id); setProductoEditado({ ...producto }); };
  const guardarEdicion = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/${productoEditado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...productoEditado, precio: Number(productoEditado.precio), stock: Number(productoEditado.stock) }),
      });
      const data = await res.json();
      setProductos(productos.map((p) => (p.id === data.id ? data : p)));
      setEditandoId(null); setProductoEditado({});
    } catch (err) { console.error(err); }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setProductos(productos.filter((p) => p.id !== id));
    } catch (err) { console.error(err); }
  };

  const handleReponerStock = (id) => {
    const producto = productos.find((p) => p.id === id);
    if (!producto) return;
    actualizarStock(id, producto.stock + 1);
  };

  return (
        <section className="admin-container">
      <h2>Panel de Administración</h2>
      <form onSubmit={handleAgregarProducto} className="admin-form">
        <h3>Agregar producto</h3>
        <input name="categoria" placeholder="Categoría" value={nuevoProducto.categoria} onChange={handleChangeNuevo} required />
        <input name="nombre" placeholder="Nombre" value={nuevoProducto.nombre} onChange={handleChangeNuevo} required />
        <input type="number" name="precio" placeholder="Precio" value={nuevoProducto.precio} onChange={handleChangeNuevo} required />
        <input name="imagen" placeholder="URL Imagen" value={nuevoProducto.imagen} onChange={handleChangeNuevo} required />
        <input type="number" name="stock" placeholder="Stock" value={nuevoProducto.stock} onChange={handleChangeNuevo} required />
        <button type="submit">Agregar</button>
      </form>

      <h3>Inventario</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th><th>Categoría</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Imagen</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{editandoId === p.id ? <input name="categoria" value={productoEditado.categoria} onChange={handleChangeEditado} /> : p.categoria}</td>
              <td>{editandoId === p.id ? <input name="nombre" value={productoEditado.nombre} onChange={handleChangeEditado} /> : p.nombre}</td>
              <td>{editandoId === p.id ? <input type="number" name="precio" value={productoEditado.precio} onChange={handleChangeEditado} /> : `$${p.precio}`}</td>
              <td>{p.stock}</td>
              <td>{editandoId === p.id ? <input name="imagen" value={productoEditado.imagen} onChange={handleChangeEditado} /> : <img src={p.imagen} width="50" alt={p.nombre} />}</td>
              <td>
                {editandoId === p.id ? (
                  <button onClick={guardarEdicion} className="button-save">Guardar</button>
                ) : (
                  <>
                    <button onClick={() => handleReponerStock(p.id)} className="button-stock">Reponer Stock</button>
                    <button onClick={() => activarEdicion(p)} className="button-edit">Editar</button>
                    <button onClick={() => handleEliminar(p.id)} className="button-delete">Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}


