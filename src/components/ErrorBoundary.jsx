import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="d-flex align-items-center justify-content-center flex-column" style={{ minHeight: '100vh', background: '#f7fbfb' }}>
          <div className="card border-0 shadow-sm p-4" style={{ maxWidth: 500, borderRadius: 12 }}>
            <div className="text-center">
              <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: 48 }}></i>
              <h4 className="fw-bold mt-3" style={{ color: '#14213d' }}>Algo salió mal</h4>
              <p className="text-muted mb-3">
                {this.state.error?.message || 'Error inesperado en la aplicación'}
              </p>
              <button
                className="btn text-white"
                style={{ background: '#087f7a' }}
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.href = '/login';
                }}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Volver al inicio
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
