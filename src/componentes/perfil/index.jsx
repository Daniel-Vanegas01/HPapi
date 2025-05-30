import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../contexto/contexto';
import './style.css';

const casas = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
const varitas = [
  { id: 1, nombre: 'Varita de Acebo', imagen: 'https://i.imgur.com/jrXZy9X.png' },
  { id: 2, nombre: 'Varita de Saúco', imagen: 'https://i.imgur.com/mIwrUKI.png' },
  { id: 3, nombre: 'Varita de Fresno', imagen: 'https://i.imgur.com/wFcN6gw.png' },
  { id: 4, nombre: 'Varita de Ébano', imagen: 'https://i.imgur.com/ymkGzyL.png' },
];

// Función para elegir aleatorio de un array
const aleatorio = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function Perfil() {
  const { usuario, setUsuario } = useContext(AppContext);
  const [casa, setCasa] = useState('');
  const [varitaSeleccionada, setVaritaSeleccionada] = useState(null);

  useEffect(() => {
    if (usuario) {
      // Si no tiene casa asignada, asignar aleatoriamente
      const casaAsignada = usuario.casa || aleatorio(casas);
      // Si no tiene varita asignada, asignar aleatoriamente
      const varitaAsignada = usuario.varita || aleatorio(varitas);

      setCasa(casaAsignada);
      setVaritaSeleccionada(varitaAsignada);

      // Actualizamos en contexto para que quede guardado localmente
      setUsuario(prev => ({
        ...prev,
        casa: casaAsignada,
        varita: varitaAsignada,
      }));
    }
  }, [usuario, setUsuario]);

  const handleGuardar = () => {
    alert(`Perfil guardado:\nCasa: ${casa}\nVarita: ${varitaSeleccionada?.nombre || 'Ninguna'}`);
    setUsuario(prev => ({
      ...prev,
      casa,
      varita: varitaSeleccionada,
    }));
  };

  return (
    <section className="perfil-container">
      <h2>Perfil de Usuario</h2>

      <label htmlFor="selectCasa">Elige tu Casa:</label>
      <select
        id="selectCasa"
        value={casa}
        onChange={(e) => setCasa(e.target.value)}
        className="perfil-select"
      >
        {casas.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <p>Elige tu Varita:</p>
      <div className="perfil-varitas">
        {varitas.map(v => (
          <div
            key={v.id}
            onClick={() => setVaritaSeleccionada(v)}
            className={`perfil-varita ${varitaSeleccionada?.id === v.id ? 'seleccionada' : ''}`}
          >
            <img src={v.imagen} alt={v.nombre} />
            <p>{v.nombre}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleGuardar}
        disabled={!casa || !varitaSeleccionada}
        className="perfil-btn-guardar"
      >
        Guardar Perfil
      </button>
    </section>
  );
}
