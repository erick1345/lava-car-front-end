import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Servico {
  icon: string;
  titulo: string;
  descricao: string;
}

const SERVICOS: Servico[] = [
  { icon: '🧼', titulo: 'Lavagem Técnica', descricao: 'Higienização detalhada da pintura, rodas e vidros com produtos premium.' },
  { icon: '✨', titulo: 'Polimento Técnico', descricao: 'Correção de riscos e swirls, devolvendo o brilho profundo da pintura.' },
  { icon: '💎', titulo: 'Cristalização', descricao: 'Proteção que realça o brilho e facilita a manutenção da lataria.' },
  { icon: '🛡️', titulo: 'Vitrificação', descricao: 'Camada cerâmica de alta durabilidade contra sol, chuva e contaminantes.' },
  { icon: '🧴', titulo: 'Higienização Interna', descricao: 'Limpeza profunda de bancos, forração e ar-condicionado.' },
  { icon: '🔧', titulo: 'Lavagem de Motor', descricao: 'Remoção segura de sujeira e oleosidade do compartimento do motor.' },
  { icon: '🪄', titulo: 'Revitalização de Plásticos', descricao: 'Recuperação da cor e do acabamento de plásticos internos e externos.' },
  { icon: '🏆', titulo: 'Detalhamento Completo', descricao: 'O pacote definitivo: pintura, interior, motor e proteção em um só serviço.' }
];

const DIFERENCIAIS = [
  { icon: '⭐', titulo: 'Produtos Premium' },
  { icon: '👨‍🔧', titulo: 'Equipe Especializada' },
  { icon: '✅', titulo: 'Garantia de Qualidade' },
  { icon: '📅', titulo: 'Atendimento Agendado' },
  { icon: '💠', titulo: 'Acabamento Profissional' },
  { icon: '⚙️', titulo: 'Tecnologia de Ponta' }
];

interface Stat {
  alvo: number;
  sufixo: string;
  rotulo: string;
}

const STATS: Stat[] = [
  { alvo: 1000, sufixo: '+', rotulo: 'veículos atendidos' },
  { alvo: 500, sufixo: '+', rotulo: 'clientes satisfeitos' },
  { alvo: 5, sufixo: '', rotulo: 'anos de experiência' },
  { alvo: 98, sufixo: '%', rotulo: 'de satisfação' }
];

