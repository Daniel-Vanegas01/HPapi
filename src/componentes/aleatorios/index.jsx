import { useEffect, useState } from "react";

function Aleatorios() {
  const [personajes, setPersonajes] = useState([]);
  const [aleatorios, setAleatorios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPersonajes() {
      try {
        const res = await fetch("https://hp-api.onrender.com/api/characters");
        if (!res.ok) throw new Error("Error al obtener personajes");
        const data = await res.json();
        setPersonajes(data);
        generarAleatorios(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setCargando(false);
      }
    }
    fetchPersonajes();
  }, []);

  const generarAleatorios = (lista) => {
    const seleccionados = [];
    const max = lista.length;
    while (seleccionados.length < 5 && seleccionados.length < max) {
      const indice = Math.floor(Math.random() * max);
      const personaje = lista[indice];
      if (!seleccionados.includes(personaje)) {
        seleccionados.push(personaje);
      }
    }
    setAleatorios(seleccionados);
  };

  if (cargando) return <p>Cargando personajes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Personajes Aleatorios de Harry Potter</h2>
      <button onClick={() => generarAleatorios(personajes)}>Generar nuevos</button>
      <ul>
        {aleatorios.map((p) => (
          <li key={p.name} style={{ marginBottom: "1rem" }}>
            <strong>{p.name}</strong> - {p.house || "Sin casa"}
            <br />
            {p.image && <img src={p.image} alt={p.name} width={100} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Aleatorios;
