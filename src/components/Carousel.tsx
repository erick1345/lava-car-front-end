import { useState } from 'react';
import type { CSSProperties } from 'react';

interface CarouselProps {
  imagens: string[];
}

// Carrossel "coverflow": card central em destaque e laterais em leque 3D.
export function Carousel({ imagens }: CarouselProps) {
  const total = imagens.length;
  const [ativo, setAtivo] = useState(Math.floor(total / 2));

  function ir(delta: number): void {
    setAtivo((a) => (a + delta + total) % total);
  }

  function offsetDe(i: number): number {
    let offset = i - ativo;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  }

  function estilo(offset: number): CSSProperties {
    const abs = Math.abs(offset);
    return {
      transform: `translateX(${offset * 60}%) scale(${1 - abs * 0.18}) rotateY(${offset * -9}deg)`,
      opacity: abs > 2 ? 0 : 1 - abs * 0.3,
      zIndex: 10 - abs,
      pointerEvents: abs > 2 ? 'none' : 'auto'
    };
  }

  return (
    <div className="cor">
      <button className="cor__arrow cor__arrow--prev" onClick={() => ir(-1)} aria-label="Anterior">‹</button>

      <div className="cor__stage">
        {imagens.map((img, i) => {
          const offset = offsetDe(i);
          return (
            <div
              key={img}
              className={`cor__slide ${offset === 0 ? 'cor__slide--active' : ''}`}
              style={estilo(offset)}
              onClick={() => setAtivo(i)}
            >
              <img src={img} alt="Trabalho realizado" loading="lazy" />
            </div>
          );
        })}
      </div>

      <button className="cor__arrow cor__arrow--next" onClick={() => ir(1)} aria-label="Próximo">›</button>

      <div className="cor__dots">
        {imagens.map((img, i) => (
          <button
            key={img}
            className={`cor__dot ${i === ativo ? 'cor__dot--on' : ''}`}
            onClick={() => setAtivo(i)}
            aria-label={`Ir para o slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
