export default function PacientesView() {
  const pacientes = [
    { id:1, nombre:'Carlos González', rut:'11111111-1', email:'carlos@email.com', telefono:'+56912345678', estado:'ACTIVO' },
    { id:2, nombre:'Ana Morales', rut:'22222222-2', email:'ana@email.com', telefono:'+56987654321', estado:'ACTIVO' },
    { id:3, nombre:'Luis Pinto', rut:'33333333-3', email:'luis@email.com', telefono:'+56911223344', estado:'INACTIVO' },
  ];
  return (
    <div>
      <p style={{fontSize:20, fontWeight:500, color:'#e2e8f0', marginBottom:'1.5rem'}}>Pacientes registrados</p>
      <div style={{background:'#1e293b', border:'0.5px solid #334155', borderRadius:12, padding:'1.25rem'}}>
        <table style={{width:'100%', borderCollapse:'collapse', fontSize:13}}>
          <thead>
            <tr>
              {['Nombre','RUT','Email','Teléfono','Estado'].map(h => (
                <th key={h} style={{fontSize:11, color:'#64748b', textAlign:'left', padding:'0 8px 10px 0', borderBottom:'0.5px solid #334155'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p,i) => (
              <tr key={p.id}>
                <td style={{padding:'10px 8px 10px 0', color:'#e2e8f0', borderBottom:'0.5px solid #334155'}}>{p.nombre}</td>
                <td style={{padding:'10px 8px 10px 0', color:'#94a3b8', borderBottom:'0.5px solid #334155'}}>{p.rut}</td>
                <td style={{padding:'10px 8px 10px 0', color:'#94a3b8', borderBottom:'0.5px solid #334155'}}>{p.email}</td>
                <td style={{padding:'10px 8px 10px 0', color:'#94a3b8', borderBottom:'0.5px solid #334155'}}>{p.telefono}</td>
                <td style={{padding:'10px 8px 10px 0', borderBottom:'0.5px solid #334155'}}>
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