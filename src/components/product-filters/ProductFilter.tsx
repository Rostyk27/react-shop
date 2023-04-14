export default function ProductFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <div>
      <label htmlFor="categories">
        <small>Categories:</small>
      </label>

      <select
        id="categories"
        className="capitalize"
        value={selectedCategory}
        onChange={e => onCategoryChange(e.target.value)}
      >
        {categories.map((category: string) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
