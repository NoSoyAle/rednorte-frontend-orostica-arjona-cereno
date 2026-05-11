export default function ListaEsperaView() {
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
      <div style={{background:'#1e293b', border:'0.5px solid #334155', borderRadius:12, padding:'1.25rem'}}>
        <table style={{width:'100%', borderCollapse:'collapse', fontSize:13}}>
          <thead>
            <tr>
              {['Paciente','Especialidad','Prioridad','Estado','Fecha ingreso'].map(h => (
                <th key={h} style={{fontSize:11, color:'#64748b', textAlign:'left', padding:'0 8px 10px 0', borderBottom:'0.5px solid #334155'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lista.map((p,i) => {
              const ec = estadoColor(p.estado);
              const pc = prioridadColor(p.prioridad);
              return (
                <tr key={p.id}>
                  <td style={{padding:'10px 8px 10px 0', color:'#e2e8f0', borderBottom:'0.5px solid #334155'}}>{p.paciente}</td>
                  <td style={{padding:'10px 8px 10px 0', color:'#94a3b8', borderBottom:'0.5px solid #334155'}}>{p.especialidad}</td>
                  <td style={{padding:'10px 8px 10px 0', borderBottom:'0.5px solid #334155'}}>
                    <span style={{fontSize:11, padding:'3px 8px', borderRadius:99, background:pc.bg, color:pc.color}}>{prioridadLabel(p.prioridad)}</span>
                  </td>
                  <td style={{padding:'10px 8px 10px 0', borderBottom:'0.5px solid #334155'}}>
                    <span style={{fontSize:11, padding:'3px 8px', borderRadius:99, background:ec.bg, color:ec.color}}>{p.estado}</span>
                  </td>
                  <td style={{padding:'10px 8px 10px 0', color:'#94a3b8', borderBottom:'0.5px solid #334155'}}>{p.fecha}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}