import { useForm } from 'react-hook-form';
import { validateRut, validateEmail, validatePhone, validatePassword } from '../../utils/helpers';

export default function DoctorForm({ onSubmit, onCancel, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      nombre: '',
      rut: '',
      email: '',
      password: '',
      confirmPassword: '',
      telefono: '',
    },
  });

  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3 shadow-sm p-4 p-md-5">
      <h4 className="fw-bold mb-4" style={{ color: '#14213d' }}>
        <i className="bi bi-person-plus me-2" style={{ color: '#087f7a' }}></i>
        Registrar Nuevo Doctor
      </h4>

      <div className="mb-3">
        <label className="form-label fw-semibold">Nombre completo *</label>
        <input
          type="text"
          className={`form-control form-control-lg ${errors.nombre ? 'is-invalid' : ''}`}
          placeholder="Ej: Dr. Juan Pérez"
          {...register('nombre', { required: 'El nombre es obligatorio' })}
        />
        {errors.nombre && <div className="invalid-feedback">{errors.nombre.message}</div>}
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">RUT *</label>
          <input
            type="text"
            className={`form-control form-control-lg ${errors.rut ? 'is-invalid' : ''}`}
            placeholder="12345678-9"
            {...register('rut', {
              required: 'El RUT es obligatorio',
              validate: (value) => validateRut(value) || 'Formato de RUT inválido',
            })}
          />
          {errors.rut && <div className="invalid-feedback">{errors.rut.message}</div>}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Email *</label>
          <input
            type="email"
            className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
            placeholder="juan.perez@rednorte.cl"
            {...register('email', {
              required: 'El email es obligatorio',
              validate: (value) => validateEmail(value) || 'Formato de email inválido',
            })}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Teléfono *</label>
          <input
            type="text"
            className={`form-control form-control-lg ${errors.telefono ? 'is-invalid' : ''}`}
            placeholder="+56912345678"
            {...register('telefono', {
              required: 'El teléfono es obligatorio',
              validate: (value) => validatePhone(value) || 'Formato: +56XXXXXXXXX',
            })}
          />
          {errors.telefono && <div className="invalid-feedback">{errors.telefono.message}</div>}
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Contraseña *</label>
          <input
            type="password"
            className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Ej: Admin@123"
            {...register('password', {
              required: 'La contraseña es obligatoria',
              validate: validatePassword,
            })}
          />
          <small className="text-muted">Mín. 8 caracteres, mayúscula, minúscula, número y especial</small>
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Confirmar contraseña *</label>
        <input
          type="password"
          className={`form-control form-control-lg ${errors.confirmPassword ? 'is-invalid' : ''}`}
          placeholder="Repite la contraseña"
          {...register('confirmPassword', {
            required: 'Debes confirmar la contraseña',
            validate: (value) => value === password || 'Las contraseñas no coinciden',
          })}
        />
        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
      </div>

      <div className="d-flex gap-2 justify-content-end mt-4 pt-3 border-top">
        <button type="button" className="btn btn-outline-secondary btn-lg" onClick={onCancel} disabled={loading}>
          <i className="bi bi-x-lg me-1"></i> Cancelar
        </button>
        <button type="submit" className="btn btn-lg text-white" disabled={loading} style={{ background: '#087f7a' }}>
          {loading ? 'Registrando...' : 'Registrar Doctor'}
        </button>
      </div>
    </form>
  );
}
