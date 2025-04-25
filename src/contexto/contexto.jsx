import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [tipoSeleccionado, setTipoSeleccionado] = useState("All");
  const [listaCapturados, setListaCapturados] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [totalPokes, setTotalPokes] = useState(100); // Este lo podés cambiar o eliminar según si lo usás

  useEffect(() => {
    // Cambiar por la API de Harry Potter
    fetch("https://hp-api.onrender.com/api/characters")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setTotalPokes(data.length); // para mantener funcional lo de capturados
      })
      .catch((err) => console.error("Error cargando personajes:", err));
  }, []);

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        tipoSeleccionado,
        setTipoSeleccionado,
        listaCapturados,
        setListaCapturados,
        favoritos,
        setFavoritos,
        totalPokes
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
