import { Link } from 'react-router-dom';
import { BeforeAfter } from '../components/BeforeAfter';

interface Item {
  before: string;
  after: string;
  legenda: string;
}

const ITENS: Item[] = [
  { before: '/img/antes.jpg', after: '/img/depois.jpg', legenda: 'Polimento técnico + vitrificação' },
  { before: '/img/galeria-1.jpg', after: '/img/servico-vitrificacao.jpg', legenda: 'Cristalização da pintura' },
  { before: '/img/galeria-2.jpg', after: '/img/servico-polimento.jpg', legenda: 'Correção de pintura em 3 passos' },
  { before: '/img/galeria-3.jpg', after: '/img/servico-detalhamento.jpg', legenda: 'Detalhamento completo' },
  { before: '/img/galeria-4.jpg', after: '/img/servico-lavagem.jpg', legenda: 'Lavagem premium + selamento' },
  { before: '/img/galeria-5.jpg', after: '/img/galeria-6.jpg', legenda: 'Revitalização geral' }
];

export default function Galeria() {
  return (
    <div className="lp gpage">
      <header className="gpage__nav">
        <Link to="/" className="lp-nav__brand"><span className="lp-nav__logo">◆</span> Lava Car</Link>
        <Link to="/" className="lp-btn lp-btn--dark lp-btn--sm">← Voltar ao site</Link>
      </header>

      <section className="lp-section">
        <div className="lp-section__head">
          <span className="lp-eyebrow">Nosso trabalho</span>
          <h1 className="lp-section__title">Galeria — Antes &amp; Depois</h1>
          <p className="lp-section__text">
            Arraste cada imagem para ver a transformação. Resultados reais dos serviços que realizamos.
          </p>
        </div>

        <div className="lp-gallery">
          {ITENS.map((it) => (
            <BeforeAfter key={it.legenda} before={it.before} after={it.after} legenda={it.legenda} />
          ))}
        </div>

        <div className="gpage__cta">
          <a href="/#contato" className="lp-btn lp-btn--primary">Agendar meu serviço</a>
        </div>
      </section>
    </div>
  );
}
