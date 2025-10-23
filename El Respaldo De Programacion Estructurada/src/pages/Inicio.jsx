
import React from "react";
import { Link } from "react-router-dom";
import { FaBullseye, FaEye, FaUsers, FaUserTie, FaChalkboardTeacher, FaCommentDots } from "react-icons/fa";

export default function Inicio() {
    return (
    <div>
        <section className="Panel_De_Publicacion">

            <h2> <FaBullseye /> Bienvenidos al Respaldo de Programación Estructurada</h2>

            <div className="Seccion_De_Publicacion">

                <div className="La_Publicacion">
                    <h3> <FaBullseye /> Presentación</h3>
                    <p>
                    Esta Pagina de respaldo fue creada en caso de caida del campus.
                    </p>
                </div>

                <div className="La_Publicacion">
                    <h3> <FaEye /> Objetivos</h3>
                    <p>
                    nada.
                    </p>
                </div>

            </div>

        </section>

        <section className="Panel_De_Publicacion">

            <h2> <FaUsers /> nada</h2>

            <div className="Seccion_De_Publicacion">

                <div className="La_Publicacion">
                    <h3> <FaUsers /> nada</h3>
                    <p>
                    nada.
                    </p>
                </div>

                <div className="La_Publicacion">
                    <h3> <FaUserTie /> nada</h3>
                    <p>
                    nada.
                    </p>
                </div>

                <div className="La_Publicacion">
                    <h3> <FaChalkboardTeacher /> nada</h3>
                    <p>
                    nada
                    </p>
                </div>

            </div>

        </section>

        <section className="Panel_De_Publicacion">

            <h2> <FaCommentDots /> Alguna Opinion</h2>

            <div className="Seccion_De_Publicacion">

                <div className="La_Publicacion">
                    <h3>nada</h3>
                    <p>
                    nada.
                    </p>
                </div>

                <div className="La_Publicacion">
                    <h3>nada</h3>
                    <p>nada.</p>
                </div>

                <div className="La_Publicacion">
                    <h3>nada</h3>
                    <p>nada.</p>
                </div>
                
            </div>

        </section>
    </div>
  );
}



