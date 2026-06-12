import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import UserForm from './UserForm';

export default function UserModal({ show, onClose, onSubmit, initialData, loading }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (show) {
      document.body.classList.add('modal-open');
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
    };
  }, [show]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && show) onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [show, onClose]);

  if (!show) return null;

  return createPortal(
    <>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
      <div
        ref={modalRef}
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        onClick={(e) => { if (e.target === modalRef.current) onClose(); }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">
          <div className="modal-content border-0 shadow" style={{ borderRadius: 12 }}>
            <div className="modal-header border-bottom">
              <h5 className="modal-title fw-bold" style={{ color: '#14213d' }}>
                <i className="bi bi-person-plus me-2" style={{ color: '#087f7a' }}></i>
                {initialData ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Cerrar"></button>
            </div>
            <div className="modal-body p-4">
              <UserForm
                onSubmit={onSubmit}
                onCancel={onClose}
                initialData={initialData}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
