import Select from 'react-select';

export default function ProductFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  const categoryOptions = categories.map((category: string) => ({
    value: category,
    label: category,
  }));

  return (
    <div>
      <label htmlFor="categories">
        <small>Categories:</small>
      </label>

      <Select
        options={categoryOptions}
        id="categories"
        className="react-select-container"
        classNamePrefix="react-select"
        unstyled={true}
        isSearchable={false}
        defaultValue={categoryOptions[0]}
        onChange={e => e && onCategoryChange(e.value)}
        value={{ value: selectedCategory, label: selectedCategory }}
      />
    </div>
  );
}
