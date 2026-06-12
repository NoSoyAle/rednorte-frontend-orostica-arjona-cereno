import { Link } from 'react-router-dom';
import { getRolBadgeClass, getEstadoBadgeClass } from '../../utils/helpers';

export default function RecentUsersTable({ users, loading }) {
  if (loading) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="placeholder-glow">
            <span className="placeholder col-4 mb-3"></span>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="d-flex gap-3 mb-3">
                <span className="placeholder col-3"></span>
                <span className="placeholder col-3"></span>
                <span className="placeholder col-2"></span>
                <span className="placeholder col-2"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const recent = (users || []).slice(-5).reverse();

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold mb-0" style={{ color: '#14213d' }}>
            <i className="bi bi-clock-history me-2" style={{ color: '#087f7a' }}></i>
            Últimos Usuarios Registrados
          </h6>
          <Link to="/users" className="btn btn-sm btn-outline-primary" style={{ borderColor: '#087f7a', color: '#087f7a' }}>
            Ver todos <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr className="border-bottom">
                <th className="text-muted small fw-semibold">Nombre</th>
                <th className="text-muted small fw-semibold">RUT</th>
                <th className="text-muted small fw-semibold">Rol</th>
                <th className="text-muted small fw-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-muted py-4">
                    <i className="bi bi-inbox fs-4 d-block mb-2"></i>
                    No hay usuarios registrados
                  </td>
                </tr>
              ) : (
                recent.map((u) => (
                  <tr key={u.id}>
                    <td className="fw-medium" style={{ color: '#14213d' }}>{u.nombre}</td>
                    <td className="text-muted">{u.rut}</td>
                    <td>
                      <span className={`badge ${getRolBadgeClass(u.rol)} rounded-pill`}>
                        {u.rol}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getEstadoBadgeClass(u.estado)} rounded-pill`}>
                        {u.estado}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
