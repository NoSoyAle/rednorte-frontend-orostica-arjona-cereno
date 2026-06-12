export default function Footer() {
  return (
    <footer className="bg-white border-top mt-auto py-3">
      <div className="container-fluid px-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p className="text-muted small mb-0">
            &copy; 2026 Clínica RedNorte. Todos los derechos reservados.
          </p>
          <div className="d-flex gap-3">
            <a href="#" className="text-muted small text-decoration-none">Contacto</a>
            <a href="#" className="text-muted small text-decoration-none">Soporte</a>
            <span className="text-muted small">v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
