import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const totalPersonajes = 200; // o el total de personajes que manejes
  const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || [];
  const [favoritos, setFavoritos] = useState(favoritosGuardados);

  const capturadosGuardados = JSON.parse(localStorage.getItem("capturados")) || [];
  const [listaCapturados, setListaCapturados] = useState(capturadosGuardados);

  const [data, setData] = useState([]);
  const [casaSeleccionada, setCasaSeleccionada] = useState('All');

  useEffect(() => {
    const obtenerDatos = async () => {
      if (casaSeleccionada === 'All') {
        // Obtener todos los personajes
        const res = await fetch(`https://hp-api.onrender.com/api/characters`);
        const json = await res.json();
        setData(json);
      } else {
        // Filtrar personajes por casa
        const res = await fetch(`https://hp-api.onrender.com/api/characters/house/${casaSeleccionada}`);
        const json = await res.json();
        setData(json);
      }
    };

    obtenerDatos();
  }, [casaSeleccionada]);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  useEffect(() => {
    localStorage.setItem("capturados", JSON.stringify(listaCapturados));
  }, [listaCapturados]);

  // Función para agregar favorito, evita duplicados
  const agregarAFavoritos = (personaje) => {
    if (!favoritos.some(fav => fav.name === personaje.name)) {
      setFavoritos([...favoritos, personaje]);
    }
  };

  // Función para eliminar favorito
  const eliminarDeFavoritos = (personaje) => {
    setFavoritos(favoritos.filter(fav => fav.name !== personaje.name));
  };

  return (
    <AppContext.Provider value={{
      favoritos,
      setFavoritos,
      agregarAFavoritos,
      eliminarDeFavoritos,
      data,
      setData,
      casaSeleccionada,
      setCasaSeleccionada,
      listaCapturados,
      setListaCapturados,
      totalPersonajes
    }}>
      {children}
    </AppContext.Provider>
  );
}
