// Tipos do frontend. Espelham shared/globalTypes.ts (types globais).
// Mantidos locais porque o contexto de build Docker do front é apenas ./frontend.

export type NivelAcesso = 'admin' | 'cliente';

export interface PublicUser {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  nivel_acesso: NivelAcesso;
}

export interface RegisterDTO {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
}

export interface LoginDTO {
  email: string;
  senha: string;
}

export interface UpdateProfileDTO {
  nome: string;
  cpf: string;
  senha: string;
}

export interface AuthResponse {
  user: PublicUser;
  token: string;
}

export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface IServico {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
  duracao_min: number;
}

export interface IProduto {
  id?: number;
  nome: string;
  categoria: string;
  quantidade: number;
  preco: number;
}

export type AgendamentoStatus = 'pendente' | 'confirmado' | 'cancelado';

export interface AgendamentoView {
  id: number;
  usuario_id: number;
  servico_id: number;
  data_agendada: string;
  horario: string;
  status: AgendamentoStatus;
  servico_nome: string;
  usuario_nome: string;
}

export interface CreateAgendamentoDTO {
  servico_id: number;
  data_agendada: string;
  horario: string;
}
