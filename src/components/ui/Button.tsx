import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'ghost' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function Button(props: ButtonProps) {
  const { children, type, variant, loading, disabled, onClick } = props;
  return (
    <button
      className={`btn btn--${variant ?? 'primary'}`}
      type={type ?? 'button'}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? 'Aguarde...' : children}
    </button>
  );
}
