interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  onPage: (page: number) => void;
}

export function Pagination({ page, total, limit, onPage }: PaginationProps) {
  const pages = Math.max(1, Math.ceil(total / limit));
  return (
    <div className="pagination">
      <button className="btn btn--ghost" disabled={page <= 1} onClick={() => onPage(page - 1)}>
        ← Anterior
      </button>
      <span className="pagination__info">Página {page} de {pages} ({total})</span>
      <button className="btn btn--ghost" disabled={page >= pages} onClick={() => onPage(page + 1)}>
        Próxima →
      </button>
    </div>
  );
}
