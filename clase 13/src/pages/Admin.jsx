import { useState } from "react";

import { toast } from 'react-toastify';

import { FaPlus, FaSave, FaEdit, FaTrash, FaUndo, FaUpload } from "react-icons/fa";

export default function Admin({ API_URL, productos, setProductos, actualizarStock }) {
  const [nuevoProducto, setNuevoProducto] = useState({
    categoria: "",
    nombre: "",
    precio: "",
    imagen: "",
    stock: "",
    descripcion: "",
  });

  const [editandoId, setEditandoId] = useState(null);
  const [productoEditado, setProductoEditado] = useState({});
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);

  
  const validar = (producto) => {
    const nuevosErrores = {};
    if (!producto.categoria?.trim()) nuevosErrores.categoria = "La categoría es obligatoria.";
    if (!producto.nombre?.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!producto.precio || producto.precio <= 0) nuevosErrores.precio = "El precio debe ser mayor que 0.";
    if (producto.descripcion?.length < 10) nuevosErrores.descripcion = "La descripción debe tener al menos 10 caracteres.";
    if (!producto.imagen?.trim()) nuevosErrores.imagen = "Debe ingresar una URL de imagen.";
    if (producto.stock === "" || producto.stock < 0) nuevosErrores.stock = "El stock no puede ser negativo.";
    return nuevosErrores;
  };

  const limpiarMensajes = () => setTimeout(() => setMensaje(null), 3000);

  
  const handleChangeNuevo = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
    setErrores((prev) => ({ ...prev, [name]: "" }));
  };

  const handleChangeEditado = (e) => {
    const { name, value } = e.target;
    setProductoEditado({ ...productoEditado, [name]: value });
  };

  
  const handleAgregarProducto = async (e) => {
    e.preventDefault();
    const nuevosErrores = validar(nuevoProducto);

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      toast.error("❌ Hay errores en el formulario.", { autoClose: 2000 });
      return;
    }

    setCargando(true);
    // setMensaje(null); // Ya no se usa

    try {
      // ... (Llamada POST a la API - sin cambios)
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...nuevoProducto,
          precio: Number(nuevoProducto.precio),
          stock: Number(nuevoProducto.stock),
        }),
      });

      if (!res.ok) throw new Error("Error al conectar con MockAPI");

      const data = await res.json();
      setProductos([...productos, data]);
      setNuevoProducto({
        categoria: "", nombre: "", precio: "", imagen: "", stock: "", descripcion: "",
      });

      toast.success("✅ Producto agregado correctamente.");
    } catch (error) {
      console.error(error);
      toast.error("❌ Error al guardar el producto.");
    } finally {
      setCargando(false);
    }
  };

  
  const activarEdicion = (producto) => {
    setEditandoId(producto.id);
    setProductoEditado({ ...producto });
  };

  const guardarEdicion = async (e) => {
    e.preventDefault();
    const nuevosErrores = validar(productoEditado);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      toast.error("❌ Hay errores de validación en la edición.");
      return;
    }

    try {
      // ... (Llamada PUT a la API - sin cambios)
      const res = await fetch(`${API_URL}/${productoEditado.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...productoEditado,
          precio: Number(productoEditado.precio),
          stock: Number(productoEditado.stock),
        }),
      });

      if (!res.ok) throw new Error("Error al actualizar producto.");

      const data = await res.json();
      setProductos(productos.map((p) => (p.id === data.id ? data : p)));
      setEditandoId(null);
      setProductoEditado({});
      toast.success("✅ Producto actualizado correctamente.");
    } catch (error) {
      console.error(error);
      toast.error("❌ Error al actualizar el producto.");
    }
  };

  
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setProductos(productos.filter((p) => p.id !== id));
      toast.error("🗑️ Producto eliminado correctamente.");
    } catch (error) {
      console.error(error);
      toast.error("❌ Error al eliminar producto.");
    }
  };

  
  const handleReponerStock = (id) => {
    const producto = productos.find((p) => p.id === id);
    if (!producto) return;
    actualizarStock(id, producto.stock + 1);
    toast.info(`➕ Stock de "${producto.nombre}" aumentado.`, { autoClose: 1500 });
  };

  
  return (
    <section className="admin-container">
      <h2>Panel de Administración</h2>

      <form onSubmit={handleAgregarProducto} className="admin-form">
        <h3>Agregar nuevo producto <FaPlus style={{ marginRight: "5px" }} /> </h3>

        <input
          name="categoria"
          placeholder="Categoría"
          value={nuevoProducto.categoria}
          onChange={handleChangeNuevo}
        />
        {errores.categoria && <span className="error">{errores.categoria}</span>}

        <input
          name="nombre"
          placeholder="Nombre del producto"
          value={nuevoProducto.nombre}
          onChange={handleChangeNuevo}
        />
        {errores.nombre && <span className="error">{errores.nombre}</span>}

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={nuevoProducto.precio}
          onChange={handleChangeNuevo}
        />
        {errores.precio && <span className="error">{errores.precio}</span>}

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={nuevoProducto.stock}
          onChange={handleChangeNuevo}
        />
        {errores.stock && <span className="error">{errores.stock}</span>}

        <input
          name="imagen"
          placeholder="URL Imagen"
          value={nuevoProducto.imagen}
          onChange={handleChangeNuevo}
        />
        {errores.imagen && <span className="error">{errores.imagen}</span>}

        <textarea
          name="descripcion"
          placeholder="Descripción (mínimo 10 caracteres)"
          value={nuevoProducto.descripcion}
          onChange={handleChangeNuevo}
        />
        {errores.descripcion && <span className="error">{errores.descripcion}</span>}

        <button type="submit" disabled={cargando}>
          {cargando ? "Guardando..." : "Agregar Producto"}
        </button>
      </form>

      {mensaje && (
        <p className={`mensaje ${mensaje.tipo}`}>
          {mensaje.texto}
        </p>
      )}

      <h3>Inventario</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th><th>Categoría</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Imagen</th><th>Descripcion</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                {editandoId === p.id
                  ? <input name="categoria" value={productoEditado.categoria} onChange={handleChangeEditado} />
                  : p.categoria}
              </td>
              <td>
                {editandoId === p.id
                  ? <input name="nombre" value={productoEditado.nombre} onChange={handleChangeEditado} />
                  : p.nombre}
              </td>
              <td>
                {editandoId === p.id
                  ? <input type="number" name="precio" value={productoEditado.precio} onChange={handleChangeEditado} />
                  : `$${p.precio}`}
              </td>
              <td>{p.stock}</td>
              <td>
                {editandoId === p.id
                  ? <input name="imagen" value={productoEditado.imagen} onChange={handleChangeEditado} />
                  : <img src={p.imagen} width="50" alt={p.nombre} />}
              </td>
              <td>
        {editandoId === p.id
          ? <input
              name="descripcion"
              value={productoEditado.descripcion}
              onChange={handleChangeEditado}
              placeholder="Descripción"
            />
          : p.descripcion}
      </td>
              <td>
                {editandoId === p.id ? (
                  <button onClick={guardarEdicion} className="button-save"> <FaSave /> Guardar</button>
                ) : (
                  <>
                    <button onClick={() => handleReponerStock(p.id)} className="button-stock"> + Stock</button>
                    <button onClick={() => activarEdicion(p)} className="button-edit"> <FaEdit /> Editar</button>
                    <button onClick={() => handleEliminar(p.id)} className="button-delete"> <FaTrash /> Eliminar</button>
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
