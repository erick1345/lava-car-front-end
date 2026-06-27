import api from './api';
import type {
  Paginated,
  IServico,
  IProduto,
  AgendamentoView,
  CreateAgendamentoDTO
} from '../types';

// Serviço CRUD genérico e reutilizável (lista paginada, get, create, update, remove).
export function createCrudService<T, CreateDTO>(resource: string) {
  return {
    list: async (page: number, limit: number): Promise<Paginated<T>> => {
      const { data } = await api.get<Paginated<T>>(`/${resource}`, { params: { page, limit } });
      return data;
    },
    get: async (id: number): Promise<T> => {
      const { data } = await api.get<T>(`/${resource}/${id}`);
      return data;
    },
    create: async (dto: CreateDTO): Promise<void> => {
      await api.post(`/${resource}`, dto);
    },
    update: async (id: number, dto: CreateDTO): Promise<void> => {
      await api.put(`/${resource}/${id}`, dto);
    },
    remove: async (id: number): Promise<void> => {
      await api.delete(`/${resource}/${id}`);
    }
  };
}

export const servicoService = createCrudService<IServico, IServico>('servicos');
export const produtoService = createCrudService<IProduto, IProduto>('produtos');
export const agendamentoService =
  createCrudService<AgendamentoView, CreateAgendamentoDTO>('agendamentos');
