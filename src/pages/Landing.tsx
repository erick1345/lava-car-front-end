import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface Servico {
  img: string;
  categoria: string;
  titulo: string;
  descricao: string;
  duracao: string;
  preco: string;
}

const SERVICOS: Servico[] = [
  { img: '/img/servico-lavagem.jpg', categoria: 'Lavagem', titulo: 'Lavagem Premium', descricao: 'Lavagem externa e interna com produtos premium, secagem com microfibra e finalização.', duracao: '1h', preco: 'R$ 89,00' },
  { img: '/img/servico-interior.jpg', categoria: 'Interior', titulo: 'Higienização Completa', descricao: 'Limpeza profunda de bancos, forração, teto e carpetes. Elimina odores e ácaros.', duracao: '4h', preco: 'R$ 399,00' },
  { img: '/img/servico-polimento.jpg', categoria: 'Polimento', titulo: 'Polimento Técnico', descricao: 'Correção de pintura em 2 a 3 passos, remove hologramas e microriscos.', duracao: '6h', preco: 'R$ 799,00' },
  { img: '/img/servico-cristalizacao.jpg', categoria: 'Proteção', titulo: 'Cristalização', descricao: 'Selamento da pintura com efeito espelhado e proteção UV por até 6 meses.', duracao: '2h', preco: 'R$ 249,00' },
  { img: '/img/servico-vitrificacao.jpg', categoria: 'Proteção', titulo: 'Vitrificação Cerâmica', descricao: 'Camada cerâmica de alta durabilidade contra sol, chuva e contaminantes.', duracao: '5h', preco: 'R$ 1.200,00' },
  { img: '/img/servico-detalhamento.jpg', categoria: 'Premium', titulo: 'Detalhamento Completo', descricao: 'O pacote definitivo: pintura, interior, motor e proteção em um só serviço.', duracao: '8h', preco: 'R$ 1.500,00' }
];

const DIFERENCIAIS = [
  { icon: '⭐', titulo: 'Produtos Premium' },
  { icon: '👨‍🔧', titulo: 'Equipe Especializada' },
  { icon: '✅', titulo: 'Garantia de Qualidade' },
  { icon: '📅', titulo: 'Atendimento Agendado' },
  { icon: '💠', titulo: 'Acabamento Profissional' },
  { icon: '⚙️', titulo: 'Tecnologia de Ponta' }
];

const DEPOIMENTOS = [
  { nome: 'Rafael M.', texto: 'Meu carro saiu como novo. Acabamento impecável e atendimento nota 10.' },
  { nome: 'Juliana S.', texto: 'A vitrificação durou muito além do que eu esperava. Recomendo demais.' },
  { nome: 'Carlos E.', texto: 'Profissionais que realmente entendem de detailing. Virei cliente fiel.' }
];

const UNIDADES = [
  { nome: 'Unidade Centro', endereco: 'Av. Exemplo, 999 — Centro', telefone: '(16) 99999-0001', horario: 'Seg a Sex 08h–18h · Sáb 08h–14h' },
  { nome: 'Unidade Zona Sul', endereco: 'Rua Modelo, 1488 — Jardim Sul', telefone: '(16) 99999-0002', horario: 'Seg a Sex 08h–18h · Sáb 08h–14h' },
  { nome: 'Unidade Express', endereco: 'Rua Rápida, 890 — Vila Prado', telefone: '(16) 99999-0003', horario: 'Seg a Sex 08h–18h · Sáb 08h–14h' }
];

