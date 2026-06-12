import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

const GATEWAY_URL = 'http://localhost:9090';
const API_BASE_URL = `${GATEWAY_URL}/lista-espera`;
const LOOKUP_ENDPOINTS = {
  pacientes: ['/pacientes', '/paciente'],
  doctores: ['/doctores', '/doctor'],
  especialidades: ['/especialidades', '/especialidad'],
};
const ESTADOS = ['ESPERANDO', 'CONTACTADO', 'ASIGNADO', 'CANCELADO', 'EXPIRADO', 'RECHAZADO'];
const PRIORIDADES = { 1: 'Alta', 2: 'Media', 3: 'Baja' };

const emptyForm = {
  pacienteNombre: '',
  especialidadNombre: '',
  doctorNombre: '',
  prioridad: '2',
  motivo: '',
  observaciones: '',
};

function normalizeList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.items)) return data.items;
  if (data && typeof data === 'object') return [data];
  return [];
}

function entityId(entity, type) {
  return entity?.id ?? entity?.[`${type}Id`] ?? entity?.[`${type}_id`] ?? entity?.usuarioId ?? '';
}

function entityName(entity, type) {
  if (!entity) return '';
  if (typeof entity === 'string') return entity;

  const nested = entity[type];
  const nestedName = nested && typeof nested === 'object' ? entityName(nested, type) : nested;
  const fullName = [entity.nombre, entity.apellido, entity.apellidos].filter(Boolean).join(' ').trim();

  return (
    entity[`${type}Nombre`] ||
    entity[`${type}_nombre`] ||
    entity.nombreCompleto ||
    entity.nombreEspecialidad ||
    entity.especialidadNombre ||
    entity.nombre ||
    entity.name ||
    fullName ||
    nestedName ||
    ''
  );
}

function displayEntity(entity, type) {
  const id = entityId(entity, type);
  const name = entityName(entity, type);
  if (name && id) return `${name} (#${id})`;
  return name || (id ? `ID ${id}` : '');
}

