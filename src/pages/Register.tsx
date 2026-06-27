import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerRequest } from '../services/authService';
import { getApiErrorMessage } from '../services/api';
import { isCpfValid, isEmailValid, isPasswordStrong, formatCpf, onlyDigits } from '../utils/validators';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';

interface RegisterForm {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  confirmarSenha: string;
}

type RegisterErrors = Partial<Record<keyof RegisterForm, string>>;

const EMPTY: RegisterForm = { nome: '', email: '', cpf: '', senha: '', confirmarSenha: '' };

export default function Register() {
  const [form, setForm] = useState<RegisterForm>(EMPTY);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'cpf' ? formatCpf(value) : value });
  }

  function validate(): boolean {
    const next: RegisterErrors = {};
    if (!form.nome.trim()) next.nome = 'Informe o nome';
    if (!isEmailValid(form.email)) next.email = 'Email inválido';
    if (!isCpfValid(form.cpf)) next.cpf = 'CPF inválido';
    if (!isPasswordStrong(form.senha)) next.senha = 'Mínimo 8 caracteres e 1 número';
    if (form.senha !== form.confirmarSenha) next.confirmarSenha = 'As senhas não conferem';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setLoading(true);
    try {
      await registerRequest({ nome: form.nome, email: form.email, cpf: onlyDigits(form.cpf), senha: form.senha });
      navigate('/login');
    } catch (err) {
      setApiError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <Card title="Criar conta" subtitle="Cadastre-se para agendar sua lavagem">
        <form className="form" onSubmit={handleSubmit}>
          <Alert type="error" message={apiError} />
          <Input label="Nome" name="nome" value={form.nome} onChange={handleChange} error={errors.nome} />
          <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
          <Input label="CPF" name="cpf" value={form.cpf} onChange={handleChange} error={errors.cpf} placeholder="000.000.000-00" />
          <Input label="Senha" name="senha" type="password" value={form.senha} onChange={handleChange} error={errors.senha} />
          <Input label="Confirmar senha" name="confirmarSenha" type="password" value={form.confirmarSenha} onChange={handleChange} error={errors.confirmarSenha} />
          <Button type="submit" loading={loading}>Cadastrar</Button>
        </form>
        <p className="auth-page__hint">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </Card>
    </div>
  );
}
