export function isEmailValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isPasswordStrong(senha: string): boolean {
  return senha.length >= 8 && /\d/.test(senha);
}

export function onlyDigits(value: string): string {
  return value.replace(/\D/g, '');
}

export function formatCpf(value: string): string {
  const cpf = onlyDigits(value).slice(0, 11);
  return cpf
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

export function isCpfValid(value: string): boolean {
  const cpf = onlyDigits(value);
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  return checkDigit(cpf, 9) && checkDigit(cpf, 10);
}

function checkDigit(cpf: string, length: number): boolean {
  const factor = length + 1;
  let sum = 0;
  for (let i = 0; i < length; i++) sum += parseInt(cpf[i], 10) * (factor - i);
  let rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  return rest === parseInt(cpf[length], 10);
}
