import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export default function Register() {
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    if (!rut || !nombre || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const res = await authService.register(rut, nombre, password);
      setMensaje(res.data.message || 'Registro exitoso');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Error al registrar usuario';
      setError(msg);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>RedNorte</h1>
        <p style={styles.subtitle}>Crear cuenta</p>
        <form onSubmit={handleRegister}>
          <input style={styles.input} placeholder="RUT (ej: 12345678-9)"
            value={rut} onChange={e => setRut(e.target.value)} />
          <input style={styles.input} placeholder="Nombre completo"
            value={nombre} onChange={e => setNombre(e.target.value)} />
          <input style={styles.input} type="password" placeholder="Contraseña"
            value={password} onChange={e => setPassword(e.target.value)} />
          <input style={styles.input} type="password" placeholder="Confirmar contraseña"
            value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          {error && <p style={styles.error}>{error}</p>}
          {mensaje && <p style={styles.success}>{mensaje}</p>}
          <button style={styles.btn} type="submit">Registrarse</button>
        </form>
        <hr style={styles.hr} />
        <p style={styles.link}>¿Ya tienes cuenta?</p>
        <button style={styles.btnSecondary} onClick={() => navigate('/')}>
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight:'100vh', display:'flex', alignItems:'center',
    justifyContent:'center', background:'#0f172a' },
  card: { background:'#1e293b', padding:'2rem', borderRadius:'12px',
    width:'360px', boxShadow:'0 8px 32px rgba(0,0,0,0.4)' },
  title: { color:'#38bdf8', textAlign:'center', margin:0, fontSize:'1.8rem' },
  subtitle: { color:'#94a3b8', textAlign:'center', marginBottom:'1.5rem' },
  input: { width:'100%', padding:'10px', margin:'8px 0', borderRadius:'8px',
    border:'1px solid #334155', background:'#0f172a', color:'white',
    fontSize:'14px', boxSizing:'border-box' },
  btn: { width:'100%', padding:'12px', background:'#0ea5e9', color:'white',
    border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'16px',
    marginTop:'8px' },
  btnSecondary: { width:'100%', padding:'10px', background:'transparent',
    color:'#38bdf8', border:'1px solid #38bdf8', borderRadius:'8px',
    cursor:'pointer', fontSize:'14px' },
  error: { color:'#f87171', fontSize:'13px', textAlign:'center' },
  success: { color:'#4ade80', fontSize:'13px', textAlign:'center' },
  hr: { borderColor:'#334155', margin:'1rem 0' },
  link: { color:'#94a3b8', textAlign:'center', fontSize:'13px', margin:'0 0 8px' }
};