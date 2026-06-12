import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function UserDistributionChart({ kpis, loading }) {
  if (loading) {
    return (
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body">
          <div className="placeholder-glow d-flex justify-content-center align-items-center" style={{ height: 260 }}>
            <div className="placeholder rounded-circle" style={{ width: 200, height: 200 }}></div>
          </div>
        </div>
      </div>
    );
  }

  const roles = kpis?.usuariosPorRol || {};
  const labels = Object.keys(roles);
  const data = Object.values(roles);

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: ['#087f7a', '#4d9f61', '#d88c1f', '#b42318'],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 16,
          usePointStyle: true,
          pointStyleWidth: 10,
          font: { size: 12, family: 'Segoe UI, Arial, sans-serif' },
          color: '#5f6f7f',
        },
      },
    },
  };

  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <h6 className="card-title fw-bold mb-3" style={{ color: '#14213d' }}>
          <i className="bi bi-pie-chart me-2" style={{ color: '#087f7a' }}></i>
          Distribución por Rol
        </h6>
        <div style={{ height: 260 }}>
          {data.length > 0 ? (
            <Doughnut data={chartData} options={options} />
          ) : (
            <div className="d-flex justify-content-center align-items-center h-100 text-muted">
              <p className="mb-0">No hay datos disponibles</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
