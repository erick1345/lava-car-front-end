import { Link } from 'react-router-dom';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">🚗 Lava Car</span>
          <p className="footer__tagline">
            Estética automotiva premium — cuidado técnico e acabamento profissional
            para o seu veículo.
          </p>
        </div>

        <nav className="footer__col" aria-label="Navegação do rodapé">
          <h3 className="footer__title">Navegação</h3>
          <Link to="/" className="footer__link">Início</Link>
          <Link to="/agendamentos" className="footer__link">Agendamentos</Link>
          <Link to="/servicos" className="footer__link">Serviços</Link>
          <Link to="/produtos" className="footer__link">Estoque</Link>
        </nav>

        <div className="footer__col">
          <h3 className="footer__title">Contato</h3>
          <a className="footer__link" href="https://wa.me/5599999999999" target="_blank" rel="noreferrer">WhatsApp</a>
          <a className="footer__link" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a className="footer__link" href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <span className="footer__muted">Seg a Sáb · 08h às 18h</span>
        </div>
      </div>

      <div className="footer__bottom">
        © {year} Lava Car. Todos os direitos reservados.
      </div>
    </footer>
  );
}
