import { useState, useContext } from 'react';
import { AppContext } from '../../contexto/contexto';
import { useNavigate } from "react-router-dom";
import './style.css';
import Filtro from '../filtro';

function Lista() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');

  const { data, tipoSeleccionado, setTipoSeleccionado } = useContext(AppContext);

  const handleCasaChange = (casa) => {
    setTipoSeleccionado(casa);
  };

  // Filtro por búsqueda
  let resultados = data;

  if (busqueda.length >= 3) {
    resultados = resultados.filter(personaje =>
      personaje.name.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  // Filtro por casa
  if (tipoSeleccionado !== "All") {
    resultados = resultados.filter(personaje =>
      (personaje.house || "unknown") === tipoSeleccionado
    );
  }

  return (
    <>
      <input
        type="text"
        placeholder="Buscar personaje"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      <Filtro onCasaChange={handleCasaChange} />

      <section className='c-lista'>
        {resultados.map((personaje, index) => (
          <div
            className={`c-lista-pokemon hp-house-${personaje.house || 'unknown'}`}
            onClick={() => navigate(`/detalle/${encodeURIComponent(personaje.name)}`)}
            key={index}
          >
            {personaje.image && (
              <img
                src={personaje.image}
                alt={`Personaje ${personaje.name}`}
                width='auto'
                height='60'
                loading='lazy'
              />
            )}
            <p>{personaje.name}</p>
            {personaje.house && <small>{personaje.house}</small>}
          </div>
        ))}
      </section>
    </>
  );
}

export default Lista;
