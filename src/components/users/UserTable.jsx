import { getRolBadgeClass, getEstadoBadgeClass } from '../../utils/helpers';

export default function UserTable({ users, loading, onDelete, onView, onToggleStatus }) {
  if (loading) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="placeholder-glow">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="d-flex gap-3 mb-3">
                <span className="placeholder col-1"></span>
                <span className="placeholder col-3"></span>
                <span className="placeholder col-2"></span>
                <span className="placeholder col-3"></span>
                <span className="placeholder col-1"></span>
                <span className="placeholder col-1"></span>
                <span className="placeholder col-1"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="text-muted small fw-semibold px-4 py-3">ID</th>
                <th className="text-muted small fw-semibold">Nombre</th>
                <th className="text-muted small fw-semibold">RUT</th>
                <th className="text-muted small fw-semibold">Email</th>
                <th className="text-muted small fw-semibold">Rol</th>
                <th className="text-muted small fw-semibold">Estado</th>
                <th className="text-muted small fw-semibold text-end px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-5">
                    <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                    <p className="mb-0">No se encontraron usuarios</p>
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-bottom">
                    <td className="px-4 text-muted">{u.id}</td>
                    <td className="fw-medium" style={{ color: '#14213d' }}>{u.nombre}</td>
                    <td className="text-muted">{u.rut}</td>
                    <td className="text-muted">{u.email}</td>
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
                    <td className="text-end px-4">
                      <div className="btn-group btn-group-sm">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => onView(u)}
                          title="Ver detalle"
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        <button
                          className={`btn ${u.estado === 'ACTIVO' ? 'btn-outline-warning' : 'btn-outline-success'}`}
                          onClick={() => onToggleStatus(u.id, u.estado)}
                          title={u.estado === 'ACTIVO' ? 'Desactivar' : 'Activar'}
                        >
                          <i className={`bi ${u.estado === 'ACTIVO' ? 'bi-toggle-on' : 'bi-toggle-off'}`}></i>
                        </button>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => onDelete(u.id, u.nombre)}
                          title="Eliminar"
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
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
