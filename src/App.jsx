import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminPortal from './pages/AdminPortal';
import PrivateRoute from './components/PrivateRoute';
import DoctorDashboard from './pages/portales_doctor/DashboardDoctor';
import ModificarPerfil from './pages/portales_doctor/ModificarPerfil';
import AgendaMensual from './pages/portales_doctor/AgendaMensual';
import AgendaDiaria from './pages/portales_doctor/AgendaDia';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={
        <PrivateRoute rol="ADMIN"><AdminPortal /></PrivateRoute> } />
        <Route path="/PanelDoctor" element={<DoctorDashboard />} />
        <Route path="/Modificar" element={<ModificarPerfil />} />
        <Route path="/AgendaMensual" element={<AgendaMensual />} />
        <Route path="/AgendaDia" element={<AgendaDiaria />} />
      </Routes>
    </BrowserRouter>
  );
}