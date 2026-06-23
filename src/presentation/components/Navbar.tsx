import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="navbar-icon">🎮</span>
        <span>Sprite Previewer</span>
      </Link>
      <div className="navbar-links">
        <Link to="/list" className={pathname === '/list' ? 'active' : ''}>
          Gallery
        </Link>
        <Link to="/preview" className={pathname.startsWith('/preview') ? 'active' : ''}>
          Preview
        </Link>
      </div>
    </nav>
  );
}
