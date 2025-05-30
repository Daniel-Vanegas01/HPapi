import { useContext } from "react";
import { AppContext } from "../../contexto/contexto";
import { useNavigate } from "react-router-dom";

function Capturados() {
  const { listaCapturados } = useContext(AppContext);
  const navigate = useNavigate();

  if (listaCapturados.length === 0) {
    return <p>No has capturado personajes aún.</p>;
  }

  return (
    <div className="c-lista">
      {listaCapturados.map((personaje, index) => (
        <div
          className="c-lista-personaje"
          onClick={() => navigate(`/detalle/${personaje.name}`)}
          key={index}
          style={{ cursor: "pointer", marginBottom: "1rem" }}
        >
          <img
            src={personaje.image || "https://via.placeholder.com/80"}
            alt={`Personaje ${personaje.name}`}
            width="80"
            height="auto"
            loading="lazy"
          />
          <p>{personaje.name}</p>
          <p>{personaje.house || "Sin casa"}</p>
        </div>
      ))}
    </div>
  );
}

export default Capturados;
