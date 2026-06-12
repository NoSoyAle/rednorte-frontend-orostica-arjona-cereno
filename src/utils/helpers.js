export const formatRut = (rut) => {
  return rut.replace(/^0+|[^0-9kK]/g, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export const validateRut = (rut) => {
  const cleaned = rut.replace(/[^0-9kK]/g, '');
  return cleaned.length >= 8 && cleaned.length <= 9;
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^\+56\d{9}$/;
  return re.test(phone);
};

export const validatePassword = (password) => {
  if (!password || password.length < 8) {
    return 'Mínimo 8 caracteres';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Debe contener al menos una letra mayúscula';
  }
  if (!/[a-z]/.test(password)) {
    return 'Debe contener al menos una letra minúscula';
  }
  if (!/[0-9]/.test(password)) {
    return 'Debe contener al menos un número';
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return 'Debe contener al menos un carácter especial (!@#$%^&*...)';
  }
  return true;
};

export const getRolBadgeClass = (rol) => {
  if (rol === 'ADMIN' || rol === 'ADMINISTRADOR') return 'bg-primary';
  if (rol === 'DOCTOR') return 'bg-success';
  return 'bg-secondary';
};

export const getEstadoBadgeClass = (estado) => {
  if (estado === 'ACTIVO') return 'bg-success';
  if (estado === 'INACTIVO') return 'bg-secondary';
  return 'bg-warning text-dark';
};
