interface AlertProps {
  type: 'error' | 'success';
  message: string;
}

export function Alert({ type, message }: AlertProps) {
  if (!message) return null;
  return <div className={`alert alert--${type}`}>{message}</div>;
}
