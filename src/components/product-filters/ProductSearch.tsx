export default function ProductSearch({
  searchTerm,
  onSearch,
}: {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}) {
  return (
    <div>
      <label htmlFor="search">
        <small>Search:</small>
      </label>

      <input
        id="search"
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={e => onSearch(e.target.value)}
      />
    </div>
  );
}
