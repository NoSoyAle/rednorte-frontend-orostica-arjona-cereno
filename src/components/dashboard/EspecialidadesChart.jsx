import { useState, useEffect } from 'react';
import { citasService } from '../../services/citasService';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function EspecialidadesChart() {
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        const data = await citasService.obtenerEstadisticas();
        setEstadisticas(data);
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
      } finally {
        setLoading(false);
      }
    };
    cargarEstadisticas();
  }, []);

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

  if (!estadisticas || !estadisticas.especialidadesMasConfirmadas || Object.keys(estadisticas.especialidadesMasConfirmadas).length === 0) {
    return (
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h6 className="fw-bold mb-3" style={{ color: '#14213d' }}>
            <i className="bi bi-graph-up me-2" style={{ color: '#087f7a' }}></i>
            Especialidades Más Solicitadas
          </h6>
          <div className="d-flex justify-content-center align-items-center text-muted" style={{ height: 200 }}>
            <p className="mb-0">No hay datos disponibles</p>
          </div>
        </div>
      </div>
    );
  }

  const especialidades = Object.keys(estadisticas.especialidadesMasConfirmadas);
  const cantidades = Object.values(estadisticas.especialidadesMasConfirmadas);

  const data = {
    labels: especialidades,
    datasets: [
      {
        label: 'Citas Realizadas',
        data: cantidades,
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
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#5f6f7f',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        ticks: {
          color: '#5f6f7f',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h6 className="fw-bold mb-3" style={{ color: '#14213d' }}>
          <i className="bi bi-graph-up me-2" style={{ color: '#087f7a' }}></i>
          Especialidades Más Solicitadas
        </h6>
        <div style={{ height: 260 }}>
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
