import { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom"; 
import { AppContext } from '../../contexto/contexto';

function Detalle() {

  const { name } = useParams(); 
  const [personaje, setPersonaje] = useState(null);
  const { favoritos, setFavoritos } = useContext(AppContext);
  const esFavorito = favoritos.some(p => p.name === personaje?.name);

  useEffect(() => {
    fetch(`https://hp-api.onrender.com/api/characters`)
      .then(response => response.json())
      .then(data => {
        const encontrado = data.find(p => p.name.toLowerCase() === decodeURIComponent(name).toLowerCase());
        setPersonaje(encontrado);
      })
      .catch(error => console.error("Error:", error));
  }, [name]); 

  const toggleFavorito = () => {
    if (esFavorito) {
      setFavoritos(favoritos.filter(p => p.name !== personaje.name));
    } else {
      setFavoritos([...favoritos, { name: personaje.name }]);
    }
  };

  if (!personaje) return <p>Cargando...</p>;

  return (
    <div className="detalle-personaje">
      {personaje.image && (
        <img 
          src={personaje.image} 
          alt={personaje.name} 
          width="200"
        />
      )}

      <h2>{personaje.name}</h2>

      {personaje.house && <p>Casa: {personaje.house}</p>}
      {personaje.ancestry && <p>Linaje: {personaje.ancestry}</p>}
      {personaje.wand && personaje.wand.wood && <p>Varita: {personaje.wand.wood} con núcleo de {personaje.wand.core}</p>}
      {personaje.patronus && <p>Patronus: {personaje.patronus}</p>}

      <button onClick={toggleFavorito}>
        {esFavorito ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

export default Detalle;
