import { useEffect, useState } from "react";

function Administrador() {
  const [personajes, setPersonajes] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function fetchPersonajes() {
      const res = await fetch("https://hp-api.herokuapp.com/api/characters");
      const data = await res.json();
      setPersonajes(data);
      setCargando(false);
    }
    fetchPersonajes();
  }, []);

  const handleEliminar = (name) => {
    // Eliminación local solo
    setPersonajes(personajes.filter(p => p.name !== name));
  };

  if (cargando) return <p>Cargando personajes...</p>;

  return (
    <div>
      <h2>Administrador - Personajes Harry Potter</h2>
      <ul>
        {personajes.map((p) => (
          <li key={p.name} style={{ marginBottom: "1rem" }}>
            <strong>{p.name}</strong> - {p.house || "Sin casa"}
            <button 
              onClick={() => handleEliminar(p.name)} 
              style={{ marginLeft: "1rem" }}
            >
              Eliminar (local)
            </button>
          </li>
        ))}
      </ul>
      <p><em>La eliminación es solo local y no afecta la API externa.</em></p>
    </div>
  );
}

export default Administrador;