const DEPOIMENTOS = [
  { nome: 'Rafael M.', texto: 'Meu carro saiu como novo. Acabamento impecável e atendimento nota 10.' },
  { nome: 'Juliana S.', texto: 'A vitrificação durou muito além do que eu esperava. Recomendo demais.' },
  { nome: 'Carlos E.', texto: 'Profissionais que realmente entendem de detailing. Virei cliente fiel.' }
];

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleContato(e: FormEvent): void {
    e.preventDefault();
    setEnviado(true);
  }

  return (
    <div className="lp">
      {/* NAVBAR */}
      <header className={`lp-nav ${scrolled ? 'lp-nav--solid' : ''}`}>
        <a href="#top" className="lp-nav__brand">LAVA CAR</a>
        <nav className="lp-nav__menu">
          <a href="#servicos" className="lp-nav__link">Serviços</a>
          <a href="#diferenciais" className="lp-nav__link">Diferenciais</a>
          <a href="#sobre" className="lp-nav__link">Sobre</a>
          <a href="#contato" className="lp-nav__link">Contato</a>
          <Link to={isAuthenticated ? '/painel' : '/login'} className="lp-btn lp-btn--sm">
            {isAuthenticated ? 'Meu painel' : 'Entrar'}
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="lp-hero">
        <div className="lp-hero__content">
          <span className="lp-hero__tag">Estética Automotiva Premium</span>
          <h1 className="lp-hero__title">LAVA CAR</h1>
          <p className="lp-hero__sub">
            Cuidado técnico, produtos premium e acabamento profissional.
            Seu carro tratado como merece.
          </p>
          <div className="lp-hero__actions">
            <Link to="/cadastro" className="lp-btn lp-btn--primary">Agendar serviço</Link>
            <a href="#servicos" className="lp-btn lp-btn--outline">Conheça nossos serviços</a>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="lp-section">
        <div className="lp-section__head">
          <span className="lp-eyebrow">O que fazemos</span>
          <h2 className="lp-section__title">Nossos serviços</h2>
        </div>
        <div className="lp-servicos">
          {SERVICOS.map((s) => (
            <article key={s.titulo} className="lp-card">
              <span className="lp-card__icon">{s.icon}</span>
              <h3 className="lp-card__title">{s.titulo}</h3>
              <p className="lp-card__desc">{s.descricao}</p>
            </article>
          ))}
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section id="diferenciais" className="lp-section lp-section--dark">
        <div className="lp-section__head">
          <span className="lp-eyebrow">Por que a Lava Car</span>
          <h2 className="lp-section__title">Nossos diferenciais</h2>
        </div>
        <div className="lp-dif">
          {DIFERENCIAIS.map((d) => (
            <div key={d.titulo} className="lp-dif__item">
              <span className="lp-dif__icon">{d.icon}</span>
              <span className="lp-dif__label">{d.titulo}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE / NÚMEROS */}
      <section id="sobre" className="lp-section">
        <div className="lp-section__head">
          <span className="lp-eyebrow">Sobre nós</span>
          <h2 className="lp-section__title">Experiência que aparece no resultado</h2>
          <p className="lp-section__text">
            Somos apaixonados por carros e por detalhes. Cada veículo passa por um
            processo rigoroso, com produtos de alto padrão e uma equipe especializada
            em detailing automotivo.
          </p>
        </div>
        <div className="lp-stats">
          {STATS.map((s) => (
            <Counter key={s.rotulo} alvo={s.alvo} sufixo={s.sufixo} rotulo={s.rotulo} />
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="lp-section lp-section--dark">
        <div className="lp-section__head">
          <span className="lp-eyebrow">Depoimentos</span>
          <h2 className="lp-section__title">O que dizem nossos clientes</h2>
        </div>
        <div className="lp-depo">
          {DEPOIMENTOS.map((d) => (
            <article key={d.nome} className="lp-depo__card">
              <div className="lp-depo__stars">★★★★★</div>
              <p className="lp-depo__text">"{d.texto}"</p>
              <span className="lp-depo__name">{d.nome}</span>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta">
        <h2 className="lp-cta__title">Seu carro merece um tratamento premium.</h2>
        <Link to="/cadastro" className="lp-btn lp-btn--dark">Solicitar orçamento</Link>
      </section>

      {/* CONTATO */}
      <section id="contato" className="lp-section">
        <div className="lp-section__head">
          <span className="lp-eyebrow">Fale conosco</span>
          <h2 className="lp-section__title">Contato</h2>
        </div>
        <div className="lp-contato">
          <ul className="lp-contato__info">
            <li><strong>WhatsApp:</strong> (00) 99999-9999</li>
            <li><strong>Instagram:</strong> @lavacar</li>
            <li><strong>Endereço:</strong> Av. Exemplo, 999 — Centro</li>
            <li><strong>Horário:</strong> Seg a Sáb, 08h às 18h</li>
          </ul>
          <form className="lp-form" onSubmit={handleContato}>
            {enviado ? (
              <p className="lp-form__ok">Mensagem enviada! Em breve entraremos em contato. ✅</p>
            ) : (
              <>
                <input className="lp-input" name="nome" placeholder="Seu nome" required />
                <input className="lp-input" name="email" type="email" placeholder="Seu email" required />
                <textarea className="lp-input" name="mensagem" placeholder="Como podemos ajudar?" rows={4} required />
                <button type="submit" className="lp-btn lp-btn--primary">Enviar mensagem</button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="lp-footer">
        <span className="lp-footer__brand">LAVA CAR</span>
        <span className="lp-footer__copy">© {new Date().getFullYear()} Lava Car — Estética Automotiva Premium.</span>
      </footer>
    </div>
  );
}

interface CounterProps {
  alvo: number;
  sufixo: string;
  rotulo: string;
}

function Counter({ alvo, sufixo, rotulo }: CounterProps) {
  const [valor, setValor] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      const inicio = performance.now();
      const passo = (agora: number) => {
        const p = Math.min((agora - inicio) / 1400, 1);
        setValor(Math.round(p * alvo));
        if (p < 1) requestAnimationFrame(passo);
      };
      requestAnimationFrame(passo);
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [alvo]);

  return (
    <div className="lp-stat" ref={ref}>
      <span className="lp-stat__num">{valor}{sufixo}</span>
      <span className="lp-stat__label">{rotulo}</span>
    </div>
  );
}
