
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaCheese,
  FaWineBottle,
  FaCookie,
  FaUtensils,
} from "react-icons/fa";

// ✅ Importa el JSON directamente
import contenido from "./data/ElContenidoDeLaMateria.json";

const iconos = [
  <FaCheese />,
  <FaWineBottle />,
  <FaCookie />,
  <FaUtensils />,
];

export default function CategoriaDeUnidades() {
  // Inicializa con los datos del JSON
  const [unidades] = useState(contenido.unidades);
  const location = useLocation();

  return (
    <nav className="barra_de_unidades">
      <ul>
        {unidades.map((unidad, i) => {
          const activa = location.pathname.includes(`/unidad/${unidad.id}`);
          return (
            <li key={unidad.id} className={activa ? "activa" : ""}>
              <Link to={`/las_unidades/unidad/${unidad.id}`}>
                {iconos[i % iconos.length]} {unidad.titulo}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}


