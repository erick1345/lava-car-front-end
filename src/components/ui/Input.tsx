import type { ChangeEvent } from 'react';

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
}

export function Input(props: InputProps) {
  const { label, name, value, onChange, type, error, disabled, placeholder } = props;
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <input
        className={`field__input ${error ? 'field__input--error' : ''}`}
        name={name}
        type={type ?? 'text'}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete="off"
      />
      {error ? <span className="field__error">{error}</span> : null}
    </label>
  );
}
