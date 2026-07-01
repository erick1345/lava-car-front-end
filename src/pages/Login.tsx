import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { login as loginRequest } from '../services/authService';
import { getApiErrorMessage } from '../services/api';
import { isEmailValid } from '../utils/validators';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Alert } from '../components/ui/Alert';

interface LoginErrors {
  email?: string;
  senha?: string;
}

export default function Login() {
  const [form, setForm] = useState({ email: '', senha: '' });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate(): boolean {
    const next: LoginErrors = {};
    if (!isEmailValid(form.email)) next.email = 'Email inválido';
    if (!form.senha) next.senha = 'Informe a senha';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setLoading(true);
    try {
      login(await loginRequest(form));
      navigate('/painel');
    } catch (err) {
      setApiError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <Card title="Entrar" subtitle="Acesse sua conta do Lava Car">
        <form className="form" onSubmit={handleSubmit}>
          <Alert type="error" message={apiError} />
          <Input label="Email" name="email" type="email" value={form.email}
            onChange={handleChange} error={errors.email} placeholder="voce@email.com" />
          <Input label="Senha" name="senha" type="password" value={form.senha}
            onChange={handleChange} error={errors.senha} placeholder="••••••••" />
          <Button type="submit" loading={loading}>Entrar</Button>
        </form>
        <p className="auth-page__hint">
          Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </Card>
    </div>
  );
}
