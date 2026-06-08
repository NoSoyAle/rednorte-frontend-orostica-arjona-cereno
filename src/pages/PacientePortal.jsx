import { useEffect, useState } from 'react';

const requests = {
  'RN-4821': {
    title: 'Hora a médico especialista',
    state: 'En preparación',
    progress: 68,
    shortTitle: 'Médico especialista',
  },
  'RN-3057': {
    title: 'Hora a exámenes',
    state: 'Revisión pendiente',
    progress: 42,
    shortTitle: 'Exámenes',
  },
  'RN-9184': {
    title: 'Interconsulta',
    state: 'Solicitud recibida',
    progress: 25,
    shortTitle: 'Interconsulta',
  },
};

const requestCodes = Object.keys(requests);

const steps = [
  ['Solicitud recibida', 'Datos registrados por la red.'],
  ['Priorización clínica', 'Equipo revisó antecedentes.'],
  ['Asignación de cupo', 'Buscando disponibilidad en la red.'],
  ['Confirmación', 'Recibirás fecha, hora y recinto.'],
];

const services = [
  {
    title: 'Hospitales',
    copy: 'Atención de urgencia, hospitalización, pabellones, derivaciones y unidades de mayor complejidad.',
  },
  {
    title: 'Centros de atención primaria',
    copy: 'Controles preventivos, vacunación, programas crónicos, salud familiar y seguimiento territorial.',
  },
  {
    title: 'Clínicas especializadas',
    copy: 'Consultas de especialidad, procedimientos ambulatorios, imagenología y exámenes de apoyo.',
  },
  {
    title: 'Orientación al paciente',
    copy: 'Información sobre requisitos, preparación para exámenes, ubicaciones y canales de contacto.',
  },
];

