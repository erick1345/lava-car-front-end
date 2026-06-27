import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { servicoService } from '../../services/crud';
import { usePaginatedList } from '../../hooks/usePaginatedList';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Pagination } from '../../components/ui/Pagination';

export default function ServicosList() {
  const { user } = useAuth();
  const isAdmin = user?.nivel_acesso === 'admin';
  const { data, page, setPage, total, limit, loading, reload } = usePaginatedList(servicoService.list);
  const navigate = useNavigate();

  async function handleDelete(id: number): Promise<void> {
    if (!window.confirm('Excluir este serviço?')) return;
    await servicoService.remove(id);
    reload();
  }

  return (
    <div className="page page--wide">
      <div className="toolbar">
        <h1>Serviços de lavagem</h1>
        {isAdmin ? <Button onClick={() => navigate('/servicos/novo')}>+ Novo serviço</Button> : null}
      </div>
      <Card>
        {loading ? <p>Carregando...</p> : (
          <table className="table">
            <thead>
              <tr><th>Nome</th><th>Descrição</th><th>Preço</th><th>Duração</th>{isAdmin ? <th>Ações</th> : null}</tr>
            </thead>
            <tbody>
              {data.map((s) => (
                <tr key={s.id}>
                  <td>{s.nome}</td>
                  <td>{s.descricao}</td>
                  <td>R$ {s.preco.toFixed(2)}</td>
                  <td>{s.duracao_min} min</td>
                  {isAdmin ? (
                    <td className="table__actions">
                      <Link to={`/servicos/${s.id}/editar`}>Editar</Link>
                      <button className="link-danger" onClick={() => handleDelete(s.id!)}>Excluir</button>
                    </td>
                  ) : null}
                </tr>
              ))}
              {data.length === 0 ? <tr><td colSpan={5} className="table__empty">Nenhum serviço cadastrado.</td></tr> : null}
            </tbody>
          </table>
        )}
        <Pagination page={page} total={total} limit={limit} onPage={setPage} />
      </Card>
    </div>
  );
}
