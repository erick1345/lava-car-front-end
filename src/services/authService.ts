import api from './api';
import type {
  AuthResponse,
  LoginDTO,
  RegisterDTO,
  PublicUser,
  UpdateProfileDTO
} from '../types';

export async function register(dto: RegisterDTO): Promise<void> {
  await api.post('/register', dto);
}

export async function login(dto: LoginDTO): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/login', dto);
  return data;
}

export async function updateProfile(
  dto: UpdateProfileDTO
): Promise<PublicUser> {
  const { data } = await api.put<{ user: PublicUser }>('/users/profile', dto);
  return data.user;
}
