import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function Navbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm sticky-top">
      <div className="container-fluid">
        <button
          className="btn btn-link text-dark d-lg-none me-2 p-0"
          onClick={onToggleSidebar}
          aria-label="Abrir menú"
        >
          <i className="bi bi-list fs-4"></i>
        </button>

        <Link to="/dashboard" className="navbar-brand d-flex align-items-center gap-2 mb-0">
          <span className="brand-icon d-grid place-items-center rounded text-white fw-bold" style={{ width: 36, height: 36, background: '#087f7a', fontSize: 20, placeItems: 'center' }}>
            +
          </span>
          <span className="fw-bold" style={{ color: '#14213d' }}>Red Norte Salud</span>
        </Link>

        <div className="d-none d-lg-flex align-items-center gap-1">
          <Link
            to="/dashboard"
            className={`nav-link px-3 py-2 rounded ${location.pathname === '/dashboard' ? 'active-nav' : 'text-muted'}`}
          >
            <i className="bi bi-speedometer2 me-1"></i> Dashboard
          </Link>
          <Link
            to="/users"
            className={`nav-link px-3 py-2 rounded ${location.pathname.startsWith('/users') ? 'active-nav' : 'text-muted'}`}
          >
            <i className="bi bi-people me-1"></i> Usuarios
          </Link>
          <Link
            to="/doctors"
            className={`nav-link px-3 py-2 rounded ${location.pathname.startsWith('/doctors') ? 'active-nav' : 'text-muted'}`}
          >
            <i className="bi bi-person-badge me-1"></i> Doctores
          </Link>
        </div>

        <div className="d-flex align-items-center gap-3">
          <span className="d-none d-md-inline text-muted small">
            <i className="bi bi-person-circle me-1"></i>
            {user?.nombre || 'Admin'}
          </span>
          <div className="dropdown">
            <button
              className="btn btn-sm btn-outline-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-gear"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button className="dropdown-item text-danger" onClick={logout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
