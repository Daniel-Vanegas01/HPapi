import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function fetchUsuarios() {
      const { data, error } = await supabase
        .from("usuario")
        .select("*");
      if (error) {
        alert("Error al obtener usuarios");
        setCargando(false);
        return;
      }
      setUsuarios(data);
      setCargando(false);
    }

    fetchUsuarios();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";  // Redirige al login después de cerrar sesión
  };

  if (cargando) return <p>Cargando usuarios...</p>;

  return (
    <section>
      <h2>Lista de Usuarios</h2>
      {usuarios.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <ul>
          {usuarios.map((user) => (
            <li key={user.id}>
              <p><strong>Nombre:</strong> {user.nombre}</p>
              <p><strong>Correo:</strong> {user.correo}</p>
              <p><strong>Fecha de Nacimiento:</strong> {user.fecha_nacimiento}</p>
              <p><strong>Teléfono:</strong> {user.telefono}</p>
              <p><strong>Rol:</strong> {user.roll}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}

      <hr />

      <h2>Quiero cerrar sesión</h2>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </section>
  );
}
