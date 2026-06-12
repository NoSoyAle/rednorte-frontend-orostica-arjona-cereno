import { getEstadoBadgeClass } from '../../utils/helpers';

export default function DoctorTable({ doctors, loading, onDelete }) {
  if (loading) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="placeholder-glow">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="d-flex gap-3 mb-3">
                <span className="placeholder col-3"></span>
                <span className="placeholder col-2"></span>
                <span className="placeholder col-3"></span>
                <span className="placeholder col-2"></span>
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
                <th className="text-muted small fw-semibold">Teléfono</th>
                <th className="text-muted small fw-semibold">Estado</th>
                <th className="text-muted small fw-semibold text-end px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-5">
                    <i className="bi bi-person-x fs-1 d-block mb-2"></i>
                    <p className="mb-0">No hay doctores registrados</p>
                  </td>
                </tr>
              ) : (
                doctors.map((d) => (
                  <tr key={d.id} className="border-bottom">
                    <td className="px-4 text-muted">{d.id}</td>
                    <td className="fw-medium" style={{ color: '#14213d' }}>
                      <i className="bi bi-person-badge me-2" style={{ color: '#4d9f61' }}></i>
                      {d.nombre}
                    </td>
                    <td className="text-muted">{d.rut}</td>
                    <td className="text-muted">{d.email}</td>
                    <td className="text-muted">{d.telefono}</td>
                    <td>
                      <span className={`badge ${getEstadoBadgeClass(d.estado)} rounded-pill`}>
                        {d.estado}
                      </span>
                    </td>
                    <td className="text-end px-4">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(d.id, d.nombre)}
                        title="Eliminar"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
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
