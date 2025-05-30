import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detalle() {
  const { name } = useParams();
  const [personaje, setPersonaje] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function fetchPersonaje() {
      setCargando(true);
      try {
        const res = await fetch("https://hp-api.onrender.com/api/characters");
        const data = await res.json();
        // Buscar personaje por nombre exacto (case-insensitive)
        const encontrado = data.find(
          (p) => p.name.toLowerCase() === name.toLowerCase()
        );
        setPersonaje(encontrado || null);
      } catch (error) {
        console.error("Error cargando personaje:", error);
        setPersonaje(null);
      } finally {
        setCargando(false);
      }
    }

    fetchPersonaje();
  }, [name]);

  if (cargando) return <p>Cargando personaje...</p>;

  if (!personaje) return <p>Personaje no encontrado.</p>;

  return (
    <div>
      <h2>{personaje.name}</h2>
      <img
        src={personaje.image || "https://via.placeholder.com/200"}
        alt={personaje.name}
        width="200"
        height="auto"
      />
      <p><strong>Casa:</strong> {personaje.house || "Desconocida"}</p>
      <p><strong>Especie:</strong> {personaje.species || "Desconocida"}</p>
      <p><strong>Género:</strong> {personaje.gender || "Desconocido"}</p>
      <p><strong>Patronus:</strong> {personaje.patronus || "Desconocido"}</p>
      <p><strong>Actor:</strong> {personaje.actor || "Desconocido"}</p>
      <p><strong>Varita:</strong></p>
      <ul>
        <li><strong>Madera:</strong> {personaje.wand?.wood || "Desconocida"}</li>
        <li><strong>Core:</strong> {personaje.wand?.core || "Desconocido"}</li>
        <li><strong>Longitud:</strong> {personaje.wand?.length ? `${personaje.wand.length} pulgadas` : "Desconocida"}</li>
      </ul>
      <p><strong>Estado de muerte:</strong> {personaje.alive ? "Vivo" : "Muerto"}</p>
    </div>
  );
}

export default Detalle;
