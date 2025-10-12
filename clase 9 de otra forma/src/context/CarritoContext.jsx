// src/context/CarritoContext.js
import { createContext, useState } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [carritoVisible, setCarritoVisible] = useState(false);

  const añadirAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);
      if (existe) {
        return prev.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const vaciarCarrito = () => setCarrito([]);
  const toggleCarrito = () => setCarritoVisible(!carritoVisible);

  return (
    <CarritoContext.Provider value={{ carrito, añadirAlCarrito, vaciarCarrito, carritoVisible, toggleCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};
