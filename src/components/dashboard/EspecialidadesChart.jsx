import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function EspecialidadesChart({ especialidades = [], loading }) {
  if (loading) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="placeholder-glow d-flex justify-content-center align-items-center" style={{ height: 260 }}>
            <div className="placeholder rounded" style={{ width: '100%', height: 200 }}></div>
          </div>
        </div>
      </div>
    );
  }

  const sorted = [...especialidades].sort((a, b) => b.totalCitasConfirmadas - a.totalCitasConfirmadas);

  if (sorted.length === 0) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h6 className="fw-bold mb-3" style={{ color: '#14213d' }}>
            <i className="bi bi-graph-up me-2" style={{ color: '#087f7a' }}></i>
            Especialidades - Mayor Confirmación
          </h6>
          <div className="d-flex justify-content-center align-items-center text-muted" style={{ height: 200 }}>
            <p className="mb-0">No hay datos disponibles</p>
          </div>
        </div>
      </div>
    );
  }

  const labels = sorted.map((e) => e.nombreEspecialidad || `Especialidad ${e.especialidadId}`);
  const values = sorted.map((e) => e.totalCitasConfirmadas);

  const data = {
    labels,
    datasets: [
      {
        label: 'Citas Confirmadas',
        data: values,
        backgroundColor: 'rgba(8, 127, 122, 0.8)',
        borderColor: 'rgba(8, 127, 122, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { stepSize: 1, color: '#5f6f7f' },
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
      },
      y: {
        ticks: { color: '#5f6f7f' },
        grid: { display: false },
      },
    },
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h6 className="fw-bold mb-3" style={{ color: '#14213d' }}>
          <i className="bi bi-graph-up me-2" style={{ color: '#087f7a' }}></i>
          Especialidades - Mayor Confirmación
        </h6>
        <div style={{ height: Math.max(260, sorted.length * 50) }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
