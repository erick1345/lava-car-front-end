import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { getDisponibilidade, criarReserva, pagarReserva } from '../services/reservaService';
import { getApiErrorMessage } from '../services/api';
import type { SlotDisponivel, ReservaCriada } from '../types';

const SERVICOS = [
  'Lavagem Premium', 'Lavagem Técnica', 'Higienização Completa',
  'Polimento Técnico', 'Cristalização', 'Detalhamento Completo'
];

function hojeISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

type Step = 'form' | 'pagamento' | 'ok';

export default function Agendar() {
  const [step, setStep] = useState<Step>('form');
  const [form, setForm] = useState({
    servico: SERVICOS[0], cliente_nome: '', cliente_telefone: '', data_agendada: '', horario: ''
  });
  const [slots, setSlots] = useState<SlotDisponivel[]>([]);
  const [lotado, setLotado] = useState(false);
  const [reserva, setReserva] = useState<ReservaCriada | null>(null);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  async function carregarSlots(data: string): Promise<void> {
    setErro('');
    setSlots([]);
    setLotado(false);
    try {
      const disp = await getDisponibilidade(data);
      setSlots(disp.slots);
      setLotado(disp.lotado);
    } catch (e) {
      setErro(getApiErrorMessage(e));
    }
  }

  function handleData(e: ChangeEvent<HTMLInputElement>): void {
    const data = e.target.value;
    setForm({ ...form, data_agendada: data, horario: '' });
    if (data) carregarSlots(data);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function podeAgendar(): boolean {
    return Boolean(form.cliente_nome.trim() && form.cliente_telefone.trim() && form.data_agendada && form.horario);
  }

  async function irParaPagamento(): Promise<void> {
    setErro('');
    setLoading(true);
    try {
      setReserva(await criarReserva(form));
      setStep('pagamento');
    } catch (e) {
      setErro(getApiErrorMessage(e));
      if (form.data_agendada) carregarSlots(form.data_agendada);
    } finally {
      setLoading(false);
    }
  }

  async function confirmarPagamento(): Promise<void> {
    if (!reserva) return;
    setLoading(true);
    try {
      await pagarReserva(reserva.id);
      setStep('ok');
    } catch (e) {
      setErro(getApiErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="lp gpage">
      <header className="gpage__nav">
        <Link to="/" className="lp-nav__brand"><span className="lp-nav__logo">◆</span> Lava Car</Link>
        <Link to="/" className="lp-btn lp-btn--dark lp-btn--sm">← Voltar ao site</Link>
      </header>

      <section className="lp-section ag">
        {step === 'form' && (
          <>
            <div className="lp-section__head">
              <span className="lp-eyebrow">Agende sua lavagem</span>
              <h1 className="lp-section__title">Escolha data e horário</h1>
              <p className="lp-section__text">Selecione o dia, veja os horários livres e reserve o seu.</p>
            </div>

            <div className="ag-form">
              {erro ? <div className="alert alert--error">{erro}</div> : null}

              <label className="field">
                <span className="field__label">Serviço</span>
                <select className="field__input" name="servico" value={form.servico} onChange={handleChange}>
                  {SERVICOS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>

              <div className="ag-2col">
                <label className="field">
                  <span className="field__label">Seu nome</span>
                  <input className="field__input" name="cliente_nome" value={form.cliente_nome} onChange={handleChange} />
                </label>
                <label className="field">
                  <span className="field__label">Telefone / WhatsApp</span>
                  <input className="field__input" name="cliente_telefone" value={form.cliente_telefone} onChange={handleChange} placeholder="(00) 90000-0000" />
                </label>
              </div>

              <label className="field">
                <span className="field__label">Data</span>
                <input className="field__input" type="date" name="data_agendada" min={hojeISO()} value={form.data_agendada} onChange={handleData} />
              </label>

              {form.data_agendada && (
                <div className="ag-slots">
                  <span className="field__label">Horários disponíveis</span>
                  {lotado ? (
                    <p className="ag-lotado">😕 Todos os horários deste dia estão ocupados. Escolha outra data.</p>
                  ) : (
                    <div className="ag-slots__grid">
                      {slots.map((s) => (
                        <button
                          key={s.horario}
                          type="button"
                          className={`ag-slot ${form.horario === s.horario ? 'ag-slot--sel' : ''}`}
                          disabled={!s.disponivel}
                          onClick={() => setForm({ ...form, horario: s.horario })}
                        >
                          {s.horario}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <button className="lp-btn lp-btn--primary" type="button" disabled={!podeAgendar() || loading} onClick={irParaPagamento}>
                {loading ? 'Aguarde...' : 'Ir para pagamento →'}
              </button>
            </div>
          </>
        )}

        {step === 'pagamento' && reserva && (
          <div className="ag-pay">
            <div className="lp-section__head">
              <span className="lp-eyebrow">Pagamento via Pix</span>
              <h1 className="lp-section__title">Quase lá!</h1>
              <p className="lp-section__text">
                Reserva de <strong>{form.servico}</strong> em <strong>{form.data_agendada}</strong> às <strong>{form.horario}</strong>.
              </p>
            </div>
            {erro ? <div className="alert alert--error">{erro}</div> : null}
            <div className="ag-pix">
              <div className="ag-pix__qr">📱<br />QR Pix</div>
              <div className="ag-pix__code">
                <span className="field__label">Pix copia e cola</span>
                <code>{reserva.pix.copia_e_cola}</code>
              </div>
            </div>
            <p className="ag-sim">⚠️ Pagamento simulado (protótipo). Ao confirmar, o horário fica reservado.</p>
            <div className="form__actions ag-actions">
              <button className="lp-btn lp-btn--primary" type="button" disabled={loading} onClick={confirmarPagamento}>
                {loading ? 'Confirmando...' : 'Já paguei — confirmar'}
              </button>
              <button className="lp-btn lp-btn--dark" type="button" onClick={() => setStep('form')}>Voltar</button>
            </div>
          </div>
        )}

        {step === 'ok' && (
          <div className="ag-ok">
            <div className="ag-ok__check">✓</div>
            <h1 className="lp-section__title">Agendamento confirmado!</h1>
            <p className="lp-section__text">
              {form.servico} em <strong>{form.data_agendada}</strong> às <strong>{form.horario}</strong>.
              Esse horário agora está reservado no seu nome e não aparece mais para outras pessoas.
            </p>
            <Link to="/" className="lp-btn lp-btn--primary">Voltar ao site</Link>
          </div>
        )}
      </section>
    </div>
  );
}
