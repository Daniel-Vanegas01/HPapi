import { useContext } from "react";
import { AppContext } from "../../contexto/contexto";

export default function Favoritos() {
  const { favoritos, setFavoritos } = useContext(AppContext);

  const handleEliminarFavorito = (id) => {
    const nuevosFavoritos = favoritos.filter((personaje) => personaje.id !== id);
    setFavoritos(nuevosFavoritos);
  };

  if (favoritos.length === 0) {
    return <p>No tienes personajes favoritos aún.</p>;
  }

  return (
    <section>
      <h2>Personajes Favoritos</h2>
      <ul>
        {favoritos.map((personaje) => (
          <li key={personaje.id} style={{ marginBottom: "1rem" }}>
            <p><strong>Nombre:</strong> {personaje.name}</p>
            <p><strong>Casa:</strong> {personaje.house || "Desconocida"}</p>
            <button onClick={() => handleEliminarFavorito(personaje.id)}>
              Eliminar de favoritos
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