export default function PacientePortal() {
  const initialCode = 'RN-4821';
  const [inputCode, setInputCode] = useState(initialCode);
  const [currentCode, setCurrentCode] = useState(initialCode);
  const [selectedRequest, setSelectedRequest] = useState(requests[initialCode]);
  const [formMessage, setFormMessage] = useState('Puedes probar con RN-4821, RN-3057 o RN-9184.');
  const [messageType, setMessageType] = useState('info');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth <= 900);
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const searchRequestByCode = (code) => requests[code];

  const applyRequest = (code) => {
    const normalizedCode = code.trim().toUpperCase();

    if (!normalizedCode) {
      setFormMessage('Ingresa el código entregado por el centro de salud.');
      setMessageType('error');
      return;
    }

    const foundRequest = searchRequestByCode(normalizedCode);

    if (!foundRequest) {
      setFormMessage('No encontramos una solicitud asociada a ese código.');
      setMessageType('error');
      return;
    }

    setInputCode(normalizedCode);
    setCurrentCode(normalizedCode);
    setSelectedRequest(foundRequest);
    setFormMessage(`Solicitud encontrada para el código ${normalizedCode}.`);
    setMessageType('success');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    applyRequest(inputCode);
  };

  const handleExampleClick = (code) => {
    applyRequest(code);
  };

  const messageStyle = {
    ...s.formMessage,
    ...(messageType === 'success' ? s.formMessageSuccess : {}),
    ...(messageType === 'error' ? s.formMessageError : {}),
  };

  return (
    <div style={s.page}>
      <header style={s.header}>
        <div style={s.headerInner}>
          <a style={s.brand} href="#inicio" onClick={() => setIsMenuOpen(false)}>
            <span style={s.brandMark}>+</span>
            <span>
              <p style={s.brandName}>Red Norte Salud</p>
              <p style={s.brandSubtitle}>Portal paciente</p>
            </span>
          </a>

          <nav
            style={{
              ...s.nav,
              ...(isMobile ? s.navMobile : {}),
              ...(isMobile && isMenuOpen ? s.navOpen : {}),
            }}
            aria-label="Navegación principal"
          >
            {[
              ['Mi estado', '#mi-estado'],
              ['Servicios', '#servicios'],
              ['Red asistencial', '#red-asistencial'],
              ['Contacto', '#contacto'],
            ].map(([label, href]) => (
              <a key={href} style={s.navLink} href={href} onClick={() => setIsMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>

          <button
            style={{ ...s.menuButton, ...(isMobile ? s.menuButtonMobile : {}) }}
            type="button"
            aria-label="Abrir menú"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span style={s.menuLine} />
            <span style={s.menuLine} />
            <span style={s.menuLine} />
          </button>
        </div>
      </header>

      <main id="inicio" style={s.main}>
        <section style={{ ...s.hero, ...(isMobile ? s.heroMobile : {}) }}>
          <div>
            <p style={s.eyebrow}>Atención coordinada en hospitales, APS y clínicas especializadas</p>
            <h1 style={s.heroTitle}>Consulta tu avance y encuentra apoyo de salud sin iniciar sesión.</h1>
            <p style={s.copy}>
              Revisa el estado actual de tus solicitudes, orientación de atención y servicios disponibles en la red.
            </p>
            <div style={{ ...s.actions, ...(isMobile ? s.actionsMobile : {}) }}>
              <a style={s.primaryButton} href="#mi-estado">Ver mi estado</a>
              <a style={s.secondaryButton} href="#servicios">Explorar servicios</a>
            </div>
          </div>

          <div style={s.carePanel} aria-label="Niveles de atención">
            {[
              ['H', 'Hospital', 'Urgencia y alta complejidad'],
              ['A', 'APS', 'Control y seguimiento'],
              ['C', 'Clínica', 'Especialidades y exámenes'],
            ].map(([icon, title, copy]) => (
              <article style={s.careCard} key={title}>
                <span style={s.careIcon}>{icon}</span>
                <div>
                  <strong style={s.cardStrong}>{title}</strong>
                  <p style={s.cardText}>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section style={s.section} id="mi-estado">
          <p style={s.eyebrow}>Seguimiento paciente</p>
          <h2 style={s.sectionTitle}>Estado actual de tus solicitudes</h2>
          <p style={s.copy}>Ingresa el código entregado por el centro de salud para consultar el progreso de una solicitud.</p>

          <div style={{ ...s.statusLayout, ...(isMobile ? s.statusLayoutMobile : {}) }}>
            <article style={s.panel}>
              <form style={{ ...s.form, ...(isMobile ? s.formMobile : {}) }} onSubmit={handleSubmit}>
                <label style={s.label} htmlFor="request-code">Código de solicitud</label>
                <input
                  id="request-code"
                  style={s.input}
                  value={inputCode}
                  placeholder="Ej: RN-4821"
                  onChange={(event) => setInputCode(event.target.value.toUpperCase())}
                />
                <button style={s.primaryButton} type="submit">Consultar</button>
              </form>
              <p style={messageStyle}>{formMessage}</p>

              <div style={s.summary}>
                <span style={s.pill}><span style={s.pillLabel}>Código consultado</span>{currentCode}</span>
              </div>

              <div style={s.progressHead}>
                <h3 style={s.progressTitle}>{selectedRequest.title}</h3>
                <span style={s.statePill}>{selectedRequest.state}</span>
              </div>

              <div style={s.progressMeter} aria-label={`Avance ${selectedRequest.progress}%`}>
                <div style={s.progressLabel}>
                  <span>Avance de solicitud</span>
                  <span>{selectedRequest.progress}%</span>
                </div>
                <div style={s.progressTrack}>
                  <div style={{ ...s.progressBar, width: `${selectedRequest.progress}%` }} />
                </div>
              </div>

              <ol style={s.steps}>
                {steps.map(([title, copy], index) => {
                  const done = index < 2;
                  const active = index === 2;
                  return (
                    <li style={s.step} key={title}>
                      <span style={{ ...s.stepMarker, ...(done ? s.stepDone : {}), ...(active ? s.stepActive : {}) }}>
                        {done ? '✓' : index + 1}
                      </span>
                      <span>
                        <strong style={s.stepTitle}>{title}</strong>
                        <p style={s.stepText}>{copy}</p>
                      </span>
                    </li>
                  );
                })}
              </ol>
            </article>

            <aside style={s.panel} aria-label="Solicitudes de ejemplo">
              <h3 style={s.sideTitle}>Solicitudes de ejemplo</h3>
              {requestCodes.map((code) => {
                const request = requests[code];
                const selected = currentCode === code;
                return (
                  <button
                    style={{ ...s.exampleCard, ...(selected ? s.exampleSelected : {}) }}
                    type="button"
                    key={code}
                    onClick={() => handleExampleClick(code)}
                  >
                    <span style={s.exampleTop}>
                      <strong>{request.shortTitle}</strong>
                      <span>{request.progress}%</span>
                    </span>
                    <small style={s.smallText}>{code}</small>
                  </button>
                );
              })}
            </aside>
          </div>
        </section>

        <section style={s.section} id="servicios">
          <p style={s.eyebrow}>Qué ofrece la red</p>
          <h2 style={s.sectionTitle}>Servicios disponibles para pacientes y familias</h2>
          <div style={s.servicesGrid}>
            {services.map((service) => (
              <article style={s.serviceCard} key={service.title}>
                <h3 style={s.serviceTitle}>{service.title}</h3>
                <p style={s.serviceText}>{service.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={s.networkBand} id="red-asistencial">
          <div style={s.networkLayout}>
            <div>
              <h2 style={s.sectionTitle}>Una ruta de atención conectada</h2>
              <p style={s.networkCopy}>
                La red coordina prestadores para que cada paciente sea derivado al nivel de atención que corresponde:
                APS para seguimiento, hospitales para casos complejos y clínicas especializadas para diagnóstico o tratamiento.
              </p>
            </div>
            <ul style={s.networkList}>
              {[
                ['24/7', 'Orientación y urgencias según disponibilidad local.'],
                ['3 niveles', 'Primaria, hospitalaria y especializada.'],
                ['Seguimiento', 'Estados visibles para solicitudes relevantes.'],
              ].map(([label, copy]) => (
                <li style={s.networkStat} key={label}>
                  <strong style={s.networkNumber}>{label}</strong>
                  <span style={s.networkText}>{copy}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer style={s.footer} id="contacto">
        <div style={s.footerInner}>
          <div>
            <h3 style={s.footerTitle}>Red Norte Salud</h3>
            <p style={s.footerText}>Portal funcional para consultar solicitudes y orientar a pacientes de la red asistencial.</p>
          </div>
          <div>
            <h4 style={s.footerHeading}>Mesa de ayuda</h4>
            <p style={s.footerText}>Teléfono: 600 123 456</p>
            <p style={s.footerText}>Correo: ayuda@rednorte.cl</p>
          </div>
          <div>
            <h4 style={s.footerHeading}>Accesos</h4>
            <a style={s.footerLink} href="#mi-estado">Estado de solicitudes</a>
            <a style={s.footerLink} href="#servicios">Servicios de salud</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const s = {
  page: {
    minHeight: '100vh',
    background: 'radial-gradient(circle at top left, rgba(8,127,122,0.08), transparent 32rem), #f7fbfb',
    color: '#14213d',
    fontFamily: 'system-ui, "Segoe UI", Roboto, sans-serif',
    lineHeight: 1.5,
    textAlign: 'left',
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 20,
    borderBottom: '1px solid rgba(217,228,232,0.8)',
    background: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(14px)',
  },
  headerInner: {
    width: 'min(1160px, calc(100% - 32px))',
    minHeight: 72,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 18,
    position: 'relative',
  },
  brand: { display: 'flex', alignItems: 'center', gap: 12, color: 'inherit', textDecoration: 'none' },
  brandMark: {
    width: 42,
    height: 42,
    display: 'grid',
    placeItems: 'center',
    borderRadius: 8,
    background: '#087f7a',
    color: '#fff',
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 1,
  },
  brandName: { margin: 0, color: '#14213d', fontSize: 16, fontWeight: 800, lineHeight: 1.2 },
  brandSubtitle: { margin: '2px 0 0', color: '#5f6f7f', fontSize: 13 },
  nav: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' },
  navMobile: {
    position: 'absolute',
    top: 72,
    right: 0,
    left: 0,
    display: 'none',
    flexDirection: 'column',
    alignItems: 'stretch',
    border: '1px solid #d9e4e8',
    borderRadius: 8,
    background: '#fff',
    padding: 8,
    boxShadow: '0 16px 36px rgba(20,33,61,0.13)',
  },
  navOpen: { display: 'flex' },
  navLink: {
    borderRadius: 8,
    color: '#5f6f7f',
    fontSize: 14,
    fontWeight: 700,
    padding: '10px 12px',
    textDecoration: 'none',
  },
  menuButton: {
    display: 'none',
    width: 42,
    height: 42,
    border: '1px solid #d9e4e8',
    borderRadius: 8,
    background: '#fff',
    color: '#14213d',
    cursor: 'pointer',
  },
  menuButtonMobile: { display: 'block' },
  menuLine: { display: 'block', width: 18, height: 2, margin: '4px auto', borderRadius: 2, background: 'currentColor' },
  main: {},
  hero: {
    width: 'min(1160px, calc(100% - 32px))',
    minHeight: 'calc(100vh - 72px)',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))',
    alignItems: 'center',
    gap: 48,
    padding: '56px 0 48px',
  },
  heroMobile: { minHeight: 'auto', gap: 28, paddingTop: 36 },
  eyebrow: {
    margin: '0 0 12px',
    color: '#087f7a',
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  heroTitle: { maxWidth: 720, margin: 0, color: '#14213d', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 800, lineHeight: 1.08 },
  sectionTitle: { margin: 0, color: '#14213d', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.1 },
  copy: { maxWidth: 660, margin: '18px 0 0', color: '#5f6f7f', fontSize: 18 },
  actions: { display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 },
  actionsMobile: { display: 'grid', gridTemplateColumns: '1fr' },
  primaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
    border: '1px solid transparent',
    borderRadius: 8,
    padding: '0 18px',
    background: '#087f7a',
    color: '#fff',
    font: 'inherit',
    fontSize: 15,
    fontWeight: 800,
    cursor: 'pointer',
    textDecoration: 'none',
  },
  secondaryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
    border: '1px solid #d9e4e8',
    borderRadius: 8,
    padding: '0 18px',
    background: '#fff',
    color: '#14213d',
    fontSize: 15,
    fontWeight: 800,
    textDecoration: 'none',
  },
  carePanel: { display: 'grid', gap: 14 },
  careCard: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: 14,
    border: '1px solid #d9e4e8',
    borderRadius: 8,
    background: '#fff',
    boxShadow: '0 18px 45px rgba(20,33,61,0.08)',
    padding: 18,
  },
  careIcon: {
    width: 42,
    height: 42,
    display: 'grid',
    placeItems: 'center',
    borderRadius: 8,
    background: '#eef6f4',
    color: '#087f7a',
    fontWeight: 900,
  },
  cardStrong: { color: '#14213d' },
  cardText: { margin: 0, color: '#5f6f7f' },
  section: { width: 'min(1160px, calc(100% - 32px))', margin: '0 auto', padding: '74px 0' },
  statusLayout: {
    display: 'grid',
    gridTemplateColumns: 'minmax(min(100%, 560px), 1fr) minmax(min(100%, 300px), 340px)',
    gap: 20,
    marginTop: 28,
  },
  statusLayoutMobile: { gridTemplateColumns: '1fr' },
  panel: {
    border: '1px solid #d9e4e8',
    borderRadius: 8,
    background: '#fff',
    boxShadow: '0 18px 45px rgba(20,33,61,0.08)',
    padding: 24,
  },
  form: { display: 'grid', gridTemplateColumns: 'minmax(180px, 1fr) auto', gap: 12, marginTop: 4 },
  formMobile: { gridTemplateColumns: '1fr' },
  label: { gridColumn: '1 / -1', color: '#14213d', fontSize: 14, fontWeight: 800 },
  input: {
    width: '100%',
    minHeight: 46,
    border: '1px solid #d9e4e8',
    borderRadius: 8,
    padding: '0 14px',
    background: '#fff',
    color: '#14213d',
    font: 'inherit',
    textTransform: 'uppercase',
  },
  formMessage: { margin: '12px 0 0', color: '#5f6f7f', fontSize: 14 },
  formMessageSuccess: { color: '#087f7a' },
  formMessageError: { color: '#b42318' },
  summary: { marginTop: 22 },
  pill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    maxWidth: '100%',
    borderRadius: 999,
    background: '#eef6f4',
    color: '#087f7a',
    fontSize: 13,
    fontWeight: 800,
    padding: '7px 11px',
  },
  pillLabel: { color: '#5f6f7f', fontWeight: 700 },
  progressHead: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginTop: 18, flexWrap: 'wrap' },
  progressTitle: { margin: 0, color: '#14213d', fontSize: 26, lineHeight: 1.2 },
  statePill: { borderRadius: 999, background: 'rgba(216,140,31,0.13)', color: '#87530f', fontSize: 13, fontWeight: 800, padding: '7px 11px' },
  progressMeter: { marginTop: 22 },
  progressLabel: { display: 'flex', justifyContent: 'space-between', color: '#5f6f7f', fontSize: 14, fontWeight: 800 },
  progressTrack: { height: 12, marginTop: 8, overflow: 'hidden', borderRadius: 999, background: '#e7eef1' },
  progressBar: { height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, #087f7a, #4d9f61)', transition: 'width 220ms ease' },
  steps: { display: 'grid', gap: 16, margin: '26px 0 0', padding: 0, listStyle: 'none' },
  step: { display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 12 },
  stepMarker: {
    width: 28,
    height: 28,
    display: 'grid',
    placeItems: 'center',
    border: '1px solid #d9e4e8',
    borderRadius: '50%',
    background: '#fff',
    color: '#5f6f7f',
    fontSize: 13,
    fontWeight: 900,
  },
  stepDone: { borderColor: '#4d9f61', background: '#4d9f61', color: '#fff' },
  stepActive: { borderColor: '#087f7a', background: '#087f7a', color: '#fff' },
  stepTitle: { display: 'block', color: '#14213d' },
  stepText: { margin: '2px 0 0', color: '#5f6f7f', fontSize: 14 },
  sideTitle: { margin: '0 0 16px', color: '#14213d', fontSize: 20 },
  exampleCard: {
    width: '100%',
    display: 'grid',
    gap: 7,
    border: '1px solid #d9e4e8',
    borderRadius: 8,
    background: '#fff',
    color: '#14213d',
    padding: 14,
    marginTop: 10,
    textAlign: 'left',
    cursor: 'pointer',
  },
  exampleSelected: { borderColor: 'rgba(8,127,122,0.7)', background: '#eef6f4' },
  exampleTop: { display: 'flex', justifyContent: 'space-between', gap: 12 },
  smallText: { color: '#5f6f7f', fontSize: 13 },
  servicesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 16, marginTop: 28 },
  serviceCard: { border: '1px solid #d9e4e8', borderRadius: 8, background: '#fff', padding: 20 },
  serviceTitle: { margin: 0, color: '#14213d', fontSize: 18 },
  serviceText: { margin: '10px 0 0', color: '#5f6f7f', fontSize: 15 },
  networkBand: { background: '#eef6f4' },
  networkLayout: {
    width: 'min(1160px, calc(100% - 32px))',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
    gap: 42,
    padding: '72px 0',
  },
  networkCopy: { marginTop: 18, color: '#5f6f7f', fontSize: 17 },
  networkList: { display: 'grid', gap: 12, margin: 0, padding: 0, listStyle: 'none' },
  networkStat: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 12,
    border: '1px solid rgba(8,127,122,0.18)',
    borderRadius: 8,
    background: 'rgba(255,255,255,0.74)',
    padding: 16,
  },
  networkNumber: { color: '#087f7a', fontSize: 22 },
  networkText: { maxWidth: 230, color: '#5f6f7f', fontSize: 14 },
  footer: { background: '#102235', color: '#fff' },
  footerInner: {
    width: 'min(1160px, calc(100% - 32px))',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
    gap: 32,
    padding: '40px 0',
  },
  footerTitle: { margin: 0, color: '#fff' },
  footerHeading: { margin: '0 0 12px', color: '#fff' },
  footerText: { margin: '0 0 6px', color: '#c9d6df', fontSize: 14 },
  footerLink: { display: 'block', marginTop: 8, color: '#c9d6df', fontSize: 14, textDecoration: 'none' },
};
