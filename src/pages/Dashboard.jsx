import { useEffect, useCallback } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import KpiCard from '../components/dashboard/KpiCard';
import UserDistributionChart from '../components/dashboard/UserDistributionChart';
import RecentUsersTable from '../components/dashboard/RecentUsersTable';
import useUsers from '../hooks/useUsers';
import { useState } from 'react';

export default function Dashboard() {
  const { kpis, allUsers, loading, fetchKpis, fetchUsers } = useUsers();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const refreshData = useCallback(() => {
    fetchKpis();
    fetchUsers();
  }, [fetchKpis, fetchUsers]);

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, [refreshData]);

  return (
    <div className="d-flex" style={{ minHeight: '100vh', background: '#f7fbfb' }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-grow-1 d-flex flex-column">
        <Navbar onToggleSidebar={() => setSidebarOpen((o) => !o)} />

        <main className="flex-grow-1 p-3 p-md-4">
          <div className="mb-4">
            <h4 className="fw-bold mb-1" style={{ color: '#14213d' }}>Dashboard</h4>
            <p className="text-muted mb-0">Resumen general del sistema</p>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6 col-xl-4">
              <KpiCard
                title="Total Usuarios"
                value={kpis?.totalUsuarios}
                icon="bi-people"
                color="primary"
                loading={loading}
              />
            </div>
            <div className="col-12 col-sm-6 col-xl-4">
              <KpiCard
                title="Total Administradores"
                value={kpis?.totalAdministradores}
                icon="bi-shield-lock"
                color="warning"
                loading={loading}
              />
            </div>
            <div className="col-12 col-sm-6 col-xl-4">
              <KpiCard
                title="Total Doctores"
                value={kpis?.totalDoctores}
                icon="bi-person-badge"
                color="success"
                loading={loading}
              />
            </div>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-12 col-lg-5">
              <UserDistributionChart kpis={kpis} loading={loading} />
            </div>
            <div className="col-12 col-lg-7">
              <RecentUsersTable users={allUsers} loading={loading} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