function resolveEntityId(value, catalog, type) {
  const cleanValue = String(value || '').trim();
  if (!cleanValue) return null;

  const byDisplay = catalog.find((item) => displayEntity(item, type) === cleanValue);
  if (byDisplay) return Number(entityId(byDisplay, type));

  const byName = catalog.find((item) => entityName(item, type).toLowerCase() === cleanValue.toLowerCase());
  if (byName) return Number(entityId(byName, type));

  const idMatch = cleanValue.match(/#(\d+)/);
  if (idMatch) return Number(idMatch[1]);
  if (/^\d+$/.test(cleanValue)) return Number(cleanValue);
  return null;
}

function formatDate(value) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString('es-CL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getErrorMessage(error) {
  const payload = error?.response?.data;
  if (typeof payload === 'string') return payload;
  return payload?.message || payload?.error || error.message || 'No se pudo completar la operacion.';
}

export default function ListaEsperaView() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [filters, setFilters] = useState({ estado: '', pacienteNombre: '', doctorNombre: '', especialidadNombre: '' });
  const [rowDrafts, setRowDrafts] = useState({});
  const [nextEspecialidadNombre, setNextEspecialidadNombre] = useState('');
  const [nextResult, setNextResult] = useState(null);
  const [catalogs, setCatalogs] = useState({ pacientes: [], doctores: [], especialidades: [] });
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState('verificando');
  const [catalogStatus, setCatalogStatus] = useState('cargando catalogos...');
  const [message, setMessage] = useState({ type: 'info', text: 'Conectando con API Gateway...' });

  const enrichedItems = useMemo(
    () => items.map((item) => enrichItem(item, catalogs)),
    [items, catalogs],
  );

  const filteredItems = useMemo(() => {
    const paciente = filters.pacienteNombre.trim().toLowerCase();
    const doctor = filters.doctorNombre.trim().toLowerCase();
    const especialidad = filters.especialidadNombre.trim().toLowerCase();

    return enrichedItems.filter((item) => {
      const matchesPaciente = !paciente || item.pacienteNombre.toLowerCase().includes(paciente);
      const matchesDoctor = !doctor || item.doctorNombre.toLowerCase().includes(doctor);
      const matchesEspecialidad = !especialidad || item.especialidadNombre.toLowerCase().includes(especialidad);
      return matchesPaciente && matchesDoctor && matchesEspecialidad;
    });
  }, [enrichedItems, filters]);

  const activeFilters = useMemo(
    () => Object.values(filters).some((value) => String(value).trim() !== ''),
    [filters],
  );

  const setSuccess = (text) => setMessage({ type: 'success', text });
  const setError = (text) => setMessage({ type: 'error', text });

  const loadCatalogs = async () => {
    const [pacientes, doctores, especialidades] = await Promise.all([
      fetchLookup('pacientes'),
      fetchLookup('doctores'),
      fetchLookup('especialidades'),
    ]);

    setCatalogs({ pacientes, doctores, especialidades });
    const loaded = [
      `${pacientes.length} pacientes`,
      `${doctores.length} doctores`,
      `${especialidades.length} especialidades`,
    ].join(', ');
    setCatalogStatus(`Catalogos cargados: ${loaded}.`);
  };

  const loadSolicitudes = async (customFilters = filters) => {
    setLoading(true);
    try {
      const estado = customFilters.estado.trim();
      const response = await axios.get(API_BASE_URL, {
        params: estado ? { estado } : undefined,
      });

      setItems(normalizeList(response.data));
      setApiStatus('conectado');
      setSuccess('Solicitudes cargadas correctamente. Los filtros por nombre se aplican en la tabla.');
    } catch (error) {
      setApiStatus('error');
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCatalogs().catch(() => {
      setCatalogStatus('No se pudieron cargar catalogos externos; se usaran nombres incluidos en lista_espera si existen.');
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSolicitudes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateForm = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const updateFilter = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const updateRowDraft = (id, patch) => {
    setRowDrafts((current) => ({
      ...current,
      [id]: {
        estado: current[id]?.estado || 'CONTACTADO',
        estadoObservaciones: current[id]?.estadoObservaciones || '',
        asignarDoctorNombre: current[id]?.asignarDoctorNombre || '',
        bloqueHorarioId: current[id]?.bloqueHorarioId || '',
        asignarObservaciones: current[id]?.asignarObservaciones || '',
        ...patch,
      },
    }));
  };

  const addSolicitud = async (event) => {
    event.preventDefault();

    const pacienteId = resolveEntityId(form.pacienteNombre, catalogs.pacientes, 'paciente');
    const especialidadId = resolveEntityId(form.especialidadNombre, catalogs.especialidades, 'especialidad');
    const doctorId = form.doctorNombre ? resolveEntityId(form.doctorNombre, catalogs.doctores, 'doctor') : null;

    if (!pacienteId || !especialidadId) {
      setError('Selecciona un paciente y una especialidad validos desde los nombres disponibles.');
      return;
    }
    if (form.doctorNombre && !doctorId) {
      setError('El doctor indicado no coincide con los nombres disponibles.');
      return;
    }

    setLoading(true);
    try {
      await axios.post(API_BASE_URL, {
        pacienteId,
        especialidadId,
        doctorId,
        prioridad: Number(form.prioridad),
        motivo: form.motivo.trim(),
        observaciones: form.observaciones.trim(),
      });
      setForm(emptyForm);
      setNextResult(null);
      setSuccess('Solicitud agregada a la lista de espera.');
      await loadSolicitudes();
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = async (event) => {
    event.preventDefault();
    setNextResult(null);
    await loadSolicitudes(filters);
  };

  const clearFilters = async () => {
    const cleanFilters = { estado: '', pacienteNombre: '', doctorNombre: '', especialidadNombre: '' };
    setFilters(cleanFilters);
    setNextResult(null);
    await loadSolicitudes(cleanFilters);
  };

  const changeEstado = async (item) => {
    const draft = rowDrafts[item.id] || {};
    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/${item.id}/estado`, {
        estado: draft.estado || 'CONTACTADO',
        observaciones: draft.estadoObservaciones || '',
      });
      setSuccess(`Estado actualizado para la solicitud ${item.id}.`);
      await loadSolicitudes();
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const asignarHora = async (item) => {
    const draft = rowDrafts[item.id] || {};
    const doctorId = resolveEntityId(draft.asignarDoctorNombre, catalogs.doctores, 'doctor');
    if (!doctorId || !draft.bloqueHorarioId) {
      setError('Para asignar hora debes seleccionar un doctor por nombre e indicar bloqueHorarioId.');
      return;
    }

    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/${item.id}/asignar`, {
        doctorId,
        bloqueHorarioId: Number(draft.bloqueHorarioId),
        observaciones: draft.asignarObservaciones || '',
      });
      setSuccess(`Hora asignada para la solicitud ${item.id}.`);
      await loadSolicitudes();
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const deleteSolicitud = async (item) => {
    if (!window.confirm(`Eliminar la solicitud ${item.id}?`)) return;
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/${item.id}`);
      setSuccess(`Solicitud ${item.id} eliminada.`);
      await loadSolicitudes();
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const getSiguiente = async () => {
    const especialidadId = resolveEntityId(nextEspecialidadNombre, catalogs.especialidades, 'especialidad');
    if (!especialidadId) {
      setError('Selecciona una especialidad valida por nombre para obtener el siguiente paciente.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/especialidad/${especialidadId}/siguiente`);
      setNextResult(response.data);
      setSuccess('Siguiente paciente obtenido correctamente.');
    } catch (error) {
      setNextResult(null);
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.page}>
      <datalist id="pacientes-list">
        {catalogs.pacientes.map((item) => <option key={`paciente-${entityId(item, 'paciente')}`} value={displayEntity(item, 'paciente')} />)}
      </datalist>
      <datalist id="doctores-list">
        {catalogs.doctores.map((item) => <option key={`doctor-${entityId(item, 'doctor')}`} value={displayEntity(item, 'doctor')} />)}
      </datalist>
      <datalist id="especialidades-list">
        {catalogs.especialidades.map((item) => <option key={`especialidad-${entityId(item, 'especialidad')}`} value={displayEntity(item, 'especialidad')} />)}
      </datalist>

      <section style={styles.topbar}>
        <div>
          <h1 style={styles.title}>Lista de espera clinica</h1>
          <p style={styles.subtitle}>{API_BASE_URL}</p>
          <p style={styles.catalogText}>{catalogStatus}</p>
        </div>
        <div style={styles.statusWrap}>
          <span style={{ ...styles.statusDot, background: statusColor(apiStatus) }} />
          <span style={styles.statusText}>{apiStatus === 'conectado' ? 'API conectada' : apiStatus === 'error' ? 'API sin conexion' : 'Verificando API'}</span>
          <button type="button" style={styles.secondaryButton} onClick={() => { loadCatalogs(); loadSolicitudes(); }} disabled={loading}>
            Recargar
          </button>
        </div>
      </section>

      <section style={{ ...styles.message, ...messageStyle(message.type) }}>{message.text}</section>

      <section style={styles.layout}>
        <form style={styles.panel} onSubmit={addSolicitud}>
          <div style={styles.panelHeader}>
            <h2 style={styles.panelTitle}>Nueva solicitud</h2>
            <button type="submit" style={styles.primaryButton} disabled={loading}>
              Agregar a lista
            </button>
          </div>

          <div style={styles.formGrid}>
            <Field label="Paciente">
              <input required name="pacienteNombre" list="pacientes-list" value={form.pacienteNombre} onChange={updateForm} style={styles.input} placeholder="Buscar por nombre" />
            </Field>
            <Field label="Especialidad">
              <input required name="especialidadNombre" list="especialidades-list" value={form.especialidadNombre} onChange={updateForm} style={styles.input} placeholder="Buscar por especialidad" />
            </Field>
            <Field label="Doctor opcional">
              <input name="doctorNombre" list="doctores-list" value={form.doctorNombre} onChange={updateForm} style={styles.input} placeholder="Buscar por nombre" />
            </Field>
            <Field label="prioridad">
              <select name="prioridad" value={form.prioridad} onChange={updateForm} style={styles.input}>
                <option value="1">1 - Alta</option>
                <option value="2">2 - Media</option>
                <option value="3">3 - Baja</option>
              </select>
            </Field>
            <Field label="motivo" wide>
              <input required name="motivo" value={form.motivo} onChange={updateForm} style={styles.input} placeholder="No hay horas disponibles" />
            </Field>
            <Field label="observaciones" wide>
              <textarea name="observaciones" value={form.observaciones} onChange={updateForm} style={{ ...styles.input, minHeight: 66, resize: 'vertical' }} placeholder="Paciente prefiere horario AM" />
            </Field>
          </div>
        </form>

        <section style={styles.panel}>
          <div style={styles.panelHeader}>
            <h2 style={styles.panelTitle}>Filtros por nombre</h2>
            <button type="button" style={styles.secondaryButton} onClick={clearFilters} disabled={loading || !activeFilters}>
              Limpiar filtros
            </button>
          </div>

          <form style={styles.filterGrid} onSubmit={applyFilters}>
            <Field label="estado">
              <select name="estado" value={filters.estado} onChange={updateFilter} style={styles.input}>
                <option value="">Todos</option>
                {ESTADOS.map((estado) => <option key={estado} value={estado}>{estado}</option>)}
              </select>
            </Field>
            <Field label="Paciente">
              <input name="pacienteNombre" list="pacientes-list" value={filters.pacienteNombre} onChange={updateFilter} style={styles.input} placeholder="Nombre paciente" />
            </Field>
            <Field label="Doctor">
              <input name="doctorNombre" list="doctores-list" value={filters.doctorNombre} onChange={updateFilter} style={styles.input} placeholder="Nombre doctor" />
            </Field>
            <Field label="Especialidad">
              <input name="especialidadNombre" list="especialidades-list" value={filters.especialidadNombre} onChange={updateFilter} style={styles.input} placeholder="Nombre especialidad" />
            </Field>
            <button type="submit" style={styles.primaryButton} disabled={loading}>
              Aplicar filtros
            </button>
          </form>

          <div style={styles.nextBox}>
            <Field label="siguiente por especialidad">
              <input list="especialidades-list" value={nextEspecialidadNombre} onChange={(event) => setNextEspecialidadNombre(event.target.value)} style={styles.input} placeholder="Nombre especialidad" />
            </Field>
            <button type="button" style={styles.secondaryButton} onClick={getSiguiente} disabled={loading}>
              Obtener siguiente
            </button>
          </div>
          {nextResult && <pre style={styles.resultBox}>{JSON.stringify(enrichItem(nextResult, catalogs), null, 2)}</pre>}
        </section>
      </section>

      <section style={styles.panel}>
        <div style={styles.panelHeader}>
          <h2 style={styles.panelTitle}>Solicitudes</h2>
          <span style={styles.count}>{loading ? 'Cargando...' : `${filteredItems.length} de ${items.length} registros`}</span>
        </div>

        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                {['ID', 'Paciente', 'Especialidad', 'Doctor', 'bloqueHorarioId', 'prioridad', 'estado', 'fechaIngreso', 'fechaActualizacion', 'fechaAsignacion', 'motivo', 'observaciones', 'acciones'].map((header) => (
                  <th key={header} style={styles.th}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan="13" style={styles.empty}>No hay solicitudes para mostrar.</td>
                </tr>
              )}
              {filteredItems.map((item) => {
                const draft = rowDrafts[item.id] || {};
                return (
                  <tr key={item.id}>
                    <td style={styles.td}>{item.id ?? '-'}</td>
                    <td style={styles.td}>{item.pacienteNombre || '-'}</td>
                    <td style={styles.td}>{item.especialidadNombre || '-'}</td>
                    <td style={styles.td}>{item.doctorNombre || '-'}</td>
                    <td style={styles.td}>{item.bloqueHorarioId ?? '-'}</td>
                    <td style={styles.td}><span style={{ ...styles.badge, ...priorityStyle(item.prioridad) }}>{PRIORIDADES[item.prioridad] || item.prioridad || '-'}</span></td>
                    <td style={styles.td}><span style={{ ...styles.badge, ...estadoStyle(item.estado) }}>{item.estado || '-'}</span></td>
                    <td style={styles.td}>{formatDate(item.fechaIngreso)}</td>
                    <td style={styles.td}>{formatDate(item.fechaActualizacion)}</td>
                    <td style={styles.td}>{formatDate(item.fechaAsignacion)}</td>
                    <td style={{ ...styles.td, minWidth: 180 }}>{item.motivo || '-'}</td>
                    <td style={{ ...styles.td, minWidth: 220 }}>{item.observaciones || '-'}</td>
                    <td style={{ ...styles.td, minWidth: 370 }}>
                      <div style={styles.actions}>
                        <select value={draft.estado || item.estado || 'CONTACTADO'} onChange={(event) => updateRowDraft(item.id, { estado: event.target.value })} style={styles.smallInput}>
                          {ESTADOS.map((estado) => <option key={estado} value={estado}>{estado}</option>)}
                        </select>
                        <input value={draft.estadoObservaciones || ''} onChange={(event) => updateRowDraft(item.id, { estadoObservaciones: event.target.value })} style={styles.smallInput} placeholder="obs. estado" />
                        <button type="button" style={styles.actionButton} onClick={() => changeEstado(item)} disabled={loading}>Cambiar</button>
                        <input value={draft.asignarDoctorNombre || ''} onChange={(event) => updateRowDraft(item.id, { asignarDoctorNombre: event.target.value })} list="doctores-list" style={styles.smallInput} placeholder="Doctor" />
                        <input value={draft.bloqueHorarioId || ''} onChange={(event) => updateRowDraft(item.id, { bloqueHorarioId: event.target.value })} style={styles.numberInput} type="number" min="1" placeholder="bloqueId" />
                        <input value={draft.asignarObservaciones || ''} onChange={(event) => updateRowDraft(item.id, { asignarObservaciones: event.target.value })} style={styles.smallInput} placeholder="obs. asignacion" />
                        <button type="button" style={styles.actionButton} onClick={() => asignarHora(item)} disabled={loading}>Asignar</button>
                        <button type="button" style={styles.deleteButton} onClick={() => deleteSolicitud(item)} disabled={loading}>Eliminar</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

async function fetchLookup(type) {
  for (const path of LOOKUP_ENDPOINTS[type]) {
    try {
      const response = await axios.get(`${GATEWAY_URL}${path}`);
      const list = normalizeList(response.data);
      if (list.length > 0) return list;
    } catch {
      // Try the next common gateway route.
    }
  }
  return [];
}

function enrichItem(item, catalogs) {
  const pacienteId = item.pacienteId ?? item.paciente?.id;
  const doctorId = item.doctorId ?? item.doctor?.id;
  const especialidadId = item.especialidadId ?? item.especialidad?.id;
  const paciente = catalogs.pacientes.find((entry) => Number(entityId(entry, 'paciente')) === Number(pacienteId));
  const doctor = catalogs.doctores.find((entry) => Number(entityId(entry, 'doctor')) === Number(doctorId));
  const especialidad = catalogs.especialidades.find((entry) => Number(entityId(entry, 'especialidad')) === Number(especialidadId));

  return {
    ...item,
    pacienteNombre: item.pacienteNombre || item.nombrePaciente || entityName(item.paciente, 'paciente') || entityName(paciente, 'paciente') || (pacienteId ? `Paciente #${pacienteId}` : ''),
    doctorNombre: item.doctorNombre || item.nombreDoctor || entityName(item.doctor, 'doctor') || entityName(doctor, 'doctor') || (doctorId ? `Doctor #${doctorId}` : ''),
    especialidadNombre: item.especialidadNombre || item.nombreEspecialidad || entityName(item.especialidad, 'especialidad') || entityName(especialidad, 'especialidad') || (especialidadId ? `Especialidad #${especialidadId}` : ''),
  };
}

function Field({ label, children, wide = false }) {
  return (
    <label style={{ ...styles.field, gridColumn: wide ? 'span 2' : undefined }}>
      <span style={styles.label}>{label}</span>
      {children}
    </label>
  );
}

function statusColor(status) {
  if (status === 'conectado') return '#22c55e';
  if (status === 'error') return '#ef4444';
  return '#f59e0b';
}

function messageStyle(type) {
  if (type === 'success') return { background: '#ecfdf5', borderColor: '#86efac', color: '#166534' };
  if (type === 'error') return { background: '#fef2f2', borderColor: '#fecaca', color: '#991b1b' };
  return { background: '#eff6ff', borderColor: '#bfdbfe', color: '#1e40af' };
}

function estadoStyle(estado) {
  const map = {
    ESPERANDO: { background: '#fef3c7', color: '#92400e', borderColor: '#fde68a' },
    CONTACTADO: { background: '#dbeafe', color: '#1e40af', borderColor: '#bfdbfe' },
    ASIGNADO: { background: '#dcfce7', color: '#166534', borderColor: '#bbf7d0' },
    CANCELADO: { background: '#fee2e2', color: '#991b1b', borderColor: '#fecaca' },
    EXPIRADO: { background: '#f3f4f6', color: '#374151', borderColor: '#e5e7eb' },
    RECHAZADO: { background: '#ffe4e6', color: '#9f1239', borderColor: '#fecdd3' },
  };
  return map[estado] || { background: '#f8fafc', color: '#475569', borderColor: '#e2e8f0' };
}

function priorityStyle(prioridad) {
  if (Number(prioridad) === 1) return { background: '#fee2e2', color: '#991b1b', borderColor: '#fecaca' };
  if (Number(prioridad) === 2) return { background: '#fef3c7', color: '#92400e', borderColor: '#fde68a' };
  return { background: '#dcfce7', color: '#166534', borderColor: '#bbf7d0' };
}

const styles = {
  page: { minHeight: '100%', padding: 24, background: '#f4f6f8', color: '#172033', fontFamily: 'system-ui, Segoe UI, sans-serif' },
  topbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 14, flexWrap: 'wrap' },
  title: { margin: 0, color: '#172033', fontSize: 26, lineHeight: 1.15, fontWeight: 700, letterSpacing: 0 },
  subtitle: { marginTop: 4, color: '#64748b', fontSize: 13 },
  catalogText: { marginTop: 3, color: '#64748b', fontSize: 12 },
  statusWrap: { display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid #d8dee8', borderRadius: 8, padding: '8px 10px' },
  statusDot: { width: 9, height: 9, borderRadius: 99 },
  statusText: { color: '#334155', fontSize: 13, fontWeight: 600 },
  message: { border: '1px solid', borderRadius: 8, padding: '10px 12px', marginBottom: 14, fontSize: 13, fontWeight: 600 },
  layout: { display: 'grid', gridTemplateColumns: 'minmax(420px, 1.1fr) minmax(420px, 0.9fr)', gap: 14, alignItems: 'start' },
  panel: { background: '#fff', border: '1px solid #d8dee8', borderRadius: 8, padding: 16, marginBottom: 14, boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04)' },
  panelHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 14, flexWrap: 'wrap' },
  panelTitle: { margin: 0, color: '#172033', fontSize: 16, fontWeight: 700, letterSpacing: 0 },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 },
  filterGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10, alignItems: 'end' },
  nextBox: { display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, alignItems: 'end', marginTop: 14, paddingTop: 14, borderTop: '1px solid #e5e7eb' },
  field: { display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0 },
  label: { color: '#475569', fontSize: 12, fontWeight: 700 },
  input: { width: '100%', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: 6, background: '#fff', color: '#0f172a', padding: '8px 9px', fontSize: 13, lineHeight: 1.25 },
  primaryButton: { border: '1px solid #0f766e', borderRadius: 6, background: '#0f766e', color: '#fff', padding: '8px 12px', fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' },
  secondaryButton: { border: '1px solid #cbd5e1', borderRadius: 6, background: '#f8fafc', color: '#334155', padding: '8px 12px', fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' },
  count: { color: '#64748b', fontSize: 13, fontWeight: 700 },
  tableWrap: { overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: 8 },
  table: { width: '100%', minWidth: 1540, borderCollapse: 'collapse', fontSize: 12 },
  th: { position: 'sticky', top: 0, background: '#f8fafc', color: '#475569', textAlign: 'left', padding: '9px 8px', borderBottom: '1px solid #d8dee8', fontWeight: 800, whiteSpace: 'nowrap' },
  td: { color: '#172033', padding: '9px 8px', borderBottom: '1px solid #eef2f7', verticalAlign: 'top' },
  empty: { color: '#64748b', textAlign: 'center', padding: 24 },
  badge: { display: 'inline-flex', alignItems: 'center', border: '1px solid', borderRadius: 999, padding: '3px 8px', fontSize: 11, fontWeight: 800, whiteSpace: 'nowrap' },
  actions: { display: 'grid', gridTemplateColumns: '110px 130px auto 120px 86px 135px auto auto', gap: 6, alignItems: 'center' },
  smallInput: { border: '1px solid #cbd5e1', borderRadius: 6, background: '#fff', color: '#0f172a', padding: '6px 7px', fontSize: 12, minWidth: 0 },
  numberInput: { border: '1px solid #cbd5e1', borderRadius: 6, background: '#fff', color: '#0f172a', padding: '6px 7px', fontSize: 12, minWidth: 0 },
  actionButton: { border: '1px solid #94a3b8', borderRadius: 6, background: '#fff', color: '#334155', padding: '6px 8px', fontSize: 12, fontWeight: 700, cursor: 'pointer' },
  deleteButton: { border: '1px solid #fecaca', borderRadius: 6, background: '#fef2f2', color: '#991b1b', padding: '6px 8px', fontSize: 12, fontWeight: 700, cursor: 'pointer' },
  resultBox: { margin: '12px 0 0', background: '#0f172a', color: '#e2e8f0', borderRadius: 6, padding: 12, overflowX: 'auto', fontSize: 12, lineHeight: 1.4 },
};
