import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import LandingPage from './components/LandingPage';
import RoleSelection from './components/RoleSelection';
import AdminDashboard from './components/admin/AdminDashboard';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import PatientDashboard from './components/patient/PatientDashboard';

export type UserRole = 'admin' | 'doctor' | 'patient' | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'roleSelection' | 'dashboard'>('landing');
  const [userRole, setUserRole] = useState<UserRole>(null);

  const handleGetStarted = () => {
    setCurrentPage('roleSelection');
  };

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage('landing');
  };

  return (
    <ThemeProvider>
      {currentPage === 'landing' && <LandingPage onGetStarted={handleGetStarted} />}
      {currentPage === 'roleSelection' && <RoleSelection onLogin={handleLogin} />}
      {currentPage === 'dashboard' && userRole === 'admin' && <AdminDashboard onLogout={handleLogout} />}
      {currentPage === 'dashboard' && userRole === 'doctor' && <DoctorDashboard onLogout={handleLogout} />}
      {currentPage === 'dashboard' && userRole === 'patient' && <PatientDashboard onLogout={handleLogout} />}
    </ThemeProvider>
  );
}
