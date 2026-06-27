import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { agendamentoService } from '../../services/crud';
import { usePaginatedList } from '../../hooks/usePaginatedList';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Pagination } from '../../components/ui/Pagination';

export default function AgendamentosList() {
  const { user } = useAuth();
  const isAdmin = user?.nivel_acesso === 'admin';
  const { data, page, setPage, total, limit, loading, reload } = usePaginatedList(agendamentoService.list);
  const navigate = useNavigate();

  async function handleDelete(id: number): Promise<void> {
    if (!window.confirm('Excluir este agendamento?')) return;
    await agendamentoService.remove(id);
    reload();
  }

  return (
    <div className="page page--wide">
      <div className="toolbar">
        <h1>{isAdmin ? 'Todos os agendamentos' : 'Meus agendamentos'}</h1>
        <Button onClick={() => navigate('/agendamentos/novo')}>+ Novo agendamento</Button>
      </div>
      <Card>
        {loading ? <p>Carregando...</p> : (
          <table className="table">
            <thead>
              <tr><th>Serviço</th><th>Data</th><th>Horário</th><th>Status</th>{isAdmin ? <th>Cliente</th> : null}<th>Ações</th></tr>
            </thead>
            <tbody>
              {data.map((a) => (
                <tr key={a.id}>
                  <td>{a.servico_nome}</td>
                  <td>{a.data_agendada}</td>
                  <td>{a.horario}</td>
                  <td><span className={`badge-status badge-status--${a.status}`}>{a.status}</span></td>
                  {isAdmin ? <td>{a.usuario_nome}</td> : null}
                  <td className="table__actions">
                    <button className="link-danger" onClick={() => handleDelete(a.id)}>Excluir</button>
                  </td>
                </tr>
              ))}
              {data.length === 0 ? <tr><td colSpan={6} className="table__empty">Nenhum agendamento.</td></tr> : null}
            </tbody>
          </table>
        )}
        <Pagination page={page} total={total} limit={limit} onPage={setPage} />
      </Card>
    </div>
  );
}
