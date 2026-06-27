import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { servicoService, agendamentoService } from '../../services/crud';
import { getApiErrorMessage } from '../../services/api';
import type { IServico } from '../../types';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';

interface FormState {
  servico_id: string;
  data_agendada: string;
  horario: string;
}

const EMPTY: FormState = { servico_id: '', data_agendada: '', horario: '' };

export default function AgendamentoForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [servicos, setServicos] = useState<IServico[]>([]);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    servicoService.list(1, 100).then((r) => setServicos(r.data));
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.servico_id) next.servico_id = 'Selecione um serviço';
    if (!form.data_agendada) next.data_agendada = 'Informe a data';
    if (!form.horario) next.horario = 'Informe o horário';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setLoading(true);
    try {
      await agendamentoService.create({
        servico_id: Number(form.servico_id),
        data_agendada: form.data_agendada,
        horario: form.horario
      });
      navigate('/agendamentos');
    } catch (err) {
      setApiError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <Card title="Novo agendamento" subtitle="Escolha o serviço e o horário">
        <form className="form" onSubmit={handleSubmit}>
          <Alert type="error" message={apiError} />
          <label className="field">
            <span className="field__label">Serviço</span>
            <select className="field__input" name="servico_id" value={form.servico_id} onChange={handleChange}>
              <option value="">Selecione...</option>
              {servicos.map((s) => (
                <option key={s.id} value={s.id}>{s.nome} — R$ {s.preco.toFixed(2)}</option>
              ))}
            </select>
            {errors.servico_id ? <span className="field__error">{errors.servico_id}</span> : null}
          </label>
          <Input label="Data" name="data_agendada" type="date" value={form.data_agendada} onChange={handleChange} error={errors.data_agendada} />
          <Input label="Horário" name="horario" type="time" value={form.horario} onChange={handleChange} error={errors.horario} />
          <div className="form__actions">
            <Button type="submit" loading={loading}>Agendar</Button>
            <Button variant="secondary" onClick={() => navigate('/agendamentos')}>Cancelar</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
