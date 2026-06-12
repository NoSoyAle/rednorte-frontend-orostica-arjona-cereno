import { useState, useMemo } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import UserTable from '../components/users/UserTable';
import UserModal from '../components/users/UserModal';
import useUsers from '../hooks/useUsers';
import { createUser, updateUserStatus } from '../services/userService';

export default function Users() {
  const { users, loading, search, setSearch, handleDelete, fetchUsers } = useUsers();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return users.slice(start, start + perPage);
  }, [users, currentPage]);

  const totalPages = Math.ceil(users.length / perPage);

  const onCreateUser = async (data) => {
    console.log('Datos del formulario:', data);
    setSaving(true);
    try {
      await createUser({
        nombre: data.nombre,
        rut: data.rut,
        email: data.email,
        password: data.password,
        telefono: data.telefono,
        rol: data.rol,
        estado: data.estado,
      });
      setModalOpen(false);
      fetchUsers();
      Swal.fire({
        icon: 'success',
        title: 'Usuario creado',
        text: `${data.nombre} fue registrado exitosamente.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error('Error completo:', err);
      const msg = err.response?.data?.message || err.message || 'Error al crear el usuario';
      Swal.fire('Error', msg, 'error');
    } finally {
      setSaving(false);
    }
  };

  const onViewUser = (user) => {
    Swal.fire({
      title: user.nombre,
      html: `
        <div style="text-align:left; font-size:14px;">
          <p><strong>RUT:</strong> ${user.rut}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Teléfono:</strong> ${user.telefono || 'N/A'}</p>
          <p><strong>Rol:</strong> ${user.rol}</p>
          <p><strong>Estado:</strong> ${user.estado}</p>
        </div>
      `,
      confirmButtonColor: '#087f7a',
    });
  };

  const onToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    const action = newStatus === 'ACTIVO' ? 'activar' : 'desactivar';
    
    const result = await Swal.fire({
      title: `¿${action.charAt(0).toUpperCase() + action.slice(1)} usuario?`,
      text: `El usuario cambiará a estado ${newStatus}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#087f7a',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await updateUserStatus(id, newStatus);
        fetchUsers();
        Swal.fire({
          title: 'Estado actualizado',
          text: `El usuario ahora está ${newStatus}`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (err) {
        const msg = err.response?.data?.message || 'Error al actualizar el estado';
        Swal.fire('Error', msg, 'error');
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
              <h4 className="fw-bold mb-1" style={{ color: '#14213d' }}>Gestión de Usuarios</h4>
              <p className="text-muted mb-0">{users.length} usuario(s) encontrado(s)</p>
            </div>
            <button
              className="btn text-white fw-semibold"
              style={{ background: '#087f7a' }}
              onClick={() => setModalOpen(true)}
            >
              <i className="bi bi-plus-lg me-1"></i> Nuevo Usuario
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

          <UserTable
            users={paginatedUsers}
            loading={loading}
            onDelete={handleDelete}
            onView={onViewUser}
            onToggleStatus={onToggleStatus}
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

      {modalOpen && (
        <UserModal
          show={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
          onSubmit={onCreateUser}
          loading={saving}
        />
      )}
    </div>
  );
}
