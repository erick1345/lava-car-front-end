import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthResponse, PublicUser } from '../types';

interface AuthContextValue {
  user: PublicUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (data: AuthResponse) => void;
  logout: () => void;
  setUser: (user: PublicUser) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readStoredUser(): PublicUser | null {
  const raw = localStorage.getItem('user');
  return raw ? (JSON.parse(raw) as PublicUser) : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<PublicUser | null>(readStoredUser);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  function login(data: AuthResponse): void {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setToken(data.token);
    setUserState(data.user);
  }

  function logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUserState(null);
  }

  function setUser(updated: PublicUser): void {
    localStorage.setItem('user', JSON.stringify(updated));
    setUserState(updated);
  }

  const value: AuthContextValue = {
    user,
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
    setUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
