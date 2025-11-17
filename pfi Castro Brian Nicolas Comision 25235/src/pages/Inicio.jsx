
import React from "react";
import { Link } from "react-router-dom";
import CarouselDeImagenes from "../components/CarouselDeImagenes";
import CarouselDeVideos from "../components/CarouselDeVideos";
import videosData from "../components/data/videos.json";
import { FaBullseye, FaEye, FaUsers, FaUserTie, FaChalkboardTeacher, FaCommentDots } from "react-icons/fa";

export default function Inicio() {
    return (
    <div>
        <CarouselDeImagenes />
        <section className="Panel_De_Publicacion">

            <h2> <FaBullseye /> Nuestro Compromiso</h2>

            <div className="Seccion_De_Publicacion">

                <div className="La_Publicacion">
                    <h3> <FaBullseye /> Misión</h3>
                    <p>
                    Brindar a nuestros clientes una experiencia de compra accesible,
                    conveniente y confiable, ofreciendo productos de calidad a precios
                    competitivos, con un servicio cordial y eficiente que contribuya
                    al bienestar de la comunidad.
                    </p>
                </div>

                <div className="La_Publicacion">
                    <h3> <FaEye /> Visión</h3>
                    <p>
                    Ser el supermercado de referencia en nuestra región por nuestra
                    innovación, compromiso social y excelencia en el servicio, creando
                    valor sostenido para nuestros clientes, colaboradores y
                    proveedores.
                    </p>
                </div>

            </div>

        </section>

        <section className="Panel_De_Publicacion">

            <h2> <FaUsers /> Proyectos en curso</h2>

            <div className="Seccion_De_Publicacion">

                <div className="La_Publicacion">
                    <h3> <FaUsers /> Forma parte de la comunidad</h3>
                    <p>
                    Tu trabajo contribuye diariamente a mejorar la vida de vecinos y
                    familias.
                    </p>
                    <div className="contenedor_centrado">
                    <Link to="/contactos" className="boton_colaborar">
                        Contacto
                    </Link>
                    </div>
                </div>

                <div className="La_Publicacion">
                    <h3> <FaUserTie /> Tu rol dentro del trabajo importa</h3>
                    <p>
                    Cada rol tiene impacto. Asumirlo con rigor define la cultura de
                    toda la organización.
                    </p>
                    <div className="contenedor_centrado">
                    <Link to="/contactos" className="boton_colaborar">
                        Contacto
                    </Link>
                    </div>
                </div>

                <div className="La_Publicacion">
                    <h3> <FaChalkboardTeacher /> La capacitación es una responsabilidad compartida</h3>
                    <p>
                    Es un compromiso que asumimos como equipo. Lo que requiere
                    atención, disposición y respeto por los procesos aprendidos.
                    </p>
                    <div className="contenedor_centrado">
                    <Link to="/contactos" className="boton_colaborar">
                        Contacto
                    </Link>
                    </div>
                </div>

            </div>

        </section>

        <section className="Panel_De_Publicacion">

            <h2> <FaCommentDots /> Comentarios</h2>

            <div className="Seccion_De_Publicacion">

                <div className="La_Publicacion">
                    <h3>Alan Rodas</h3>
                    <p>
                    Tiene una excelente variedad de productos frescos y a buen precio
                    </p>
                </div>

                <div className="La_Publicacion">
                    <h3>Carlos Santana</h3>
                    <p>Hay mercadería de sobra</p>
                </div>

                <div className="La_Publicacion">
                    <h3>Santiago Torres</h3>
                    <p>Atención rápida en el mostrador</p>
                </div>
                
            </div>

        </section>
        <CarouselDeVideos videos={videosData} autoPlay={true}  />
    </div>
  );
}


