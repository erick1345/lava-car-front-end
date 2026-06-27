import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { servicoService } from '../../services/crud';
import { getApiErrorMessage } from '../../services/api';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';

interface FormState {
  nome: string;
  descricao: string;
  preco: string;
  duracao_min: string;
}

const EMPTY: FormState = { nome: '', descricao: '', preco: '', duracao_min: '' };

export default function ServicoForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    servicoService.get(Number(id)).then((s) =>
      setForm({ nome: s.nome, descricao: s.descricao, preco: String(s.preco), duracao_min: String(s.duracao_min) })
    );
  }, [id]);

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.nome.trim()) next.nome = 'Nome é obrigatório';
    if (!(Number(form.preco) >= 0) || form.preco === '') next.preco = 'Preço inválido';
    if (!(Number(form.duracao_min) > 0)) next.duracao_min = 'Duração inválida';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setLoading(true);
    const dto = { nome: form.nome, descricao: form.descricao, preco: Number(form.preco), duracao_min: Number(form.duracao_min) };
    try {
      if (editing) await servicoService.update(Number(id), dto);
      else await servicoService.create(dto);
      navigate('/servicos');
    } catch (err) {
      setApiError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <Card title={editing ? 'Editar serviço' : 'Novo serviço'}>
        <form className="form" onSubmit={handleSubmit}>
          <Alert type="error" message={apiError} />
          <Input label="Nome" name="nome" value={form.nome} onChange={handleChange} error={errors.nome} />
          <Input label="Descrição" name="descricao" value={form.descricao} onChange={handleChange} />
          <Input label="Preço (R$)" name="preco" type="number" value={form.preco} onChange={handleChange} error={errors.preco} />
          <Input label="Duração (min)" name="duracao_min" type="number" value={form.duracao_min} onChange={handleChange} error={errors.duracao_min} />
          <div className="form__actions">
            <Button type="submit" loading={loading}>{editing ? 'Salvar' : 'Cadastrar'}</Button>
            <Button variant="secondary" onClick={() => navigate('/servicos')}>Cancelar</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
