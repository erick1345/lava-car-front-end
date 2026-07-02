import { useState } from 'react';

interface BeforeAfterProps {
  before: string;
  after: string;
  legenda?: string;
}

// Comparador arrastável de antes/depois (reutilizado na landing e na galeria).
export function BeforeAfter({ before, after, legenda }: BeforeAfterProps) {
  const [pos, setPos] = useState(50);

  return (
    <div className="lp-gcard">
      <div className="lp-ba">
        <img className="lp-ba__base" src={before} alt="Antes do serviço" loading="lazy" />
        <div className="lp-ba__after" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={after} alt="Depois do serviço" loading="lazy" />
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
      {legenda ? <span className="lp-gcard__legenda">{legenda}</span> : null}
    </div>
  );
}
