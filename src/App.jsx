import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Users = lazy(() => import('./pages/Users'));
const Doctors = lazy(() => import('./pages/Doctors'));
const DoctorNew = lazy(() => import('./pages/DoctorNew'));
const PacientePortal = lazy(() => import('./pages/PacientePortal'));
const NotFound = lazy(() => import('./pages/NotFound'));

const DoctorDashboard = lazy(() => import('./pages/portales_doctor/DashboardDoctor'));
const ModificarPerfil = lazy(() => import('./pages/portales_doctor/ModificarPerfil'));
const AgendaMensual = lazy(() => import('./pages/portales_doctor/AgendaMensual'));
const AgendaDiaria = lazy(() => import('./pages/portales_doctor/AgendaDia'));
const Register = lazy(() => import('./pages/Register'));

function LoadingFallback() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: '#f7fbfb' }}>
      <div className="spinner-border" role="status" style={{ color: '#087f7a' }}>
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/paciente" element={<PacientePortal />} />
        <Route path="/pacientes" element={<PacientePortal />} />
        <Route path="/pacientes/portal" element={<PacientePortal />} />
        <Route path="/register" element={<Register />} />
        <Route path="/PanelDoctor" element={<DoctorDashboard />} />
        <Route path="/Modificar" element={<ModificarPerfil />} />
        <Route path="/AgendaMensual" element={<AgendaMensual />} />
        <Route path="/AgendaDia" element={<AgendaDiaria />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/users/:rut" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/doctors" element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
        <Route path="/doctors/new" element={<ProtectedRoute><DoctorNew /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
