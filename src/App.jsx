import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminPortal from './pages/AdminPortal';
import PacientePortal from './pages/PacientePortal';
import PrivateRoute from './components/PrivateRoute';

import DoctorDashboard from './pages/portales_doctor/DashboardDoctor';
import ModificarPerfil from './pages/portales_doctor/ModificarPerfil';
import AgendaMensual from './pages/portales_doctor/AgendaMensual';
import AgendaDiaria from './pages/portales_doctor/AgendaDia';
import Register from './pages/Register';

import ListaEsperaView from './pages/admin/ListaEsperaView';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/paciente" element={<PacientePortal />} />
        <Route path="/pacientes" element={<PacientePortal />} />
        <Route path="/pacientes/portal" element={<PacientePortal />} />
        <Route path="/lista-espera" element={<ListaEsperaView />} />
        <Route path="/admin" element={
          <PrivateRoute rol="ADMIN"><AdminPortal /></PrivateRoute>
        } />
         <Route path="/PanelDoctor" element={<DoctorDashboard />} />
        <Route path="/Modificar" element={<ModificarPerfil />} />
        <Route path="/AgendaMensual" element={<AgendaMensual />} />
        <Route path="/AgendaDia" element={<AgendaDiaria />} />
        <Route path="/register" element={<Register />}/>

      </Routes>
    </BrowserRouter>
  );
}
