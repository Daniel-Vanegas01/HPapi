import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../contexto/contexto';

function Aleatorios() {
  const { data, listaCapturados, setListaCapturados, setTipoSeleccionado } = useContext(AppContext);
  const [aleatorio, setAleatorio] = useState([]);

  const navigate = useNavigate();

  setTipoSeleccionado("All");

  useEffect(() => {
    if (data.length > 0) {
      generar();
    }
  }, [data]);

  const generar = () => {
    let nuevosAleatorios = [];

    while (nuevosAleatorios.length < 4) {
      const index = Math.floor(Math.random() * data.length);
      nuevosAleatorios.push(data[index]);
    }
    setAleatorio(nuevosAleatorios);

    const nuevosIds = nuevosAleatorios.map((personaje) => personaje.name)
      .filter(name => !listaCapturados.includes(name));
      
    setListaCapturados(prev => [...prev, ...nuevosIds]);
  };

  return (
    <section className="c-aleatorio c-lista">
      {aleatorio.map((personaje, index) => (
        <div className="c-lista-pokemon c-un_aleatorio"
          key={index}
          onClick={() => navigate(`/detalle/${encodeURIComponent(personaje.name)}`)}
        >
          <p>{personaje.name}</p>
          {personaje.image && (
            <img
              src={personaje.image}
              alt={`Personaje ${personaje.name}`}
              width="60"
              height="60"
            />
          )}
          <p>{personaje.house || "Sin casa"}</p>
        </div>
      ))}
      <button onClick={generar}>Generar</button>
    </section>
  );
}

export default Aleatorios;
