export default function ProductSort({
  selectedSort,
  onSortChange,
}: {
  selectedSort: string;
  onSortChange: (sort: string) => void;
}) {
  return (
    <div>
      <label htmlFor="sorting">
        <small>Sort by:</small>
      </label>

      <select
        id="sorting"
        value={selectedSort}
        onChange={e => onSortChange(e.target.value)}
      >
        <option value="id">Default</option>
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        <option value="price-asc">Price increase</option>
        <option value="price-desc">Price decrease</option>
      </select>
    </div>
  );
}
