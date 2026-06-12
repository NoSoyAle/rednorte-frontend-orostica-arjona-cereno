import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { registerDoctor } from '../services/doctorService';
import DoctorForm from '../components/doctors/DoctorForm';

export default function DoctorNew() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerDoctor({
        nombre: data.nombre,
        rut: data.rut,
        email: data.email,
        password: data.password,
        telefono: data.telefono,
      });
      Swal.fire({
        icon: 'success',
        title: 'Doctor registrado',
        text: `${data.nombre} fue registrado exitosamente.`,
        timer: 2000,
        showConfirmButton: false,
      });
      setTimeout(() => {
        window.location.href = '/doctors';
      }, 2000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al registrar el doctor. Verifica que el RUT y email no estén duplicados.';
      Swal.fire('Error', msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f7fbfb' }}>
      <div className="container py-4 py-md-5" style={{ maxWidth: 800 }}>
        <button
          className="btn btn-link text-decoration-none p-0 mb-3"
          onClick={() => navigate('/doctors')}
          style={{ color: '#087f7a' }}
        >
          <i className="bi bi-arrow-left me-1"></i> Volver a Doctores
        </button>

        <DoctorForm
          onSubmit={onSubmit}
          onCancel={() => navigate('/doctors')}
          loading={loading}
        />
      </div>
    </div>
  );
}
