import Select from 'react-select';

export default function ProductSort({
  selectedSort,
  onSortChange,
}: {
  selectedSort: string;
  onSortChange: (sort: string) => void;
}) {
  const sortingOptions = [
    { value: 'id', label: 'Default' },
    { value: 'name-asc', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' },
    { value: 'price-asc', label: 'Price increase' },
    { value: 'price-desc', label: 'Price decrease' },
  ];

  return (
    <div>
      <label htmlFor="sorting">
        <small>Sort by:</small>
      </label>

      <Select
        options={sortingOptions}
        id="sorting"
        className="react-select-container"
        classNamePrefix="react-select"
        unstyled={true}
        isSearchable={false}
        defaultValue={sortingOptions[0]}
        onChange={e => e && onSortChange(e.value)}
        value={{
          value: selectedSort,
          label:
            sortingOptions.find(option => option.value === selectedSort)
              ?.label ?? '',
        }}
      />
    </div>
  );
}
