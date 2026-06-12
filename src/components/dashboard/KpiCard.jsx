export default function KpiCard({ title, value, icon, color, loading }) {
  if (loading) {
    return (
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body d-flex align-items-center gap-3">
          <div className="placeholder-glow">
            <span className="placeholder rounded-circle" style={{ width: 48, height: 48 }}></span>
          </div>
          <div className="flex-grow-1">
            <div className="placeholder-glow">
              <span className="placeholder col-8 mb-1"></span>
              <span className="placeholder col-4" style={{ height: 24 }}></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const colorMap = {
    primary: { bg: '#eef6f4', text: '#087f7a' },
    warning: { bg: '#fef3cd', text: '#d88c1f' },
    success: { bg: '#e8f5e9', text: '#4d9f61' },
    danger: { bg: '#fde8e7', text: '#b42318' },
  };

  const colors = colorMap[color] || colorMap.primary;

  return (
    <div className="card border-0 shadow-sm h-100 kpi-card">
      <div className="card-body d-flex align-items-center gap-3">
        <div
          className="rounded-3 d-grid"
          style={{
            width: 48,
            height: 48,
            background: colors.bg,
            color: colors.text,
            placeItems: 'center',
            fontSize: 22,
          }}
        >
          <i className={`bi ${icon}`}></i>
        </div>
        <div>
          <p className="text-muted small mb-1">{title}</p>
          <h3 className="fw-bold mb-0" style={{ color: '#14213d', fontSize: 28 }}>
            {value ?? 0}
          </h3>
        </div>
      </div>
    </div>
  );
}
