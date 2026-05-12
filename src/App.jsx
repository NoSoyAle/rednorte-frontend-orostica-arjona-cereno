import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminPortal from './pages/AdminPortal';
import PrivateRoute from './components/PrivateRoute';
import DoctorDashboard from './pages/portales_doctor/DashboardDoctor';
import ModificarPerfil from './pages/portales_doctor/ModificarPerfil';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={
        <PrivateRoute rol="ADMIN"><AdminPortal /></PrivateRoute> } />
        <Route path="/PanelDoctor" element={<DoctorDashboard />} />
        <Route path="/Modificar" element={<ModificarPerfil />} />
      </Routes>
    </BrowserRouter>
  );
}