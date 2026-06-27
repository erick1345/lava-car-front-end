import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout(): void {
    logout();
    navigate('/login');
  }

  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">🚗 Lava Car</Link>
      <nav className="navbar__menu">
        <Link to="/" className="navbar__link">Início</Link>
        <Link to="/agendamentos" className="navbar__link">Agendamentos</Link>
        <Link to="/servicos" className="navbar__link">Serviços</Link>
        <Link to="/produtos" className="navbar__link">Estoque</Link>
        <Link to="/perfil" className="navbar__link">Perfil</Link>
        <span className="navbar__user">{user?.nome}</span>
        <Button variant="ghost" onClick={handleLogout}>Sair</Button>
      </nav>
    </header>
  );
}
