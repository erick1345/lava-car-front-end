import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ServicosList from './pages/servicos/ServicosList';
import ServicoForm from './pages/servicos/ServicoForm';
import ProdutosList from './pages/produtos/ProdutosList';
import ProdutoForm from './pages/produtos/ProdutoForm';
import AgendamentosList from './pages/agendamentos/AgendamentosList';
import AgendamentoForm from './pages/agendamentos/AgendamentoForm';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/servicos" element={<ServicosList />} />
        <Route path="/servicos/novo" element={<ServicoForm />} />
        <Route path="/servicos/:id/editar" element={<ServicoForm />} />
        <Route path="/produtos" element={<ProdutosList />} />
        <Route path="/produtos/novo" element={<ProdutoForm />} />
        <Route path="/produtos/:id/editar" element={<ProdutoForm />} />
        <Route path="/agendamentos" element={<AgendamentosList />} />
        <Route path="/agendamentos/novo" element={<AgendamentoForm />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
