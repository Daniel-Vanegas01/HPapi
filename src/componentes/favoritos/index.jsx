import { useContext } from 'react';
import { AppContext } from '../../contexto/contexto';
import { useNavigate } from "react-router-dom";

function Favoritos() {
  const { favoritos } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      {favoritos.length === 0 ? (
        <p>No hay personajes favoritos aún.</p>
      ) : (
        <div className='c-lista'>
          {favoritos.map((personaje, index) => (
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
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Favoritos;