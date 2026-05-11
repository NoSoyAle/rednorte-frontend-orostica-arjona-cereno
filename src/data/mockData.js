export const kpiData = {
  totalEspera: 284,
  tiempoMedio: 18,
  ocupacion: 91,
  inasistencia: 8.4
};

export const pacientesPrioritarios = [
  { id:1, nombre:'Carlos González', esp:'Cardiología', prioridad:'Alta', dias:32 },
  { id:2, nombre:'Ana Morales', esp:'Neurología', prioridad:'Alta', dias:28 },
  { id:3, nombre:'Luis Pinto', esp:'Traumatología', prioridad:'Media', dias:21 },
  { id:4, nombre:'Rosa Castillo', esp:'Medicina General', prioridad:'Media', dias:18 },
  { id:5, nombre:'Pedro Soto', esp:'Pediatría', prioridad:'Baja', dias:9 },
  { id:6, nombre:'María Fuentes', esp:'Cardiología', prioridad:'Alta', dias:35 },
  { id:7, nombre:'Jorge Díaz', esp:'Traumatología', prioridad:'Media', dias:15 },
];

export const centrosCriticos = [
  { nombre:'H. Regional Norte', esp:'Traumatología', pct:97 },
  { nombre:'CESFAM Independencia', esp:'Medicina General', pct:95 },
  { nombre:'H. San José', esp:'Cardiología', pct:93 },
  { nombre:'CDT Recoleta', esp:'Neurología', pct:91 },
  { nombre:'H. Clínico Norte', esp:'Pediatría', pct:90 },
];

export const flujoPacientes = {
  labels: ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00'],
  ingresos: [12, 19, 28, 35, 22, 18, 25, 31],
  atenciones: [8, 14, 22, 30, 26, 20, 18, 24]
};