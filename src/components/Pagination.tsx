export default function Pagination({
  productsPerPage,
  totalProducts,
  currentPage,
  onPageChange,
}: {
  productsPerPage: number;
  totalProducts: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}) {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="pagination -mx-1 mt-14 flex items-center justify-center">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
        aria-label="Previous page"
        className={`pagination__item ring-color-primary ${
          currentPage === 1
            ? 'cursor-default opacity-50'
            : 'hover:ring-color-tertiary'
        }`}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(index + 1)}
          {...(index + 1 === currentPage && { 'aria-current': 'page' })}
          className={`pagination__item ${
            index + 1 === currentPage
              ? 'bg-color-tertiary text-white ring-color-tertiary'
              : 'ring-color-primary hover:ring-color-tertiary'
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
        aria-label="Next page"
        className={`pagination__item ring-color-primary ${
          currentPage === totalPages
            ? 'cursor-default opacity-50'
            : 'hover:ring-color-tertiary'
        }`}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
}
