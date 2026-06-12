import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column"
      style={{ minHeight: '100vh', background: '#f7fbfb' }}
    >
      <h1 className="fw-bold mb-2" style={{ fontSize: 96, color: '#087f7a' }}>404</h1>
      <h4 className="fw-bold mb-2" style={{ color: '#14213d' }}>Página no encontrada</h4>
      <p className="text-muted mb-4">La página que buscas no existe o fue movida.</p>
      <Link
        to="/dashboard"
        className="btn text-white fw-semibold px-4"
        style={{ background: '#087f7a', borderRadius: 8 }}
      >
        <i className="bi bi-house me-2"></i> Ir al Dashboard
      </Link>
    </div>
  );
}
