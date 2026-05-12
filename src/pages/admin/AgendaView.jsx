export default function AgendaView() {
  const agenda = [
    { id:1, doctor:'Dr. Juan Pérez', especialidad:'Cardiología', fecha:'2025-05-10', inicio:'09:00', fin:'13:00', cupos:8, disponibles:3 },
    { id:2, doctor:'Dr. Juan Pérez', especialidad:'Cardiología', fecha:'2025-05-11', inicio:'14:00', fin:'18:00', cupos:8, disponibles:8 },
    { id:3, doctor:'Dra. María López', especialidad:'Neurología', fecha:'2025-05-12', inicio:'09:00', fin:'13:00', cupos:6, disponibles:1 },
    { id:4, doctor:'Dr. Carlos Rojas', especialidad:'Traumatología', fecha:'2025-05-13', inicio:'08:00', fin:'12:00', cupos:5, disponibles:5 },
  ];
  return (
    <div>
      <p style={{fontSize:20, fontWeight:500, color:'#e2e8f0', marginBottom:'1.5rem'}}>Agenda médica</p>
      <div style={{background:'#1e293b', border:'0.5px solid #334155', borderRadius:12, padding:'1.25rem'}}>
        <table style={{width:'100%', borderCollapse:'collapse', fontSize:13}}>
          <thead>
            <tr>
              {['Doctor','Especialidad','Fecha','Horario','Cupos'].map(h => (
                <th key={h} style={{fontSize:11, color:'#64748b', textAlign:'left', padding:'0 8px 10px 0', borderBottom:'0.5px solid #334155'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {agenda.map((a,i) => {
              const libre = a.disponibles / a.cupos;
              const cupoColor = libre===0?'#f87171': libre<0.3?'#fbbf24':'#4ade80';
              return (
                <tr key={a.id}>
                  <td style={{padding:'10px 8px 10px 0', color:'#e2e8f0', borderBottom:'0.5px solid #334155'}}>{a.doctor}</td>
                  <td style={{padding:'10px 8px 10px 0', color:'#94a3b8', borderBottom:'0.5px solid #334155'}}>{a.especialidad}</td>
                  <td style={{padding:'10px 8px 10px 0', color:'#94a3b8', borderBottom:'0.5px solid #334155'}}>{a.fecha}</td>
                  <td style={{padding:'10px 8px 10px 0', color:'#94a3b8', borderBottom:'0.5px solid #334155'}}>{a.inicio} - {a.fin}</td>
                  <td style={{padding:'10px 8px 10px 0', borderBottom:'0.5px solid #334155', color:cupoColor, fontWeight:500}}>{a.disponibles}/{a.cupos}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}