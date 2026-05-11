import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

// ── VISTAS ──────────────────────────────────────────────

function DashboardView({ totalEspera, ocupacion, pacientes, notificados, reasignar, notificar, chartRef }) {
  const centrosCriticos = [
    { nombre:'H. Regional Norte', esp:'Traumatología', pct:97 },
    { nombre:'CESFAM Independencia', esp:'Medicina General', pct:95 },
    { nombre:'H. San José', esp:'Cardiología', pct:93 },
    { nombre:'CDT Recoleta', esp:'Neurología', pct:91 },
    { nombre:'H. Clínico Norte', esp:'Pediatría', pct:90 },
  ];
  const badgeColor = (p) => {
    if (p==='Alta') return { background:'#450a0a', color:'#fca5a5' };
    if (p==='Media') return { background:'#451a03', color:'#fcd34d' };
    return { background:'#14532d', color:'#86efac' };
  };
  const diasColor = (p) => p==='Alta'?'#f87171': p==='Media'?'#fbbf24':'#94a3b8';
  const alertColor = (pct) => pct >= 93
    ? { bg:'#450a0a', color:'#fca5a5' }
    : { bg:'#451a03', color:'#fcd34d' };

  return (
    <div>
      <p style={s.sectionLabel}>indicadores clave</p>
      <div style={s.kpiGrid}>
        <div style={s.kpiCard}>
          <p style={s.kpiLabel}>Total en espera</p>
          <p style={{...s.kpiValue, color:'#fff'}}>{totalEspera}</p>
          <p style={{...s.kpiDelta, color:'#f87171'}}>↑ +12 desde ayer</p>
        </div>
        <div style={s.kpiCard}>
          <p style={s.kpiLabel}>Tiempo medio de espera</p>
          <p style={{...s.kpiValue, color:'#fbbf24'}}>18 d</p>
          <p style={{...s.kpiDelta, color:'#fbbf24'}}>↑ +3 días vs. meta</p>
        </div>
        <div style={s.kpiCard}>
          <p style={s.kpiLabel}>% Ocupación global</p>
          <p style={{...s.kpiValue, color:'#f87171'}}>{ocupacion}%</p>
          <p style={{...s.kpiDelta, color:'#f87171'}}>⚠ Sobre umbral crítico</p>
        </div>
        <div style={s.kpiCard}>
          <p style={s.kpiLabel}>Tasa de inasistencia</p>
          <p style={{...s.kpiValue, color:'#fff'}}>8.4%</p>
          <p style={{...s.kpiDelta, color:'#4ade80'}}>↓ -1.2% vs. semana ant.</p>
        </div>
      </div>

      <div style={s.grid2}>
        <div style={s.card}>
          <p style={s.cardTitle}>Flujo de pacientes — últimas 8 horas</p>
          <div style={{display:'flex', gap:16, marginBottom:12}}>
            <span style={s.legend}><span style={{...s.legendDot, background:'#378ADD'}}></span>Ingresos</span>
            <span style={s.legend}><span style={{...s.legendDot, background:'#4ade80'}}></span>Atenciones</span>
          </div>
          <div style={{position:'relative', height:200}}>
            <canvas ref={chartRef} role="img" aria-label="Flujo de pacientes últimas 8 horas" />
          </div>
        </div>

        <div style={s.card}>
          <p style={s.cardTitle}>⚠ Centros críticos <span style={{fontSize:11, fontWeight:400, color:'#94a3b8'}}>— sobre 90%</span></p>
          {centrosCriticos.map((c, i) => {
            const col = alertColor(c.pct);
            return (
              <div key={i} style={{...s.alertItem, borderBottom: i < centrosCriticos.length-1 ? '0.5px solid #334155':'none'}}>
                <div>
                  <p style={{fontSize:13, color:'#e2e8f0', margin:0}}>{c.nombre}</p>
                  <p style={{fontSize:11, color:'#94a3b8', margin:0}}>{c.esp}</p>
                </div>
                <span style={{...s.badge, background:col.bg, color:col.color}}>{c.pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      <p style={s.sectionLabel}>gestión operativa — pacientes prioritarios</p>
      <div style={s.card}>
        <table style={s.table}>
          <thead>
            <tr>
              {['Nombre','Especialidad','Prioridad','Tiempo','Acción'].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p, i) => (
              <tr key={p.id}>
                <td style={{...s.td, borderBottom: i < pacientes.length-1 ? '0.5px solid #334155':'none'}}>{p.nombre}</td>
                <td style={{...s.td, color:'#94a3b8', borderBottom: i < pacientes.length-1 ? '0.5px solid #334155':'none'}}>{p.esp}</td>
                <td style={{...s.td, borderBottom: i < pacientes.length-1 ? '0.5px solid #334155':'none'}}>
                  <span style={{...s.badge, ...badgeColor(p.prioridad)}}>{p.prioridad}</span>
                </td>
                <td style={{...s.td, color:diasColor(p.prioridad), fontWeight:500, borderBottom: i < pacientes.length-1 ? '0.5px solid #334155':'none'}}>{p.dias} días</td>
                <td style={{...s.td, borderBottom: i < pacientes.length-1 ? '0.5px solid #334155':'none'}}>
                  <div style={{display:'flex', gap:6}}>
                    <button style={s.actionBtn} onClick={() => reasignar(p.id)}>Reasignar</button>
                    <button style={{...s.actionBtn, color: notificados.includes(p.id)?'#4ade80':'#94a3b8', borderColor: notificados.includes(p.id)?'#4ade80':'#475569'}}
                      onClick={() => notificar(p.id)}>
                      {notificados.includes(p.id) ? '✓ Notificado' : 'Notificar'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PacientesView() {
  const lista = [
    { id:1, nombre:'Carlos González', rut:'11111111-1', email:'carlos@email.com', telefono:'+56912345678', estado:'ACTIVO' },
    { id:2, nombre:'Ana Morales', rut:'22222222-2', email:'ana@email.com', telefono:'+56987654321', estado:'ACTIVO' },
    { id:3, nombre:'Luis Pinto', rut:'33333333-3', email:'luis@email.com', telefono:'+56911223344', estado:'INACTIVO' },
    { id:4, nombre:'Rosa Castillo', rut:'44444444-4', email:'rosa@email.com', telefono:'+56922334455', estado:'ACTIVO' },
    { id:5, nombre:'Pedro Soto', rut:'55555555-5', email:'pedro@email.com', telefono:'+56933445566', estado:'ACTIVO' },
  ];
  return (
    <div>
      <p style={{fontSize:20, fontWeight:500, color:'#e2e8f0', marginBottom:'1.5rem'}}>Pacientes registrados</p>
      <div style={s.card}>
        <table style={s.table}>
          <thead>
            <tr>{['Nombre','RUT','Email','Teléfono','Estado'].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {lista.map((p, i) => (
              <tr key={p.id}>
                <td style={{...s.td, borderBottom: i < lista.length-1 ? '0.5px solid #334155':'none'}}>{p.nombre}</td>
                <td style={{...s.td, color:'#94a3b8', borderBottom: i < lista.length-1 ? '0.5px solid #334155':'none'}}>{p.rut}</td>
                <td style={{...s.td, color:'#94a3b8', borderBottom: i < lista.length-1 ? '0.5px solid #334155':'none'}}>{p.email}</td>
                <td style={{...s.td, color:'#94a3b8', borderBottom: i < lista.length-1 ? '0.5px solid #334155':'none'}}>{p.telefono}</td>
                <td style={{...s.td, borderBottom: i < lista.length-1 ? '0.5px solid #334155':'none'}}>
                  <span style={{fontSize:11, padding:'3px 8px', borderRadius:99, background: p.estado==='ACTIVO'?'#14532d':'#450a0a', color: p.estado==='ACTIVO'?'#86efac':'#fca5a5'}}>{p.estado}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ListaEsperaView() {
  const lista = [
    { id:1, paciente:'Carlos González', especialidad:'Cardiología', prioridad:1, estado:'ESPERANDO', fecha:'2025-03-10' },
    { id:2, paciente:'Ana Morales', especialidad:'Neurología', prioridad:1, estado:'ESPERANDO', fecha:'2025-03-14' },
    { id:3, paciente:'Luis Pinto', especialidad:'Traumatología', prioridad:2, estado:'ESPERANDO', fecha:'2025-03-20' },
    { id:4, paciente:'Rosa Castillo', especialidad:'Medicina General', prioridad:2, estado:'ASIGNADO', fecha:'2025-03-25' },
    { id:5, paciente:'Pedro Soto', especialidad:'Pediatría', prioridad:3, estado:'CANCELADO', fecha:'2025-04-01' },
  ];
  const estadoColor = (e) => {
    if (e==='ESPERANDO') return { bg:'#451a03', color:'#fcd34d' };
    if (e==='ASIGNADO') return { bg:'#14532d', color:'#86efac' };
    return { bg:'#1e293b', color:'#94a3b8' };
  };
  const prioridadLabel = (p) => p===1?'Alta': p===2?'Media':'Baja';
  const prioridadColor = (p) => {
    if (p===1) return { bg:'#450a0a', color:'#fca5a5' };
    if (p===2) return { bg:'#451a03', color:'#fcd34d' };
    return { bg:'#14532d', color:'#86efac' };
  };
  return (
    <div>
      <p style={{fontSize:20, fontWeight:500, color:'#e2e8f0', marginBottom:'1.5rem'}}>Lista de espera</p>
      <div style={s.card}>
        <table style={s.table}>
          <thead>
            <tr>{['Paciente','Especialidad','Prioridad','Estado','Fecha ingreso'].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {lista.map((p, i) => {
              const ec = estadoColor(p.estado);
              const pc = prioridadColor(p.prioridad);
              return (
                <tr key={p.id}>
                  <td style={{...s.td, borderBottom: i < lista.length-1 ? '0.5px solid #334155':'none'}}>{p.paciente}</td>
                  <td style={{...s.td, color:'#94a3b8', borderBottom: i < lista.length-1 ? '0.5px solid #334155':'none'}}>{p.especialidad}</td>
                  <td style={{...s.td, borderBottom: i < lista.length-1 ? '0.5px solid #334155':'none'}}>
                    <span style={{fontSize:11, padding:'3px 8px', borderRadius:99, background:pc.bg, color:pc.color}}>{prioridadLabel(p.prioridad)}</span>
                  </td>
                  <td style={{...s.td, borderBottom: i < lista.length-1 ? '0.5px solid #334155':'none'}}>
                    <span style={{fontSize:11, padding:'3px 8px', borderRadius:99, background:ec.bg, color:ec.color}}>{p.estado}</span>
                  </td>
                  <td style={{...s.td, color:'#94a3b8', borderBottom: i < lista.length-1 ? '0.5px solid #334155':'none'}}>{p.fecha}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AgendaView() {
  const agenda = [
    { id:1, doctor:'Dr. Juan Pérez', especialidad:'Cardiología', fecha:'2025-05-10', inicio:'09:00', fin:'13:00', cupos:8, disponibles:3 },
    { id:2, doctor:'Dr. Juan Pérez', especialidad:'Cardiología', fecha:'2025-05-11', inicio:'14:00', fin:'18:00', cupos:8, disponibles:8 },
    { id:3, doctor:'Dra. María López', especialidad:'Neurología', fecha:'2025-05-12', inicio:'09:00', fin:'13:00', cupos:6, disponibles:1 },
    { id:4, doctor:'Dr. Carlos Rojas', especialidad:'Traumatología', fecha:'2025-05-13', inicio:'08:00', fin:'12:00', cupos:5, disponibles:5 },
  ];
  return (
    <div>
      <p style={{fontSize:20, fontWeight:500, color:'#e2e8f0', marginBottom:'1.5rem'}}>Agenda médica</p>
      <div style={s.card}>
        <table style={s.table}>
          <thead>
            <tr>{['Doctor','Especialidad','Fecha','Horario','Cupos'].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {agenda.map((a, i) => {
              const libre = a.disponibles / a.cupos;
              const cupoColor = libre===0?'#f87171': libre<0.3?'#fbbf24':'#4ade80';
              return (
                <tr key={a.id}>
                  <td style={{...s.td, borderBottom: i < agenda.length-1 ? '0.5px solid #334155':'none'}}>{a.doctor}</td>
                  <td style={{...s.td, color:'#94a3b8', borderBottom: i < agenda.length-1 ? '0.5px solid #334155':'none'}}>{a.especialidad}</td>
                  <td style={{...s.td, color:'#94a3b8', borderBottom: i < agenda.length-1 ? '0.5px solid #334155':'none'}}>{a.fecha}</td>
                  <td style={{...s.td, color:'#94a3b8', borderBottom: i < agenda.length-1 ? '0.5px solid #334155':'none'}}>{a.inicio} - {a.fin}</td>
                  <td style={{...s.td, color:cupoColor, fontWeight:500, borderBottom: i < agenda.length-1 ? '0.5px solid #334155':'none'}}>{a.disponibles}/{a.cupos}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NotificacionesView() {
  const notifs = [
    { id:1, paciente:'Carlos González', tipo:'EMAIL', asunto:'Confirmación de cita', estado:'ENVIADO', fecha:'2025-05-07' },
    { id:2, paciente:'Ana Morales', tipo:'SMS', asunto:'Recordatorio cita mañana', estado:'PENDIENTE', fecha:'2025-05-08' },
    { id:3, paciente:'Luis Pinto', tipo:'EMAIL', asunto:'Cita cancelada', estado:'ENVIADO', fecha:'2025-05-06' },
    { id:4, paciente:'Rosa Castillo', tipo:'SMS', asunto:'Nueva hora asignada', estado:'FALLIDO', fecha:'2025-05-05' },
  ];
  const estadoColor = (e) => {
    if (e==='ENVIADO') return { bg:'#14532d', color:'#86efac' };
    if (e==='PENDIENTE') return { bg:'#451a03', color:'#fcd34d' };
    return { bg:'#450a0a', color:'#fca5a5' };
  };
  return (
    <div>
      <p style={{fontSize:20, fontWeight:500, color:'#e2e8f0', marginBottom:'1.5rem'}}>Notificaciones</p>
      <div style={s.card}>
        <table style={s.table}>
          <thead>
            <tr>{['Paciente','Tipo','Asunto','Estado','Fecha'].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {notifs.map((n, i) => {
              const ec = estadoColor(n.estado);
              return (
                <tr key={n.id}>
                  <td style={{...s.td, borderBottom: i < notifs.length-1 ? '0.5px solid #334155':'none'}}>{n.paciente}</td>
                  <td style={{...s.td, borderBottom: i < notifs.length-1 ? '0.5px solid #334155':'none'}}>
                    <span style={{fontSize:11, padding:'3px 8px', borderRadius:99, background:'#1e3a5f', color:'#93c5fd'}}>{n.tipo}</span>
                  </td>
                  <td style={{...s.td, color:'#94a3b8', borderBottom: i < notifs.length-1 ? '0.5px solid #334155':'none'}}>{n.asunto}</td>
                  <td style={{...s.td, borderBottom: i < notifs.length-1 ? '0.5px solid #334155':'none'}}>
                    <span style={{fontSize:11, padding:'3px 8px', borderRadius:99, background:ec.bg, color:ec.color}}>{n.estado}</span>
                  </td>
                  <td style={{...s.td, color:'#94a3b8', borderBottom: i < notifs.length-1 ? '0.5px solid #334155':'none'}}>{n.fecha}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── COMPONENTE PRINCIPAL ─────────────────────────────────

export default function AdminPortal() {
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [vista, setVista] = useState('dashboard');
  const [pacientes, setPacientes] = useState([
    { id:1, nombre:'Carlos González', esp:'Cardiología', prioridad:'Alta', dias:32 },
    { id:2, nombre:'Ana Morales', esp:'Neurología', prioridad:'Alta', dias:28 },
    { id:3, nombre:'Luis Pinto', esp:'Traumatología', prioridad:'Media', dias:21 },
    { id:4, nombre:'Rosa Castillo', esp:'Medicina General', prioridad:'Media', dias:18 },
    { id:5, nombre:'Pedro Soto', esp:'Pediatría', prioridad:'Baja', dias:9 },
  ]);
  const [notificados, setNotificados] = useState([]);
  const [totalEspera, setTotalEspera] = useState(284);
  const [ocupacion] = useState(91);

  const cerrar = () => { localStorage.clear(); navigate('/'); };

  const reasignar = (id) => {
    setPacientes(prev => prev.filter(p => p.id !== id));
    setTotalEspera(prev => prev - 1);
    alert('✅ Paciente reasignado exitosamente');
  };

  const notificar = (id) => {
    setNotificados(prev => [...prev, id]);
    alert('📩 Notificación enviada al paciente');
  };

  useEffect(() => {
    if (vista !== 'dashboard') return;
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js';
    script.onload = () => {
      if (chartRef.current) {
        if (chartInstance.current) chartInstance.current.destroy();
        chartInstance.current = new window.Chart(chartRef.current, {
          type: 'line',
          data: {
            labels: ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00'],
            datasets: [
              { label:'Ingresos', data:[12,19,28,35,22,18,25,31], borderColor:'#378ADD', backgroundColor:'rgba(55,138,221,0.08)', borderWidth:2, pointRadius:3, tension:0.4, fill:true },
              { label:'Atenciones', data:[8,14,22,30,26,20,18,24], borderColor:'#4ade80', backgroundColor:'transparent', borderWidth:2, borderDash:[5,3], pointRadius:3, tension:0.4, fill:false }
            ]
          },
          options: {
            responsive:true, maintainAspectRatio:false,
            plugins:{ legend:{ display:false } },
            scales: {
              x:{ ticks:{ font:{size:11}, color:'#888780' }, grid:{ color:'rgba(136,135,128,0.15)' } },
              y:{ ticks:{ font:{size:11}, color:'#888780' }, grid:{ color:'rgba(136,135,128,0.15)' }, min:0 }
            }
          }
        });
      }
    };
    if (!window.Chart) document.head.appendChild(script);
    else script.onload();
    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, [vista]);

  const navItems = [
    { key:'dashboard', label:'📊 Dashboard' },
    { key:'pacientes', label:'📋 Pacientes' },
    { key:'espera', label:'⏳ Lista de Espera' },
    { key:'agenda', label:'🏥 Agenda' },
    { key:'notificaciones', label:'🔔 Notificaciones' },
  ];

  return (
    <div style={s.page}>
      <div style={s.sidebar}>
        <div>
          <h2 style={s.logo}>🏥 RedNorte</h2>
          <p style={s.rolText}>ADMINISTRADOR</p>
        </div>
        <nav style={s.nav}>
          {navItems.map(item => (
            <button key={item.key}
              style={{...s.navBtn, background: vista===item.key?'#0f172a':'transparent', color: vista===item.key?'#38bdf8':'#94a3b8'}}
              onClick={() => setVista(item.key)}>
              {item.label}
            </button>
          ))}
        </nav>
        <button style={s.logout} onClick={cerrar}>Cerrar sesión</button>
      </div>

      <div style={s.main}>
        {vista==='dashboard' && <DashboardView totalEspera={totalEspera} ocupacion={ocupacion} pacientes={pacientes} notificados={notificados} reasignar={reasignar} notificar={notificar} chartRef={chartRef} />}
        {vista==='pacientes' && <PacientesView />}
        {vista==='espera' && <ListaEsperaView />}
        {vista==='agenda' && <AgendaView />}
        {vista==='notificaciones' && <NotificacionesView />}
      </div>
    </div>
  );
}

// ── ESTILOS ──────────────────────────────────────────────

const s = {
  page:        { display:'flex', minHeight:'100vh', background:'#0f172a', fontFamily:'sans-serif' },
  sidebar:     { width:220, background:'#1e293b', padding:'1.5rem', display:'flex', flexDirection:'column', justifyContent:'space-between', flexShrink:0 },
  logo:        { color:'#38bdf8', margin:'0 0 4px', fontSize:18 },
  rolText:     { color:'#64748b', fontSize:11, marginBottom:'2rem' },
  nav:         { display:'flex', flexDirection:'column', gap:6, flex:1 },
  navBtn:      { border:'none', padding:'10px 12px', textAlign:'left', borderRadius:8, cursor:'pointer', fontSize:13, transition:'all 0.15s' },
  logout:      { background:'#7f1d1d', color:'#fca5a5', border:'none', padding:10, borderRadius:8, cursor:'pointer', fontSize:13 },
  main:        { flex:1, padding:'1.5rem', overflowY:'auto' },
  sectionLabel:{ fontSize:11, fontWeight:500, color:'#64748b', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10 },
  kpiGrid:     { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:'1.5rem' },
  kpiCard:     { background:'#1e293b', border:'0.5px solid #334155', borderRadius:12, padding:'1rem 1.25rem' },
  kpiLabel:    { fontSize:12, color:'#94a3b8', marginBottom:6 },
  kpiValue:    { fontSize:28, fontWeight:500, lineHeight:1, marginBottom:4 },
  kpiDelta:    { fontSize:12 },
  grid2:       { display:'grid', gridTemplateColumns:'1.6fr 1fr', gap:12, marginBottom:'1.5rem' },
  card:        { background:'#1e293b', border:'0.5px solid #334155', borderRadius:12, padding:'1.25rem', marginBottom:'1.5rem' },
  cardTitle:   { fontSize:13, fontWeight:500, color:'#e2e8f0', marginBottom:'1rem' },
  legend:      { display:'flex', alignItems:'center', gap:4, fontSize:12, color:'#94a3b8' },
  legendDot:   { width:10, height:3, borderRadius:2, display:'inline-block' },
  alertItem:   { display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0' },
  badge:       { fontSize:11, fontWeight:500, padding:'3px 8px', borderRadius:99 },
  table:       { width:'100%', borderCollapse:'collapse', fontSize:13 },
  th:          { fontSize:11, fontWeight:500, color:'#64748b', textAlign:'left', padding:'0 8px 10px 0', borderBottom:'0.5px solid #334155' },
  td:          { padding:'10px 8px 10px 0', color:'#e2e8f0', verticalAlign:'middle' },
  actionBtn:   { fontSize:12, padding:'4px 10px', border:'0.5px solid #475569', borderRadius:8, background:'transparent', color:'#94a3b8', cursor:'pointer' },
};