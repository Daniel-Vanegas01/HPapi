import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../contexto/contexto';
import "./style.css";

function CapturadosHP() {
  const { listaCapturados, data } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      {listaCapturados.length} / {data.length}
      <section className="c-aleatorio c-lista">
        {data.map((personaje, index) => (
          <div
            key={index}
            className={listaCapturados.includes(personaje.name) ? "c-unpoke c-mios-pokemon" : "c-unpoke"}
            onClick={() => listaCapturados.includes(personaje.name) ? navigate(`/detalle/${personaje.name}`) : null}
          >
            {listaCapturados.includes(personaje.name) ? (
              <img
                src={personaje.image || "https://via.placeholder.com/60"}
                width="auto"
                height="45"
                loading="lazy"
                alt={personaje.name}
              />
            ) : null}
            <p>{personaje.name}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default CapturadosHP;
