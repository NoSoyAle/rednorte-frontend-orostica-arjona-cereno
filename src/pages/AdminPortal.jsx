import { useNavigate } from 'react-router-dom';

export default function AdminPortal() {
  const navigate = useNavigate();
  const cerrar = () => { localStorage.clear(); navigate('/'); };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🏥 RedNorte</h2>
        <p style={styles.rol}>ADMIN</p>
        <nav style={styles.nav}>
          <button style={styles.navBtn}>📋 Pacientes</button>
          <button style={styles.navBtn}>📅 Lista de Espera</button>
          <button style={styles.navBtn}>🏥 Agenda</button>
          <button style={styles.navBtn}>🔔 Notificaciones</button>
        </nav>
        <button style={styles.logout} onClick={cerrar}>Cerrar sesión</button>
      </div>
      <div style={styles.main}>
        <h1 style={styles.title}>Bienvenido, Administrador</h1>
        <div style={styles.grid}>
          <div style={styles.card}><h3>👥 Pacientes</h3><p style={styles.num}>--</p></div>
          <div style={styles.card}><h3>⏳ En espera</h3><p style={styles.num}>--</p></div>
          <div style={styles.card}><h3>📅 Citas hoy</h3><p style={styles.num}>--</p></div>
          <div style={styles.card}><h3>✅ Atendidos</h3><p style={styles.num}>--</p></div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display:'flex', minHeight:'100vh', background:'#0f172a' },
  sidebar: { width:'220px', background:'#1e293b', padding:'1.5rem',
    display:'flex', flexDirection:'column' },
  logo: { color:'#38bdf8', margin:'0 0 4px' },
  rol: { color:'#64748b', fontSize:'12px', marginBottom:'2rem' },
  nav: { display:'flex', flexDirection:'column', gap:'8px', flex:1 },
  navBtn: { background:'transparent', color:'#94a3b8', border:'none',
    padding:'10px', textAlign:'left', borderRadius:'8px', cursor:'pointer',
    fontSize:'14px' },
  logout: { background:'#7f1d1d', color:'#fca5a5', border:'none',
    padding:'10px', borderRadius:'8px', cursor:'pointer' },
  main: { flex:1, padding:'2rem' },
  title: { color:'white', marginBottom:'2rem' },
  grid: { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem' },
  card: { background:'#1e293b', padding:'1.5rem', borderRadius:'12px',
    color:'white' },
  num: { color:'#38bdf8', fontSize:'2rem', fontWeight:'bold', margin:0 }
};