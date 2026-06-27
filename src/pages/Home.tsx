import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/ui/Card';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="page">
      <Card title={`Olá, ${user?.nome ?? ''}!`} subtitle="Painel do Lava Car">
        <div className="home-grid">
          <article className="home-card">
            <h2>🗓️ Agendamentos</h2>
            <p>Agende sua lavagem e acompanhe os horários. (em breve)</p>
          </article>
          <article className="home-card">
            <h2>📦 Estoque</h2>
            <p>Controle de produtos da distribuidora. (em breve)</p>
          </article>
        </div>
      </Card>
    </div>
  );
}
