import { useState, useEffect } from 'react';
import { citasService } from '../../services/citasService';

export default function CitasCanceladasTable() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarCitas = async () => {
      try {
        const data = await citasService.obtenerCitasCanceladas();
        setCitas(data);
      } catch (error) {
        console.error('Error al cargar citas canceladas:', error);
        setCitas([]);
      } finally {
        setLoading(false);
      }
    };
    cargarCitas();
  }, []);

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-CL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="placeholder-glow">
            <span className="placeholder col-4 mb-3"></span>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="d-flex gap-3 mb-3">
                <span className="placeholder col-3"></span>
                <span className="placeholder col-3"></span>
                <span className="placeholder col-2"></span>
                <span className="placeholder col-2"></span>
                <span className="placeholder col-3"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body p-4">
        <h5 className="fw-bold mb-3" style={{ color: '#14213d' }}>
          <i className="bi bi-x-circle text-danger me-2"></i>
          Citas Canceladas
          <span className="badge bg-danger ms-2">{citas.length}</span>
        </h5>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="text-muted small fw-semibold">Paciente</th>
                <th className="text-muted small fw-semibold">Doctor</th>
                <th className="text-muted small fw-semibold">Especialidad</th>
                <th className="text-muted small fw-semibold">Fecha</th>
                <th className="text-muted small fw-semibold">Motivo</th>
              </tr>
            </thead>
            <tbody>
              {citas.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    <i className="bi bi-check-circle fs-4 d-block mb-2"></i>
                    No hay citas canceladas
                  </td>
                </tr>
              ) : (
                citas.map((cita) => (
                  <tr key={cita.id}>
                    <td className="fw-medium">{cita.pacienteNombre}</td>
                    <td className="text-muted">{cita.doctorNombre}</td>
                    <td>
                      <span className="badge bg-secondary rounded-pill">{cita.especialidad}</span>
                    </td>
                    <td className="text-muted small">{formatearFecha(cita.fechaHora)}</td>
                    <td>
                      <small className="text-muted" title={cita.motivoCancelacion}>
                        {cita.motivoCancelacion 
                          ? (cita.motivoCancelacion.length > 40 
                              ? cita.motivoCancelacion.substring(0, 40) + '...' 
                              : cita.motivoCancelacion)
                          : 'Sin motivo'}
                      </small>
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
