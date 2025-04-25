import "./style.css";
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav className="c-menu">
      <Link to="/" className="c-menu-link">Lista</Link>
      <Link to="/capturados" className="c-menu-link">Capturados</Link>
      <Link to="/aleatorios" className="c-menu-link">Aleatorio</Link>
      <Link to="/usuarios" className="c-menu-link">Usuarios</Link>
      <Link to="/favoritos" className="c-menu-link">Favoritos</Link>
    </nav>
  );
}

export default Menu;
