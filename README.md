# Lava Car — Frontend

SPA em **React 19 + TypeScript + Vite** do sistema Lava Car (agendamento de
lavagem + estoque). Consome a API do backend ([car-backend](https://github.com/erick1345/car-backend))
através do proxy reverso do nginx em `/api`.

## Stack
- React 19 + React Router 7
- TypeScript (strict, sem `any`, types globais)
- Axios (token JWT no `localStorage` via interceptor)
- Context API para o usuário autenticado
- Vite + ESLint + Husky/commitlint

## Funcionalidades
- Autenticação: login, cadastro (dupla senha, validação de CPF/email), edição de perfil (email travado)
- CRUDs em telas separadas (lista paginada + cadastro/edição): Serviços, Produtos (estoque), Agendamentos
- Componentes reutilizáveis (`components/ui`) e rotas protegidas

## Rodando
```bash
npm install
npm run dev      # http://localhost:5173  (proxy /api -> nginx do backend)
npm run build    # build de produção
npm run lint
```

## Estrutura
```
src/
  components/   ui (Input, Button, Card, Alert, Pagination) + layout + ProtectedRoute
  contexts/     AuthContext (usuário global + localStorage)
  hooks/        usePaginatedList
  pages/        Login, Register, Profile, Home, servicos/, produtos/, agendamentos/
  services/     api (axios), authService, crud (genérico)
  types/        types globais
  utils/        validators (email, CPF, senha)
```

> Em produção o frontend é servido como estático por `nginx:alpine` (ver `Dockerfile`),
> orquestrado pelo `docker-compose.yml` do repositório do backend.

## Git Flow
Branches: `main` (produção), `dev` (integração), `feature/*` (trabalho).
