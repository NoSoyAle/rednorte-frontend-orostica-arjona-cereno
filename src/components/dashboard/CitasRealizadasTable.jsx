import { useState, useEffect } from 'react';
import { citasService } from '../../services/citasService';

export default function CitasRealizadasTable() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarCitas = async () => {
      try {
        const data = await citasService.obtenerCitasRealizadas();
        setCitas(data);
      } catch (error) {
        console.error('Error al cargar citas realizadas:', error);
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
          <i className="bi bi-check-circle text-success me-2"></i>
          Citas Realizadas
          <span className="badge bg-success ms-2">{citas.length}</span>
        </h5>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="text-muted small fw-semibold">Paciente</th>
                <th className="text-muted small fw-semibold">Doctor</th>
                <th className="text-muted small fw-semibold">Especialidad</th>
                <th className="text-muted small fw-semibold">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {citas.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center text-muted py-4">
                    <i className="bi bi-calendar-x fs-4 d-block mb-2"></i>
                    No hay citas realizadas
                  </td>
                </tr>
              ) : (
                citas.map((cita) => (
                  <tr key={cita.id}>
                    <td className="fw-medium">{cita.pacienteNombre}</td>
                    <td className="text-muted">{cita.doctorNombre}</td>
                    <td>
                      <span className="badge rounded-pill" style={{ background: '#4d9f61' }}>{cita.especialidad}</span>
                    </td>
                    <td className="text-muted small">{formatearFecha(cita.fechaHora)}</td>
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
