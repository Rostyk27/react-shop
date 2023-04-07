export default function ProductSearch({
  searchTerm,
  onSearch,
}: {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}) {
  return (
    <div className="produtcs__search mb-10 flex max-w-[276px]">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        type="search"
        placeholder="Search"
        className="w-full rounded-md border border-color-secondary px-4 py-2 text-sm text-color-secondary placeholder-color-secondary focus:border-transparent focus:outline-none focus:ring-2 focus:ring-color-secondary"
        value={searchTerm}
        onChange={e => onSearch(e.target.value)}
      />
    </div>
  );
}
