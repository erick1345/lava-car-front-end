import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from '../services/authService';
import { getApiErrorMessage } from '../services/api';
import { isCpfValid, isPasswordStrong, formatCpf, onlyDigits } from '../utils/validators';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';

interface ProfileForm {
  nome: string;
  cpf: string;
  senha: string;
  confirmarSenha: string;
}

type ProfileErrors = Partial<Record<keyof ProfileForm, string>>;

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState<ProfileForm>({
    nome: user?.nome ?? '',
    cpf: formatCpf(user?.cpf ?? ''),
    senha: '',
    confirmarSenha: ''
  });
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'cpf' ? formatCpf(value) : value });
  }

  function validate(): boolean {
    const next: ProfileErrors = {};
    if (!form.nome.trim()) next.nome = 'Informe o nome';
    if (!isCpfValid(form.cpf)) next.cpf = 'CPF inválido';
    if (!isPasswordStrong(form.senha)) next.senha = 'Mínimo 8 caracteres e 1 número';
    if (form.senha !== form.confirmarSenha) next.confirmarSenha = 'As senhas não conferem';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setApiError('');
    setSuccess('');
    if (!validate()) return;
    setLoading(true);
    try {
      const updated = await updateProfile({ nome: form.nome, cpf: onlyDigits(form.cpf), senha: form.senha });
      setUser(updated);
      setSuccess('Perfil atualizado com sucesso');
    } catch (err) {
      setApiError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <Card title="Meu perfil" subtitle="Atualize seus dados">
        <form className="form" onSubmit={handleSubmit}>
          <Alert type="error" message={apiError} />
          <Alert type="success" message={success} />
          <Input label="Email (não editável)" name="email" value={user?.email ?? ''} onChange={handleChange} disabled />
          <Input label="Nome" name="nome" value={form.nome} onChange={handleChange} error={errors.nome} />
          <Input label="CPF" name="cpf" value={form.cpf} onChange={handleChange} error={errors.cpf} />
          <Input label="Nova senha" name="senha" type="password" value={form.senha} onChange={handleChange} error={errors.senha} />
          <Input label="Confirmar senha" name="confirmarSenha" type="password" value={form.confirmarSenha} onChange={handleChange} error={errors.confirmarSenha} />
          <Button type="submit" loading={loading}>Salvar alterações</Button>
        </form>
      </Card>
    </div>
  );
}
