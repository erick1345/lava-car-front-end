import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navbar } from './layout/Navbar';
import { Footer } from './layout/Footer';

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-shell__content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
