import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GATEWAY_URL = 'http://localhost:9090'; // Tu API Gateway
const API_ADMIN = `${GATEWAY_URL}/admin`;

const emptyForm = {
  nombre: '',
  rut: '',
  password: '',
  rol: 'DOCTOR'
};

export default function AdminDashboardView() {
  const [kpis, setKpis] = useState({ totalUsuarios: 0, totalAdministradores: 0, totalDoctores: 0 });
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Cargar datos del Backend
  const cargarDashboard = async () => {
    setLoading(true);
    try {
      const [resKpis, resUsuarios] = await Promise.all([
        axios.get(`${API_ADMIN}/dashboard/kpis`),
        axios.get(`${API_ADMIN}/usuarios`)
      ]);
      setKpis(resKpis.data);
      setUsuarios(resUsuarios.data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al conectar con el servicio de administración.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDashboard();
  }, []);

  // Manejar cambios del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Registrar nuevo usuario
  const registrarUsuario = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_ADMIN}/usuarios`, form);
      setMessage({ type: 'success', text: `Usuario ${form.nombre} registrado con éxito.` });
      setForm(emptyForm);
      // Recargar datos para actualizar los KPIs y la tabla automáticamente
      await cargarDashboard();
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'No se pudo crear el usuario.';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  // Cálculos para porcentajes del gráfico visual
  const pctDocs = kpis.totalUsuarios > 0 ? (kpis.totalDoctores / kpis.totalUsuarios) * 100 : 0;
  const pctAdmins = kpis.totalUsuarios > 0 ? (kpis.totalAdministradores / kpis.totalUsuarios) * 100 : 0;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Panel de Administración Central</h1>
          <p style={styles.subtitle}>Monitoreo de red asistencial y gestión de credenciales</p>
        </div>
        <button style={styles.refreshBtn} onClick={cargarDashboard} disabled={loading}>
          {loading ? 'Actualizando...' : 'Sincronizar Datos'}
        </button>
      </header>

      {message.text && (
        <div style={{ ...styles.alert, ...styles[message.type] }}>
          {message.text}
        </div>
      )}

      {/* SECCIÓN 1: TARJETAS KPI */}
      <section style={styles.kpiGrid}>
        <div style={{ ...styles.kpiCard, borderLeft: '4px solid #0f766e' }}>
          <span style={styles.kpiLabel}>Total Usuarios Activos</span>
          <span style={styles.kpiValue}>{kpis.totalUsuarios}</span>
        </div>
        <div style={{ ...styles.kpiCard, borderLeft: '4px solid #3b82f6' }}>
          <span style={styles.kpiLabel}>Médicos / Especialistas</span>
          <span style={styles.kpiValue}>{kpis.totalDoctores}</span>
        </div>
        <div style={{ ...styles.kpiCard, borderLeft: '4px solid #f59e0b' }}>
          <span style={styles.kpiLabel}>Personal Administrativo</span>
          <span style={styles.kpiValue}>{kpis.totalAdministradores}</span>
        </div>
      </section>

      <div style={styles.mainLayout}>
        {/* SECCIÓN 2: FORMULARIO DE REGISTRO */}
        <section style={styles.panel}>
          <h2 style={styles.panelTitle}>Registrar Nuevo Funcionario</h2>
          <form onSubmit={registrarUsuario} style={styles.form}>
            <label style={styles.label}>
              Nombre Completo:
              <input required type="text" name="nombre" value={form.nombre} onChange={handleInputChange} style={styles.input} placeholder="Ej. Dr. Andrés Bello" />
            </label>
            <label style={styles.label}>
              RUT (Identificación):
              <input required type="text" name="rut" value={form.rut} onChange={handleInputChange} style={styles.input} placeholder="12345678-9" />
            </label>
            <label style={styles.label}>
              Contraseña de Acceso:
              <input required type="password" name="password" value={form.password} onChange={handleInputChange} style={styles.input} placeholder="••••••••" />
            </label>
            <label style={styles.label}>
              Rol del Sistema:
              <select name="rol" value={form.rol} onChange={handleInputChange} style={styles.input}>
                <option value="DOCTOR">Doctor / Clínico</option>
                <option value="ADMIN">Administrador de Red</option>
              </select>
            </label>
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              Guardar Funcionario
            </button>
          </form>
        </section>

        {/* SECCIÓN 3: GRÁFICOS KPI ANALÍTICOS (SVG NATIVO) */}
        <section style={styles.panel}>
          <h2 style={styles.panelTitle}>Métricas de Personal Asistencial</h2>
          <p style={styles.chartSubtitle}>Distribución porcentual de funciones</p>
          
          <div style={styles.chartContainer}>
            {/* Gráfico de barras horizontales optimizado en CSS */}
            <div style={styles.barGroup}>
              <div style={styles.barLabelContainer}>
                <span style={styles.barLabel}>Doctores ({kpis.totalDoctores})</span>
                <span style={styles.barPct}>{pctDocs.toFixed(1)}%</span>
              </div>
              <div style={styles.barTrack}>
                <div style={{ ...styles.barFill, width: `${pctDocs}%`, background: '#3b82f6' }} />
              </div>
            </div>

            <div style={styles.barGroup}>
              <div style={styles.barLabelContainer}>
                <span style={styles.barLabel}>Administrativos ({kpis.totalAdministradores})</span>
                <span style={styles.barPct}>{pctAdmins.toFixed(1)}%</span>
              </div>
              <div style={styles.barTrack}>
                <div style={{ ...styles.barFill, width: `${pctAdmins}%`, background: '#f59e0b' }} />
              </div>
            </div>
          </div>

          <div style={styles.infoBox}>
            <strong>Nota de Arquitectura:</strong> Al no requerirse login, las credenciales registradas aquí impactan directamente las bases de datos distribuidas. Asegúrese de coordinar las asignaciones en el módulo de agendas.
          </div>
        </section>
      </div>

      {/* SECCIÓN 4: TABLA DE PERSONAL GENERAL */}
      <section style={{ ...styles.panel, marginTop: '20px' }}>
        <h2 style={styles.panelTitle}>Funcionarios de la Red</h2>
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Nombre</th>
                <th style={styles.th}>RUT</th>
                <th style={styles.th}>Rol asignado</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan="4" style={styles.empty}>No hay funcionarios registrados en bd_admin.</td>
                </tr>
              ) : (
                usuarios.map((u) => (
                  <tr key={u.id}>
                    <td style={styles.td}>{u.id}</td>
                    <td style={styles.td}><strong>{u.nombre}</strong></td>
                    <td style={styles.td}>{u.rut}</td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.badge,
                        background: u.rol === 'ADMIN' ? '#fef3c7' : '#dbeafe',
                        color: u.rol === 'ADMIN' ? '#92400e' : '#1e40af'
                      }}>
                        {u.rol}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// Estilos limpios y profesionales empotrados (Coherentes con el look-and-feel de tu ListaEsperaView)
const styles = {
  container: { padding: '24px', background: '#f8fafc', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  title: { margin: 0, fontSize: '26px', color: '#1e293b', fontWeight: '700' },
  subtitle: { margin: '4px 0 0 0', fontSize: '14px', color: '#64748b' },
  refreshBtn: { background: '#fff', border: '1px solid #cbd5e1', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#334155' },
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px', marginBottom: '24px' },
  kpiCard: { background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' },
  kpiLabel: { fontSize: '13px', color: '#64748b', fontWeight: '600' },
  kpiValue: { fontSize: '28px', color: '#0f172a', fontWeight: '700', marginTop: '4px' },
  mainLayout: { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px' },
  panel: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  panelTitle: { margin: '0 0 16px 0', fontSize: '18px', color: '#0f172a', fontWeight: '700' },
  chartSubtitle: { margin: '-12px 0 20px 0', fontSize: '13px', color: '#94a3b8' },
  form: { display: 'flex', flexDirection: 'column', gap: '14px' },
  label: { display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', fontWeight: '600', color: '#475569' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' },
  submitBtn: { background: '#0f766e', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '14px', marginTop: '8px' },
  chartContainer: { display: 'flex', flexDirection: 'column', gap: '20px', margin: '24px 0' },
  barGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  barLabelContainer: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600', color: '#334155' },
  barTrack: { width: '100%', height: '16px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: '999px', transition: 'width 0.5s ease-in-out' },
  infoBox: { background: '#f0fdfa', border: '1px solid #ccfbf1', borderRadius: '8px', padding: '14px', color: '#115e59', fontSize: '13px', lineHeight: '1.4' },
  alert: { padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: '600' },
  success: { background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' },
  error: { background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca' },
  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '8px' },
  th: { textAlign: 'left', padding: '12px', borderBottom: '2px solid #edf2f7', color: '#475569', fontSize: '13px', fontWeight: '700' },
  td: { padding: '12px', borderBottom: '1px solid #edf2f7', fontSize: '13px', color: '#334155' },
  badge: { padding: '4px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: '700' },
  empty: { textAlign: 'center', color: '#64748b', padding: '20px' }
};