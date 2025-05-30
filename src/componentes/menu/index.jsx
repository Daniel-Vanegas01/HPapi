import "./style.css";
import { Link } from 'react-router-dom';

function Menu() {
    return (
        <nav className="c-menu">
          <Link to="/">Personajes</Link>
          <Link to="/favoritos">Favoritos</Link>
          <Link to="/aleatorios">Aleatorio</Link>
          <Link to="/usuarios">Usuarios</Link>
          <Link to="/perfil">Perfil</Link>
        </nav>
    );
}

export default Menu;
