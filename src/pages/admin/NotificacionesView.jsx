export default function NotificacionesView() {
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
      <div style={{background:'#1e293b', border:'0.5px solid #334155', borderRadius:12, padding:'1.25rem'}}>
        <table style={{width:'100%', borderCollapse:'collapse', fontSize:13}}>
          <thead>
            <tr>
              {['Paciente','Tipo','Asunto','Estado','Fecha'].map(h => (
                <th key={h} style={{fontSize:11, color:'#64748b', textAlign:'left', padding:'0 8px 10px 0', borderBottom:'0.5px solid #334155'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {notifs.map((n,i) => {
              const ec = estadoColor(n.estado);
              return (
                <tr key={n.id}>
                  <td style={{padding:'10px 8px 10px 0', color:'#e2e8f0', borderBottom:'0.5px solid #334155'}}>{n.paciente}</td>
                  <td style={{padding:'10px 8px 10px 0', borderBottom:'0.5px solid #334155'}}>
                    <span style={{fontSize:11, padding:'3px 8px', borderRadius:99, background:'#1e3a5f', color:'#93c5fd'}}>{n.tipo}</span>
                  </td>
                  <td style={{padding:'10px 8px 10px 0', color:'#94a3b8', borderBottom:'0.5px solid #334155'}}>{n.asunto}</td>
                  <td style={{padding:'10px 8px 10px 0', borderBottom:'0.5px solid #334155'}}>
                    <span style={{fontSize:11, padding:'3px 8px', borderRadius:99, background:ec.bg, color:ec.color}}>{n.estado}</span>
                  </td>
                  <td style={{padding:'10px 8px 10px 0', color:'#94a3b8', borderBottom:'0.5px solid #334155'}}>{n.fecha}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}