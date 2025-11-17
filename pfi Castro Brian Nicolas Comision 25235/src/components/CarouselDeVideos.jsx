import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const CarouselDeVideos = ({ videos }) => {

  const [indiceActual, setIndiceActual] = useState(0);
  const [transicion, setTransicion] = useState(false);
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  
  const siguienteVideo = () => {
    setTransicion(true);
    setTimeout(() => {
      setIndiceActual((prev) => (prev + 1) % videos.length);
      setTransicion(false);
    }, 400);
  };

  const anteriorVideo = () => {
    setTransicion(true);
    setTimeout(() => {
      setIndiceActual((prev) => (prev - 1 + videos.length) % videos.length);
      setTransicion(false);
    }, 400);
  };

  
  useEffect(() => {

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.document.body.appendChild(tag);
    }
    
    window.onYouTubeIframeAPIReady = () => {
      crearJugador();
    };

  }, []);

  
  useEffect(() => {

    if (window.YT && window.YT.Player) {
      crearJugador();
    }

  }, [indiceActual]);

  const crearJugador = () => {

    if (playerRef.current) {
      playerRef.current.destroy();
    }

    playerRef.current = new window.YT.Player(containerRef.current, {

      videoId: extraerIdDeYoutube(videos[indiceActual].url),
      playerVars: { autoplay: 1, mute: 0, controls: 1, modestbranding: 1, rel: 0, },
      events: {

        onReady: (event) => {
          event.target.playVideo();
        },

        onStateChange: (event) => {
          
          if (event.data === window.YT.PlayerState.ENDED) {
            siguienteVideo();
          }

        },

      },

    });
    
  };
  
  const extraerIdDeYoutube = (url) => {

    const regex = /(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([A-Za-z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;

  };

  return (

    <div className="carousel-container">

      <button className="carousel-btn izquierda" onClick={anteriorVideo} >

        <FaChevronLeft />

      </button>

      <div className={`carousel-slide ${transicion ? "salida" : "entrada"}`} >

        <div id="youtube-player" ref={containerRef} className="video-frame" ></div>
        
      </div>

      <button className="carousel-btn derecha" onClick={siguienteVideo} >

        <FaChevronRight />

      </button>

    </div>

  );

};

export default CarouselDeVideos;

