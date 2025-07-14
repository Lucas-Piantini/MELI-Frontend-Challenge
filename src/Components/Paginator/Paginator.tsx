// Componente para paginar resultados
interface Props {
  total: number;
  offset: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const Paginator = ({ total, offset, limit, onPageChange }: Props) => {
  const currentPage = offset / limit + 1;
  const totalPages = Math.ceil(total / limit);

  const getVisiblePages = () => {
    const total = Math.min(10, totalPages);
    const start = Math.max(1, currentPage - 4);
    const end = Math.min(totalPages, start + total - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="flex justify-center gap-2 mt-6 pb-6 flex-wrap">
      {/* Boton que muestra si hay resultados anteriores al actual */}
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="bg-white px-3 py-1 border rounded"
        >
          Anterior
        </button>
      )}

      {/* Botones numericos de paginación */}
      {getVisiblePages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded ${
            page === currentPage
              ? "border-[2px] border-[#3483fa] text-[#3483fa] font-semibold bg-white"
              : "bg-white"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Botones de que se muestra si hay resultados posterior al actual */}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="bg-white px-3 py-1 border rounded"
        >
          Siguiente
        </button>
      )}
    </div>
  );
};

export default Paginator;
