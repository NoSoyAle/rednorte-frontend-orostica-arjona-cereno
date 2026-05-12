import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminPortal from './pages/AdminPortal';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={
          <PrivateRoute rol="ADMIN"><AdminPortal /></PrivateRoute>
        } />
        <Route path="/register" element={<Register />}/>
      </Routes>
    </BrowserRouter>
  );
}