import ProductSearch from './ProductSearch';
import ProductFilter from './ProductFilter';
import ProductSort from './ProductSort';
import ProductInStock from './ProductInStock';

export default function ProductActions({
  searchTerm,
  onSearch,
  categories,
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
  inStockOnly,
  onInStockChange,
}: {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
  inStockOnly: boolean;
  onInStockChange: (inStock: boolean) => void;
}) {
  return (
    <div className="product__actions mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 xl:gap-8">
      <ProductSearch searchTerm={searchTerm} onSearch={onSearch} />

      <ProductFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />

      <ProductSort selectedSort={selectedSort} onSortChange={onSortChange} />

      <ProductInStock
        inStockOnly={inStockOnly}
        onInStockChange={onInStockChange}
      />
    </div>
  );
}
