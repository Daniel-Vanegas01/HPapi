import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../contexto/contexto';
import { useNavigate } from "react-router-dom";
import './style.css';
import Filtro from '../filtro';

function Lista() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const { 
    data, setData, casaSeleccionada, setCasaSeleccionada,
    favoritos, agregarAFavoritos, eliminarDeFavoritos
  } = useContext(AppContext);

  const handleCasaChange = (casa) => {
    setCasaSeleccionada(casa);
  };

  useEffect(() => {
    const fetchPersonajes = async () => {
      const res = await fetch('https://hp-api.onrender.com/api/characters');
      const personajes = await res.json();
      setData(personajes);
    };
    fetchPersonajes();
  }, [setData]);

  // Filtrar según la casa seleccionada
  let resultados = data;
  if (casaSeleccionada && casaSeleccionada !== 'All') {
    resultados = resultados.filter(p => p.house === casaSeleccionada);
  }

  // Filtrar según la búsqueda (mínimo 3 caracteres)
  if (busqueda.length >= 3) {
    resultados = resultados.filter(p =>
      p.name.toLowerCase().includes(busqueda.toLowerCase())
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
        {resultados.map((personaje, index) => {
          const esFavorito = favoritos.some(fav => fav.name === personaje.name);

          return (
            <div
              className='c-lista-pokemon'
              key={index}
            >
              <img
                src={personaje.image || 'https://via.placeholder.com/60x60?text=No+Image'}
                alt={`Personaje ${personaje.name}`}
                width='auto'
                height='60'
                loading='lazy'
                onClick={() => navigate(`/detalle/${encodeURIComponent(personaje.name)}`)}
                style={{ cursor: 'pointer' }}
              />
              <p onClick={() => navigate(`/detalle/${encodeURIComponent(personaje.name)}`)} style={{ cursor: 'pointer' }}>
                {personaje.name}
              </p>
              <p>{personaje.house || 'Sin casa'}</p>

              {esFavorito ? (
                <button onClick={() => eliminarDeFavoritos(personaje)}>
                  Quitar de Favoritos
                </button>
              ) : (
                <button onClick={() => agregarAFavoritos(personaje)}>
                  Agregar a Favoritos
                </button>
              )}
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Lista;
