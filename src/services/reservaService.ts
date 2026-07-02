import api from './api';
import type { Disponibilidade, CreateReservaDTO, ReservaCriada } from '../types';

export async function getDisponibilidade(data: string): Promise<Disponibilidade> {
  const res = await api.get<Disponibilidade>('/reservas/disponibilidade', { params: { data } });
  return res.data;
}

export async function criarReserva(dto: CreateReservaDTO): Promise<ReservaCriada> {
  const res = await api.post<ReservaCriada>('/reservas', dto);
  return res.data;
}

export async function pagarReserva(id: number): Promise<void> {
  await api.post(`/reservas/${id}/pagar`);
}
