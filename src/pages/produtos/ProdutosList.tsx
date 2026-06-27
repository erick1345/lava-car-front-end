import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { produtoService } from '../../services/crud';
import { usePaginatedList } from '../../hooks/usePaginatedList';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Pagination } from '../../components/ui/Pagination';

export default function ProdutosList() {
  const { user } = useAuth();
  const isAdmin = user?.nivel_acesso === 'admin';
  const { data, page, setPage, total, limit, loading, reload } = usePaginatedList(produtoService.list);
  const navigate = useNavigate();

  async function handleDelete(id: number): Promise<void> {
    if (!window.confirm('Excluir este produto?')) return;
    await produtoService.remove(id);
    reload();
  }

  return (
    <div className="page page--wide">
      <div className="toolbar">
        <h1>Estoque de produtos</h1>
        {isAdmin ? <Button onClick={() => navigate('/produtos/novo')}>+ Novo produto</Button> : null}
      </div>
      <Card>
        {loading ? <p>Carregando...</p> : (
          <table className="table">
            <thead>
              <tr><th>Nome</th><th>Categoria</th><th>Qtd.</th><th>Preço</th>{isAdmin ? <th>Ações</th> : null}</tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>{p.categoria}</td>
                  <td>{p.quantidade}</td>
                  <td>R$ {p.preco.toFixed(2)}</td>
                  {isAdmin ? (
                    <td className="table__actions">
                      <Link to={`/produtos/${p.id}/editar`}>Editar</Link>
                      <button className="link-danger" onClick={() => handleDelete(p.id!)}>Excluir</button>
                    </td>
                  ) : null}
                </tr>
              ))}
              {data.length === 0 ? <tr><td colSpan={5} className="table__empty">Nenhum produto cadastrado.</td></tr> : null}
            </tbody>
          </table>
        )}
        <Pagination page={page} total={total} limit={limit} onPage={setPage} />
      </Card>
    </div>
  );
}
