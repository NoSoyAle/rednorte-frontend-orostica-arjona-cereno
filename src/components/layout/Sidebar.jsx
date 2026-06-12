import { NavLink, useLocation } from 'react-router-dom';

const menuItems = [
  { path: '/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
  { path: '/users', icon: 'bi-people', label: 'Usuarios' },
  { path: '/doctors', icon: 'bi-person-badge', label: 'Doctores' },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay d-lg-none"
          onClick={onClose}
        />
      )}
      <aside className={`sidebar bg-white border-end shadow-sm ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="p-3 d-none d-lg-block">
          <p className="text-muted small text-uppercase mb-0 fw-semibold">
            <i className="bi bi-shield-lock me-1"></i> Panel Admin
          </p>
        </div>
        <nav className="nav flex-column px-2">
          {menuItems.map((item) => {
            const isActive =
              item.path === '/dashboard'
                ? location.pathname === '/dashboard'
                : location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`sidebar-link d-flex align-items-center gap-2 px-3 py-2 rounded mb-1 text-decoration-none ${
                  isActive ? 'active' : 'text-muted'
                }`}
              >
                <i className={`bi ${item.icon}`}></i>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
