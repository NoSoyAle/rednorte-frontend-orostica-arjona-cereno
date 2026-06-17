import { useState, useCallback, useEffect } from 'react';
import { getUsers, deleteUser, getDashboardKpis } from '../services/userService';
import Swal from 'sweetalert2';

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchKpis = useCallback(async () => {
    try {
      const data = await getDashboardKpis();
      setKpis(data);
    } catch {
      setKpis(null);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchKpis();
  }, [fetchUsers, fetchKpis]);

  const handleDelete = useCallback(async (id, nombre) => {
    const result = await Swal.fire({
      title: 'Eliminar usuario',
      text: `¿Estás seguro de eliminar a "${nombre}"?`,
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
        setUsers((prev) => prev.filter((u) => u.id !== id));
        Swal.fire({
          title: 'Eliminado',
          text: 'El usuario fue eliminado correctamente.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      } catch {
        Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
      }
    }
  }, []);

  const filteredUsers = users.filter((u) => {
    const term = search.toLowerCase();
    return (
      u.nombre?.toLowerCase().includes(term) ||
      u.rut?.toLowerCase().includes(term)
    );
  });

  return {
    users: filteredUsers,
    allUsers: users,
    kpis,
    loading,
    search,
    setSearch,
    fetchUsers,
    fetchKpis,
    handleDelete,
  };
}
