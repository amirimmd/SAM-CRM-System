type PaginationProps = {
  page: number;
  pages: number;
  onChange?: (page: number) => void;
};

export function Pagination({ page, pages, onChange }: PaginationProps) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm text-[var(--navy-100)]">
      <button
        className="rounded-full px-3 py-1 transition hover:bg-[rgba(255,255,255,0.06)] disabled:opacity-40"
        disabled={page <= 1}
        onClick={() => onChange?.(page - 1)}
      >
        Prev
      </button>
      <span className="text-[var(--navy-50)]">
        Page {page} of {pages}
      </span>
      <button
        className="rounded-full px-3 py-1 transition hover:bg-[rgba(255,255,255,0.06)] disabled:opacity-40"
        disabled={page >= pages}
        onClick={() => onChange?.(page + 1)}
      >
        Next
      </button>
    </div>
  );
}
