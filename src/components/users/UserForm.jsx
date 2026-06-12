import { useForm } from 'react-hook-form';
import { validateRut, validateEmail, validatePhone, validatePassword } from '../../utils/helpers';

export default function UserForm({ onSubmit, onCancel, initialData, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: initialData || {
      nombre: '',
      rut: '',
      email: '',
      password: '',
      confirmPassword: '',
      telefono: '',
      rol: 'DOCTOR',
      estado: 'ACTIVO',
    },
  });

  const password = watch('password');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label fw-semibold">Nombre completo *</label>
        <input
          type="text"
          className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
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
            className={`form-control ${errors.rut ? 'is-invalid' : ''}`}
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
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
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
            className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
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
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
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

      {!initialData && (
        <div className="mb-3">
          <label className="form-label fw-semibold">Confirmar contraseña *</label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            placeholder="Repite la contraseña"
            {...register('confirmPassword', {
              required: 'Debes confirmar la contraseña',
              validate: (value) => value === password || 'Las contraseñas no coinciden',
            })}
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
        </div>
      )}

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Rol *</label>
          <select className="form-select" {...register('rol', { required: 'El rol es obligatorio' })}>
            <option value="DOCTOR">Doctor</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Estado *</label>
          <select className="form-select" {...register('estado', { required: 'El estado es obligatorio' })}>
            <option value="ACTIVO">Activo</option>
            <option value="INACTIVO">Inactivo</option>
          </select>
        </div>
      </div>

      <div className="d-flex gap-2 justify-content-end mt-4">
        <button type="button" className="btn btn-outline-secondary" onClick={onCancel} disabled={loading}>
          Cancelar
        </button>
        <button type="submit" className="btn text-white" disabled={loading} style={{ background: '#087f7a' }}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}
