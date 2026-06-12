import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import DoctorTable from '../components/doctors/DoctorTable';
import { getDoctors } from '../services/doctorService';
import { deleteUser } from '../services/userService';

export default function Doctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch {
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return doctors.filter(
      (d) => d.nombre?.toLowerCase().includes(term) || d.rut?.toLowerCase().includes(term)
    );
  }, [doctors, search]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, currentPage]);

  const totalPages = Math.ceil(filtered.length / perPage);

  const handleDelete = async (id, nombre) => {
    const result = await Swal.fire({
      title: 'Eliminar doctor',
      text: `¿Estás seguro de eliminar al Dr. "${nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#b42318',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(id);
        setDoctors((prev) => prev.filter((d) => d.id !== id));
        Swal.fire({
          title: 'Eliminado',
          text: 'El doctor fue eliminado correctamente.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      } catch {
        Swal.fire('Error', 'No se pudo eliminar al doctor.', 'error');
      }
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh', background: '#f7fbfb' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-grow-1 d-flex flex-column">
        <Navbar onToggleSidebar={() => setSidebarOpen((o) => !o)} />

        <main className="flex-grow-1 p-3 p-md-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
            <div>
              <h4 className="fw-bold mb-1" style={{ color: '#14213d' }}>Gestión de Doctores</h4>
              <p className="text-muted mb-0">{filtered.length} doctor(es) encontrado(s)</p>
            </div>
            <button
              className="btn text-white fw-semibold"
              style={{ background: '#087f7a' }}
              onClick={() => navigate('/doctors/new')}
            >
              <i className="bi bi-person-plus me-1"></i> Registrar Doctor
            </button>
          </div>

          <div className="card border-0 shadow-sm mb-3">
            <div className="card-body py-3">
              <div className="input-group" style={{ maxWidth: 400 }}>
                <span className="input-group-text bg-white">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nombre o RUT..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>
          </div>

          <DoctorTable
            doctors={paginated}
            loading={loading}
            onDelete={handleDelete}
          />

          {totalPages > 1 && (
            <nav className="mt-3 d-flex justify-content-center">
              <ul className="pagination pagination-sm">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage((p) => p - 1)}>
                    Anterior
                  </button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage((p) => p + 1)}>
                    Siguiente
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}
