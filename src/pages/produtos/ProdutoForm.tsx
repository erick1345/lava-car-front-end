import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { produtoService } from '../../services/crud';
import { getApiErrorMessage } from '../../services/api';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';

interface FormState {
  nome: string;
  categoria: string;
  quantidade: string;
  preco: string;
}

const EMPTY: FormState = { nome: '', categoria: '', quantidade: '', preco: '' };

export default function ProdutoForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    produtoService.get(Number(id)).then((p) =>
      setForm({ nome: p.nome, categoria: p.categoria, quantidade: String(p.quantidade), preco: String(p.preco) })
    );
  }, [id]);

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.nome.trim()) next.nome = 'Nome é obrigatório';
    if (!(Number(form.quantidade) >= 0) || form.quantidade === '') next.quantidade = 'Quantidade inválida';
    if (!(Number(form.preco) >= 0) || form.preco === '') next.preco = 'Preço inválido';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setLoading(true);
    const dto = { nome: form.nome, categoria: form.categoria, quantidade: Number(form.quantidade), preco: Number(form.preco) };
    try {
      if (editing) await produtoService.update(Number(id), dto);
      else await produtoService.create(dto);
      navigate('/produtos');
    } catch (err) {
      setApiError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <Card title={editing ? 'Editar produto' : 'Novo produto'}>
        <form className="form" onSubmit={handleSubmit}>
          <Alert type="error" message={apiError} />
          <Input label="Nome" name="nome" value={form.nome} onChange={handleChange} error={errors.nome} />
          <Input label="Categoria" name="categoria" value={form.categoria} onChange={handleChange} />
          <Input label="Quantidade" name="quantidade" type="number" value={form.quantidade} onChange={handleChange} error={errors.quantidade} />
          <Input label="Preço (R$)" name="preco" type="number" value={form.preco} onChange={handleChange} error={errors.preco} />
          <div className="form__actions">
            <Button type="submit" loading={loading}>{editing ? 'Salvar' : 'Cadastrar'}</Button>
            <Button variant="secondary" onClick={() => navigate('/produtos')}>Cancelar</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
