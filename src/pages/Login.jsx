import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

export default function Login() {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(rut, password);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('rol', res.data.rol);
      if (res.data.rol === 'ADMIN') navigate('/admin');
      else if (res.data.rol === 'DOCTOR') navigate('/doctor');
    } catch {
      setError('RUT o contraseña incorrectos');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🏥 RedNorte</h1>
        <p style={styles.subtitle}>Sistema de Gestión Hospitalaria</p>
        <form onSubmit={handleLogin}>
          <input style={styles.input} placeholder="RUT (ej: 12345678-9)"
            value={rut} onChange={e => setRut(e.target.value)} />
          <input style={styles.input} type="password" placeholder="Contraseña"
            value={password} onChange={e => setPassword(e.target.value)} />
          {error && <p style={styles.error}>{error}</p>}
          <button style={styles.btn} type="submit">Ingresar</button>
        </form>
        <hr style={styles.hr} />
        <p style={styles.link}>¿Eres paciente?</p>
        <button style={styles.btnSecondary}
          onClick={() => navigate('/paciente')}>
          Consultar mi estado
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
  hr: { borderColor:'#334155', margin:'1rem 0' },
  link: { color:'#94a3b8', textAlign:'center', fontSize:'13px', margin:'0 0 8px' }
};