const WHATSAPP = 'https://wa.me/5516999990001';

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [pos, setPos] = useState(50);
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
        <a href="#top" className="lp-nav__brand"><span className="lp-nav__logo">◆</span> Lava Car</a>
        <nav className="lp-nav__menu">
          <a href="#top" className="lp-nav__link">Início</a>
          <a href="#servicos" className="lp-nav__link">Serviços</a>
          <a href="#resultados" className="lp-nav__link">Antes & Depois</a>
          <a href="#unidades" className="lp-nav__link">Unidades</a>
          <a href="#contato" className="lp-nav__link">Contato</a>
          <Link to={isAuthenticated ? '/painel' : '/login'} className="lp-btn lp-btn--primary lp-btn--sm">
            {isAuthenticated ? 'Meu painel' : 'Agendar Agora'}
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="lp-hero">
        <div className="lp-hero__overlay" />
        <div className="lp-hero__content">
          <span className="lp-badge"><span className="lp-nav__logo">◆</span> Estética Automotiva Premium</span>
          <h1 className="lp-hero__title">
            Cuidamos do seu carro <span className="lp-accent">como se fosse nosso.</span>
          </h1>
          <p className="lp-hero__sub">
            Higienização, polimento, cristalização, lavagem premium e muito mais.
            Serviço técnico executado por profissionais que amam o que fazem.
          </p>
          <div className="lp-hero__actions">
            <Link to="/cadastro" className="lp-btn lp-btn--primary">Agendar Agora →</Link>
            <a href="#servicos" className="lp-btn lp-btn--dark">Ver Serviços</a>
          </div>
          <div className="lp-hero__stats">
            <div><strong>+2.5k</strong><span>Carros atendidos</span></div>
            <div><strong>4.9</strong><span>Avaliação média</span></div>
            <div><strong>10+</strong><span>Anos de experiência</span></div>
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="lp-section">
        <div className="lp-section__head lp-section__head--left">
          <div>
            <span className="lp-eyebrow">O que fazemos</span>
            <h2 className="lp-section__title">Serviços que entregamos</h2>
            <p className="lp-section__text">Do brilho de show-room à proteção cerâmica de longa duração.</p>
          </div>
        </div>
        <div className="lp-servicos">
          {SERVICOS.map((s) => (
            <article key={s.titulo} className="lp-scard">
              <div className="lp-scard__media">
                <img src={s.img} alt={s.titulo} loading="lazy" />
              </div>
              <div className="lp-scard__body">
                <span className="lp-scard__cat">{s.categoria}</span>
                <h3 className="lp-scard__title">{s.titulo}</h3>
                <p className="lp-scard__desc">{s.descricao}</p>
                <div className="lp-scard__meta">
                  <span className="lp-scard__time">🕒 {s.duracao}</span>
                  <span className="lp-scard__price">{s.preco}</span>
                </div>
                <Link to="/cadastro" className="lp-btn lp-btn--primary lp-scard__btn">Agendar</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="lp-section lp-section--dark">
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

      {/* ANTES & DEPOIS */}
      <section id="resultados" className="lp-section">
        <div className="lp-section__head">
          <span className="lp-eyebrow">Resultados</span>
          <h2 className="lp-section__title">Antes & depois</h2>
          <p className="lp-section__text">Arraste para ver a diferença que um trabalho técnico faz.</p>
        </div>
        <div className="lp-ba">
          <img className="lp-ba__base" src="/img/antes.jpg" alt="Antes do serviço" />
          <div className="lp-ba__after" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <img src="/img/depois.jpg" alt="Depois do serviço" />
          </div>
          <div className="lp-ba__divider" style={{ left: `${pos}%` }}>
            <span className="lp-ba__handle">⇆</span>
          </div>
          <span className="lp-ba__tag lp-ba__tag--l">Antes</span>
          <span className="lp-ba__tag lp-ba__tag--r">Depois</span>
          <input
            className="lp-ba__range"
            type="range" min="0" max="100" value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Comparar antes e depois"
          />
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
        <a href={WHATSAPP} target="_blank" rel="noreferrer" className="lp-btn lp-btn--wpp">💬 Agende pelo WhatsApp</a>
      </section>

      {/* UNIDADES + MAPA */}
      <section id="unidades" className="lp-section">
        <div className="lp-section__head">
          <span className="lp-eyebrow">Onde estamos</span>
          <h2 className="lp-section__title">Nossas unidades</h2>
          <p className="lp-section__text">Escolha a unidade mais próxima e agende seu horário.</p>
        </div>
        <div className="lp-unidades">
          <div className="lp-unidades__list">
            {UNIDADES.map((u, i) => (
              <article key={u.nome} className={`lp-unit ${i === 0 ? 'lp-unit--active' : ''}`}>
                <h3 className="lp-unit__title">📍 {u.nome}</h3>
                <p className="lp-unit__addr">{u.endereco}</p>
                <p className="lp-unit__line">📞 {u.telefone}</p>
                <p className="lp-unit__line">🕒 {u.horario}</p>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="lp-btn lp-btn--wpp lp-unit__btn">WhatsApp</a>
              </article>
            ))}
          </div>
          <div className="lp-map">
            <iframe
              title="Mapa das unidades"
              src="https://maps.google.com/maps?q=Av.%20Exemplo%2C%20999%20Centro&z=14&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="lp-section lp-section--dark">
        <div className="lp-section__head">
          <span className="lp-eyebrow">Fale conosco</span>
          <h2 className="lp-section__title">Contato</h2>
        </div>
        <div className="lp-contato">
          <ul className="lp-contato__info">
            <li><strong>WhatsApp:</strong> (16) 99999-0001</li>
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
        <div className="lp-footer__inner">
          <div className="lp-footer__col">
            <span className="lp-footer__brand"><span className="lp-nav__logo">◆</span> Lava Car</span>
            <p className="lp-footer__about">Excelência em estética automotiva. Transformamos veículos com técnicas avançadas e produtos premium.</p>
          </div>
          <div className="lp-footer__col">
            <h4 className="lp-footer__title">Contato</h4>
            <p>📞 (16) 99999-0001</p>
            <p>📍 Av. Exemplo, 999 — Centro</p>
            <p>🕒 Seg a Sáb, 08h às 18h</p>
          </div>
          <div className="lp-footer__col">
            <h4 className="lp-footer__title">Redes sociais</h4>
            <div className="lp-footer__social">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">Facebook</a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="lp-footer__bottom">
          © {new Date().getFullYear()} Lava Car — Estética Automotiva. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
